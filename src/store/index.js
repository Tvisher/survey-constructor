import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesList from './pollTypesList';


function findPollById(state, pollPageId, pollItemId) {
  const currentPollPage = state.pollPages.find(page => page.id === pollPageId);
  return currentPollPage.pollList.find((poll) => poll.id === pollItemId);
}



export default createStore({
  state: {
    pollTypesList,
    currentPageId: '1',
    pollPages: [
      {
        id: "1",
        pageComment: 'Комментарий к первой странице',
        pollList: [
          {
            id: '1',
            type: 'single-choice',
            typeName: 'Одиночный выбор',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                  { id: '1', value: "" },
                  { id: '2', value: "" },
                ],
              },
            }
          },
          {
            id: '2',
            type: 'multiple-drop-down-list',
            typeName: 'Множественный вып. список',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                  { id: '1', value: "" },
                  { id: '2', value: "" },
                ],
              },
            }
          },
          {
            id: '3',
            type: 'ranging',
            typeName: 'Ранжирование',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                  { id: '1', value: "123" },
                  { id: '2', value: "321" },
                ],
              },
            }
          },
        ],
      },
      {
        id: "2",
        pageComment: 'Комментарий ко второй странице',
        pollList: [

          {
            id: '2',
            type: 'multiple-drop-down-list',
            typeName: 'Множественный вып. список',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1', '2'],
                optionsList: [
                  { id: '1', value: "" },
                  { id: '2', value: "" },
                  { id: '3', value: "" },
                  { id: '4', value: "" },
                  { id: '5', value: "" },
                ],
              },
            }
          },
          {
            id: '3',
            type: 'ranging',
            typeName: 'Ранжирование',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                  { id: '1', value: "123" },
                  { id: '2', value: "321" },
                ],
              },
            }
          },
        ],
      },
      {
        id: "3",
        pageComment: 'Комментарий к третьей странице, тут пока пусто',
        pollList: [

        ],
      }
    ],
  },
  getters: {
  },
  mutations: {
    setCurrentPollPage(state, pageId) {
      state.currentPageId = pageId;
    },

    dragSortPollsInPage(state, { pollPageId, sortableList }) {
      const currentPage = state.pollPages.find(page => page.id === pollPageId);
      const newPollElement = sortableList.find(item => !item.id);
      if (newPollElement) {
        newPollElement.id = uuidv4();
      }
      currentPage.pollList = sortableList;
    },

    dragSortOptionsInPoll(state, { sortableList, pollItemId }) {
      const currentPollItem = findPollById(state, state.currentPageId, pollItemId);
      currentPollItem.data.optionsData.optionsList = sortableList;
    },

    addPollInState(state, pollType) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      const pollTmp = state.pollTypesList.find(pollTypeItem => pollTypeItem.type === pollType);
      const addedPollTmp = JSON.parse(JSON.stringify(pollTmp))
      addedPollTmp.id = uuidv4();
      currentPollPage.pollList = [...currentPollPage.pollList, addedPollTmp];
    },

    setSinglePollEditorValue(state, { pollPageId, pollItemId, editorValue }) {
      const currentPoll = findPollById(state, pollPageId, pollItemId);
      if (currentPoll) {
        currentPoll.data = { ...currentPoll.data, editorValue };
      }
    },

    editPageComment(state, { pollPageId, commentValue }) {
      const currentPage = state.pollPages.find(page => page.id === pollPageId);
      currentPage.pageComment = commentValue;
    },

    removePollInPage(state, { pollPageId, pollId }) {
      const currentPollPage = state.pollPages.find(page => page.id === pollPageId);
      currentPollPage.pollList = currentPollPage.pollList.filter(poll => poll.id !== pollId);
    },

    addOptionInPoll(state, { pollItemId, pollPageId }) {
      const currentPoll = findPollById(state, pollPageId, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        value: ""
      };
      currentPoll.data.optionsData.optionsList.push(newOption);
    },

    selectOptionInPoll(state, { pollPageId, pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollPageId, pollItemId);
      if (currentPoll) {
        if (inputsType === 'radio') {
          currentPoll.data.optionsData.currentAnswerId = [optionId];
        }
        if (inputsType === 'checkbox') {
          if (currentPoll.data.optionsData.currentAnswerId.includes(optionId)) {
            currentPoll.data.optionsData.currentAnswerId = currentPoll.data.optionsData.currentAnswerId.filter(id => id !== optionId);
          } else {
            currentPoll.data.optionsData.currentAnswerId = [...currentPoll.data.optionsData.currentAnswerId, optionId];
          }
        }
      }
    },

    removeOptionInPoll(state, { pollPageId, pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollPageId, pollItemId);
      const optionListLength = currentPoll.data.optionsData.optionsList.length;
      if (optionListLength <= 2) return

      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(option => option.id !== optionId);

      if (currentPoll.data.optionsData.currentAnswerId) {
        if (inputsType === 'radio' && currentPoll.data.optionsData.currentAnswerId[0] === optionId) {
          currentPoll.data.optionsData.currentAnswerId[0] = currentPoll.data.optionsData.optionsList[0].id;
        }
        if (inputsType === 'checkbox') {
          currentPoll.data.optionsData.currentAnswerId = currentPoll.data.optionsData.currentAnswerId.filter(id => id !== optionId);
        }
      }
      console.log(currentPoll.data.optionsData.currentAnswerId);
    },

    editOptionInPoll(state, { pollPageId, pollItemId, optionId, optionValue }) {
      const currentPoll = findPollById(state, pollPageId, pollItemId);
      if (currentPoll) {
        const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
        currentOption.value = optionValue
      }
    }

  },
  actions: {
  },
  modules: {
  }
})




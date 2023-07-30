import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesList from './pollTypesList';


function findPollById(state, pollItemId) {
  const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
  return currentPollPage.pollList.find((poll) => poll.id === pollItemId);
}


export default createStore({
  state: {
    pollTypesList,
    currentPageId: '2',
    pollPages: [
      {
        id: "1",
        pageComment: 'Комментарий к первой странице',
        pollList: [
          {
            id: '1',
            type: 'single-choice',
            typeName: 'Одиночный выбор',
            typeDescr: 'Описание для элемента опроса Одиночный выбор',
            data: {
              editorValue: { "ops": [{ "insert": "asdasdasd\n" }] },
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
            typeDescr: 'Описание для элемента опроса Выпадающий список',
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
            typeDescr: 'Описание для элемента опроса Множественный вып. список',
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
          {
            id: "4",
            type: "range-selection",
            typeName: "Выбор диапазона",
            typeDescr: 'Описание для элемента опроса Множественный выбор',
            data: {
              editorValue: {},
              rangeData: {
                min: '20',
                max: '40'
              }
            },
          },
          {
            id: '5',
            type: 'pair-ranking',
            typeName: 'Парное ранжирование',
            typeDescr: 'Описание для элемента опроса Ранжирование',
            data: {
              editorValue: {},
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                  {
                    id: '1',
                    firstFieldValue: 'Какой то вопрос для первой пары',
                    secondFieldValue: 'Какой то ответ для первой пары',
                  },
                  {
                    id: '2',
                    firstFieldValue: 'Какой то вопрос для второй пары',
                    secondFieldValue: 'Какой то ответ для второй пары',
                  },
                ]
              }
            }
          },
        ],
      },
      {
        id: "2",
        pageComment: 'Комментарий к третьей странице, тут пока пусто',
        pollList: [

        ],
      }
    ],
  },
  getters: {},
  mutations: {
    setCurrentPollPage(state, pageId) {
      state.currentPageId = pageId;
    },

    setRangeSelectionValues(state, { pollItemId, rangeData }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.rangeData = rangeData;
    },

    dragSortPollsInPage(state, { sortableList }) {
      const currentPage = state.pollPages.find(page => page.id === state.currentPageId);
      const newPollList = JSON.parse(JSON.stringify(sortableList));
      const newPollElement = newPollList.find(item => !item.id);
      if (newPollElement) {
        newPollElement.id = uuidv4();
      }
      currentPage.pollList = [...newPollList];
    },

    dragSortOptionsInPoll(state, { sortableList, pollItemId }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.optionsData.optionsList = sortableList;
    },

    addPollInState(state, pollType) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      const pollTmp = state.pollTypesList.find(pollTypeItem => pollTypeItem.type === pollType);
      const addedPollTmp = JSON.parse(JSON.stringify(pollTmp))
      addedPollTmp.id = uuidv4();
      currentPollPage.pollList = [...currentPollPage.pollList, addedPollTmp];
    },

    setSinglePollEditorValue(state, { pollItemId, editorValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        currentPoll.data = { ...currentPoll.data, editorValue };
      }
    },

    editPageComment(state, { pollPageId, commentValue }) {
      const currentPage = state.pollPages.find(page => page.id === pollPageId);
      currentPage.pageComment = commentValue;
    },

    removePollInPage(state, { pollId }) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      currentPollPage.pollList = currentPollPage.pollList.filter(poll => poll.id !== pollId);
    },

    addOptionInPoll(state, { pollItemId }) {
      const currentPoll = findPollById(state, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        value: ""
      };
      currentPoll.data.optionsData.optionsList.push(newOption);
    },

    addPairInPoll(state, pollItemId) {
      const currentPoll = findPollById(state, state.currentPageId, pollItemId);
      const newPair = {
        id: uuidv4(),
        firstFieldValue: '',
        secondFieldValue: '',
      };
      currentPoll.data.optionsData.optionsList.push(newPair);
    },

    editPairValue(state, { pollItemId, fieldValue, pairId, filedType }) {
      const currentPoll = findPollById(state, state.currentPageId, pollItemId);
      const pairFiled = currentPoll.data.optionsData.optionsList.find(pair => pair.id === pairId);
      pairFiled[filedType] = fieldValue;
    },

    selectOptionInPoll(state, { pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollItemId);
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

    removeOptionInPoll(state, { pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollItemId);
      const optionListLength = currentPoll.data.optionsData.optionsList.length;
      const minOptionsLength = currentPoll.data.optionsData.minOptionsLength;
      if (optionListLength <= minOptionsLength) return
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(option => option.id !== optionId);
      if (currentPoll.data.optionsData.currentAnswerId) {
        if (inputsType === 'radio' && currentPoll.data.optionsData.currentAnswerId[0] === optionId) {
          currentPoll.data.optionsData.currentAnswerId = [];
        }
        if (inputsType === 'checkbox') {
          currentPoll.data.optionsData.currentAnswerId = currentPoll.data.optionsData.currentAnswerId.filter(id => id !== optionId);
        }
      }
    },

    removePairInPoll(state, { pollItemId, pairId, }) {
      const currentPoll = findPollById(state, state.currentPageId, pollItemId);
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(pair => pair.id !== pairId);
    },

    editOptionInPoll(state, { pollItemId, optionId, optionValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
        currentOption.value = optionValue
      }
    }

  },
  actions: {

  }
});




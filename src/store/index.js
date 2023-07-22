import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesList from './pollTypesList';

export default createStore({
  state: {
    pollTypesList,
    pollList: [
      {
        id: '1',
        type: "single-choice",
        typeName: 'Одиночный выбор',
        data: {
          editorValue: {
            ops: [
              {
                insert: "asdasdasdasdasdasd12312\n123123",
              },
              {
                attributes: {
                  italic: true,
                },
                insert: "1231231232312312",
              },
              {
                insert: "\n",
              },
            ],
          },
          optionsData: {
            currentAnswerId: ['1'],
            optionsList: [
              { id: '1', value: "asdasdasd" },
              { id: '2', value: "123123123" },
            ],
          },
        },
      },

    ],
  },
  getters: {
  },
  mutations: {
    setSinglePollEditorValue(state, { pollItemId, editorValue }) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
      if (currentPoll) {
        currentPoll.data.editorValue = editorValue;
      }
    },

    addPollInState(state, pollType) {
      const pollTmp = state.pollTypesList.find(pollTypeItem => pollTypeItem.type == pollType);
      const addedPollTmp = JSON.parse(JSON.stringify(pollTmp))
      addedPollTmp.id = uuidv4();
      state.pollList.push(addedPollTmp);
    },

    removePollInState(state, pollId) {
      state.pollList = state.pollList.filter(poll => poll.id !== pollId);
    },

    addOptionInPoll(state, pollItemId) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        value: ""
      }
      currentPoll.data.optionsData.optionsList.push(newOption);
    },

    selectCurrentOptionInPoll(state, { pollItemId, optionId }) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
      if (currentPoll) {
        currentPoll.data.optionsData.currentAnswerId = [optionId];
      }
    },

    removeCurrentOptionInPoll(state, { pollItemId, optionId }) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
      const optionListLength = currentPoll.data.optionsData.optionsList.length;
      if (optionListLength <= 2) return
      const currentOption = currentPoll.data.optionsData.currentAnswerId[0];
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(option => option.id !== optionId);
      if (currentOption === optionId) {
        currentPoll.data.optionsData.currentAnswerId[0] = currentPoll.data.optionsData.optionsList[0].id;
      }
    },

    editCurrentOptionInPoll(state, { pollItemId, optionId, optionValue }) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
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

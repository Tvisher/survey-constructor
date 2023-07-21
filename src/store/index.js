import { createStore } from 'vuex'

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
            currentAnswerId: '1',
            optionsList: [
              { id: '1', value: "asdasdasd" },
              { id: '2', value: "123123123" },
            ],
          },
        },
      },
      // {
      //   id: 2,
      //   type: "drop-down-list",
      //   typeName: 'Выпадающий список',
      //   data: {
      //     editorValue: {
      //       ops: [
      //         {
      //           insert: "asdasdasdasdasdasd12312\n123123",
      //         },
      //         {
      //           attributes: {
      //             italic: true,
      //           },
      //           insert: "1231231232312312",
      //         },
      //         {
      //           insert: "\n",
      //         },
      //       ],
      //     },
      //   },
      // },
      // {
      //   id: 3,
      //   type: "multiple-drop-down-list",
      //   typeName: 'Множественный вып. список',
      //   data: {
      //     editorValue: {
      //       ops: [
      //         {
      //           insert: "asdasdasdasdasdasd12312\n123123",
      //         },
      //         {
      //           attributes: {
      //             italic: true,
      //           },
      //           insert: "1231231232312312",
      //         },
      //         {
      //           insert: "\n",
      //         },
      //       ],
      //     },
      //   },
      // },
      // {
      //   id: 4,
      //   type: "multiple-choice",
      //   typeName: 'Множественный выбор',
      //   data: {
      //     editorValue: {
      //       ops: [
      //         {
      //           insert: "asdasdasdasdasdasd12312\n123123",
      //         },
      //         {
      //           attributes: {
      //             italic: true,
      //           },
      //           insert: "1231231232312312",
      //         },
      //         {
      //           insert: "\n",
      //         },
      //       ],
      //     },
      //   },
      // },
      // {
      //   id: 5,
      //   type: "ranging",
      //   typeName: 'Ранжирование',
      //   data: {
      //     editorValue: {
      //       ops: [
      //         {
      //           insert: "asdasdasdasdasdasd12312\n123123",
      //         },
      //         {
      //           attributes: {
      //             italic: true,
      //           },
      //           insert: "1231231232312312",
      //         },
      //         {
      //           insert: "\n",
      //         },
      //       ],
      //     },
      //   },
      // },
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

    removePollInState(state, pollId) {
      state.pollList = state.pollList.filter(poll => poll.id !== pollId);
    },

    selectCurrentOptionInPoll(state, { pollItemId, optionId }) {
      const currentPoll = state.pollList.find((poll) => poll.id === pollItemId);
      if (currentPoll) {
        currentPoll.data.optionsData.currentAnswerId = optionId;
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

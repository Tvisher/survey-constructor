import { createStore } from 'vuex'

export default createStore({
  state: {
    pollList: [
      {
        id: 1,
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
        },
      },
      {
        id: 2,
        type: "drop-down-list",
        typeName: 'Выпадающий список',
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
        },
      },
      {
        id: 3,
        type: "multiple-drop-down-list",
        typeName: 'Множественный вып. список',
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
        },
      },
      {
        id: 4,
        type: "multiple-choice",
        typeName: 'Множественный выбор',
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
        },
      },
      {
        id: 5,
        type: "ranging",
        typeName: 'Ранжирование',
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
        },
      },
    ],
  },
  getters: {
  },
  mutations: {
    setSinglePollEditorValue(state, { itemId, editorValue }) {
      const currentPoll = state.pollList.find((poll) => poll.id === itemId);
      if (currentPoll) {
        currentPoll.data.editorValue = editorValue;
      }
    },
    removePollInState(state, id) {
      state.pollList = state.pollList.filter(poll => poll.id !== id);
    }
  },
  actions: {
  },
  modules: {
  }
})

import { createStore } from 'vuex'

export default createStore({
  state: {
    pollList: [
      {
        id: 1,
        type: "Editor 1",
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
        type: "Editor 2",
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
        type: "Editor 2",
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
        type: "Editor 2",
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
        type: "Editor 2",
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
      // console.log(id, editorValue);
      const currentPoll = state.pollList.find((poll) => poll.id === itemId);
      if (currentPoll) {
        currentPoll.data.editorValue = editorValue;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})

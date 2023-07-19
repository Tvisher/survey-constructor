<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <PollElement
    v-for="pollItem in pollList"
    :pollItemType="pollItem.type"
    :editorValue="pollItem.data.editorValue"
    @setEditorValue="setEditorValueInPoll(pollItem.id, $event)"
  />
</template>

<script>
import PollElement from "./components/PollElement.vue";

export default {
  name: "App",
  components: {
    PollElement,
  },
  data() {
    return {
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
    };
  },
  methods: {
    setEditorValueInPoll(id, newValue) {
      const currentPoll = this.pollList.find((poll) => poll.id === id);
      if (currentPoll) {
        currentPoll.data.editorValue = newValue;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

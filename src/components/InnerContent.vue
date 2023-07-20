<template>
  <div class="container">
    <div class="poll-container">
      <div class="poll-elements">
        <div class="poll-elements__title">Название опроса</div>

        <PollElement
          v-for="(pollItem, index) in pollList"
          :pollItemType="pollItem.type"
          :pollItemName="pollItem.typeName"
          :pollItemData="pollItem.data"
          :key="pollItem.id"
          :id="pollItem.id"
          :number="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PollElement from "./PollElement.vue";
import { mapState } from "vuex";
export default {
  components: {
    PollElement,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pollList: (state) => state.pollList,
    }),
  },
  methods: {},
};
</script>

<style>
#app {
  margin-top: 60px;
}
.poll-elements__title {
  margin-bottom: 20px;
  text-align: center;
  color: #202020;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
}

.container {
  max-width: 1200px;
  margin: auto;
}

.poll-container {
  padding: 20px;
  border-radius: 8px;
  background: #ecf4ff;
}
</style>

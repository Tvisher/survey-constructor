<template>
  <span class="editor-descr">Список пар</span>
  <div class="pairs">
    <div
      class="variant__pair"
      v-for="(pairOption, index) in optionsList"
      :key="pairOption.id"
    >
      <div class="pair__num editor-descr">Пара № {{ index + 1 }}</div>
      <div class="variant__pair-content">
        <label>
          <input
            class="variant-item__filed"
            type="text"
            :value="pairOption.firstFieldValue"
            placeholder="Вопрос"
          />
        </label>
        <label>
          <input
            class="variant-item__filed"
            type="text"
            :value="pairOption.secondFieldValue"
            placeholder="Ответ"
          />
        </label>
      </div>
    </div>
  </div>
  <button
    class="btn red-btn add-btn"
    v-if="permissionToAddOption"
    @click="addPair"
  >
    Добавить пару
  </button>
</template>

<script>
export default {
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
  },
  data() {
    return {};
  },
  computed: {
    optionsList: {
      get() {
        return this.optionsData.optionsList;
      },
      set(sortableList) {
        const pollItemId = this.pollItemId;
        this.dragSortOptionsInPoll({ sortableList, pollItemId });
      },
    },
    permissionToAddOption() {
      const maxOptionsLength = this.optionsData.maxOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return maxOptionsLength >= optionsLength;
    },
    permissionToRemoveOption() {
      const minxOptionsLength = this.optionsData.minOptionsLength;
      const optionsLength = this.optionsData.optionsList.length;
      return optionsLength > minxOptionsLength;
    },
  },
  methods: {
    addPair() {},
  },
};
</script>

<style scoped>
.pairs {
  /* margin-top: 15px; */
}
.variant__pair {
  padding: 15px 0;
}
.flip-option-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost-potion {
  opacity: 0.8;
  background: #ecf4ff;
}
.variant__pair-content {
  width: 100%;
}
.variant-item__dragg {
  margin-top: 0;
}

.pair__num {
  padding-left: 10px;
}
</style>

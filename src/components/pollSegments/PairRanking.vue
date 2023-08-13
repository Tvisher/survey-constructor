<template>
  <span class="editor-descr">Список пар</span>
  <div class="pairs">
    <transition-group type="transition" name="option-transition">
      <div
        class="variant__pair"
        v-for="(pairOption, index) in optionsData.optionsList"
        :key="pairOption.id"
      >
        <div class="pair__num editor-descr">Пара № {{ index + 1 }}</div>
        <div class="variant__pair-wrapper">
          <div class="variant__pair-content">
            <label>
              <input
                class="variant-item__filed"
                type="text"
                :value="pairOption.firstFieldValue"
                placeholder="Вопрос"
                @input="editValue($event, pairOption.id, 'firstFieldValue')"
              />
            </label>
            <label>
              <input
                class="variant-item__filed"
                type="text"
                :value="pairOption.secondFieldValue"
                placeholder="Ответ"
                @input="editValue($event, pairOption.id, 'secondFieldValue')"
              />
            </label>
          </div>
          <button
            class="variant-item__remove"
            :class="{ 'cant-remove': !permissionToRemoveOption }"
            @click="removePair(pairOption.id)"
          ></button>
        </div>
      </div>
    </transition-group>
  </div>
  <button
    class="btn app-btn add-btn"
    v-if="permissionToAddOption"
    @click="addPair"
  >
    Добавить пару
  </button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemId: { type: [Number, String] },
    optionsData: { type: Object },
  },

  computed: {
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
    ...mapMutations(["addPairInPoll", "editPairValue", "removePairInPoll"]),
    addPair() {
      const { pollItemId } = this;
      this.addPairInPoll(pollItemId);
    },
    editValue(event, pairId, filedType) {
      const { pollItemId } = this;
      const fieldValue = event.target.value.trim();
      this.editPairValue({ pollItemId, fieldValue, pairId, filedType });
    },

    removePair(pairId) {
      const { pollItemId } = this;
      if (this.permissionToRemoveOption) {
        this.removePairInPoll({ pollItemId, pairId });
      }
    },
  },
};
</script>

<style scoped>
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
.variant-item__filed {
  margin: 4px 0;
}
.variant__pair-wrapper {
  display: flex;
  align-items: center;
}

.pair__num {
  padding-left: 10px;
}
</style>

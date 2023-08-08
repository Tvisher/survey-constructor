<template>
  <div class="polls-pagination">
    <div class="poll-page-number">Страницы</div>
    <div class="polls-pagination__wrapper">
      <div
        class="polls-page-btn"
        v-for="(pollPageItem, index) in pollPagesList"
        :key="pollPageItem.id"
        :class="{ active: pollPageItem.id === currentPageId }"
        @click="setCurrentPollPage(pollPageItem.id)"
      >
        {{ index + 1 }}
      </div>
      <button
        class="btn red-btn add-btn"
        @click="addPollPage"
        :disabled="pageLimitReached"
        :title="pageLimitReachedText"
      >
        Добавить страниццу
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollPagesList: { type: Array },
    currentPageId: { type: [String, Number] },
    pagesLimit: { type: [String, Number] },
  },
  methods: {
    ...mapMutations(["setCurrentPollPage", "addPollPage"]),
  },
  computed: {
    pageLimitReached() {
      return this.pollPagesList.length === this.pagesLimit;
    },
    pageLimitReachedText() {
      return this.pageLimitReached ? "Достигнут лимит колличества страниц" : "";
    },
  },
};
</script>

<style scoped lang="scss">
.add-btn {
  transition: opacity 0.3s ease-in-out;
  margin: 10px;
  margin-left: auto;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
.poll-page-number {
  margin: 10px;
  color: #202020;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
}
</style>

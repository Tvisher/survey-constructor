<template>
  <div class="polls-pagination">
    <div
      class="polls-page-btn"
      v-for="(pollPageItem, index) in pollPagesList"
      :key="pollPageItem.id"
      :class="{ active: pollPageItem.id === currentPageId }"
      @click="setCurrentPollPage(pollPageItem.id)"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollPagesList: { type: Array },
    currentPageId: { type: [String, Number] },
  },
  methods: {
    ...mapMutations(["setCurrentPollPage"]),
  },
};
</script>

<style></style>

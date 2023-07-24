<template>
  <div class="poll-page-head">
    <div class="poll-page-number">Страница {{ currenPageNumber }}</div>
  </div>
  <poll-element
    v-for="(pollItem, index) in currenPage.pollList"
    :pollPageId="currenPage.id"
    :pollItemId="pollItem.id"
    :pollItemType="pollItem.type"
    :pollItemName="pollItem.typeName"
    :pollItemData="pollItem.data"
    :key="pollItem.id"
    :pollNumber="index"
  />
</template>

<script>
import PollElement from "./PollElement.vue";
export default {
  props: {
    currenPage: { type: Object },
    currenPageNumber: { type: [String, Number] },
  },
  components: {
    PollElement,
  },
};
</script>

<style></style>

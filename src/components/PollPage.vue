<template>
  <div class="poll-page-head">
    <div class="poll-page-number">Страница {{ currenPageNumber }}</div>
  </div>
  <div class="poll-page-comment">
    <input
      type="text"
      class="comment__input"
      placeholder="Комментарий к странице"
      :value="currenPage.pageComment"
      @input="editComment"
    />
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
import { mapMutations } from "vuex";
import PollElement from "./PollElement.vue";
export default {
  props: {
    currenPage: { type: Object },
    currenPageNumber: { type: [String, Number] },
  },
  components: {
    PollElement,
  },
  methods: {
    ...mapMutations(["editPageComment"]),

    editComment(event) {
      const pollPageId = this.currenPage.id;
      const commentValue = event.target.value.trim();
      this.editPageComment({ pollPageId, commentValue });
    },
  },
};
</script>

<style scoped>
.poll-page-comment {
  margin-bottom: 20px;
}
.comment__input {
  padding: 10px 12px;
  width: 100%;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-radius: 4px;
  border: 1px solid rgba(0, 66, 105, 0.28);
  background: #fff;
}
</style>

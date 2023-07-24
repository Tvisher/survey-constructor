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
  <div class="poll-page-zone" v-if="!hasPollElements">
    <img
      class="poll-page-zone__image"
      src="./../assets/img/add-ico.svg"
      alt=""
    />
    <span>Перенесите нужный вам тип вопроса в эту</span>
    <span>область страницы</span>
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
  computed: {
    hasPollElements() {
      return this.currenPage.pollList.length > 0;
    },
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

.poll-page-zone {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px dashed rgba(0, 66, 105, 0.28);
}

.poll-page-zone__image {
  width: 82px;
  height: 82px;
  margin-bottom: 8px;
}
</style>

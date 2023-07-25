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
  <div class="poll-page-body">
    <draggable
      handle=".poll-item__name"
      v-bind="pollItemsDragOptionsInSidebar"
      :list="pollList"
      @change="draggEvent"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <div class="poll-page-zone" v-if="!hasPollElements">
        <img
          class="poll-page-zone__image"
          src="./../assets/img/add-ico.svg"
          alt=""
        />
        <span>Перенесите нужный вам тип вопроса в эту</span>
        <span>область страницы</span>
      </div>
      <transition-group
        type="transition"
        :name="isDragging ? 'flip-list' : null"
      >
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
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import PollElement from "./PollElement.vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    currenPage: { type: Object },
    currenPageNumber: { type: [String, Number] },
  },
  components: {
    PollElement,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      isDragging: false,
      pollList: this.currenPage.pollList,
    };
  },
  computed: {
    hasPollElements() {
      return this.currenPage.pollList.length > 0;
    },

    pollItemsDragOptionsInSidebar() {
      return {
        animation: 0,
        group: "pollTypes",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    ...mapMutations([
      "editPageComment",
      "dragSortPollsInPage",
      "dragAddPollInPage",
    ]),

    draggEvent(event) {
      const pollPageId = this.currenPage.id;
      if (event.added) {
        const pollType = event.added.element.type;
        const addedIndex = event.added.newIndex;
        // this.dragAddPollInPage({ pollPageId, pollType, addedIndex });
      }
      if (event.moved) {
        const pollId = event.moved.element.id;
        const pollNewIndex = event.moved.newIndex;
        console.log(pollId, pollNewIndex);
        // this.$store.commit("dragSortPollsInPage", { pageId });
      }
    },
    editComment(event) {
      const pollPageId = this.currenPage.id;
      const commentValue = event.target.value.trim();
      this.editPageComment({ pollPageId, commentValue });
    },
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}
</style>

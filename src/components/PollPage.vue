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
      v-model="pollList"
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
          v-for="(pollItem, index) in pollList"
          :pollPageId="currenPage.id"
          :pollItemId="pollItem.id"
          :pollItemType="pollItem.type"
          :pollItemDescr="pollItem.typeDescr"
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
    };
  },
  computed: {
    pollList: {
      get() {
        return this.currenPage.pollList;
      },
      set(sortableList) {
        const pollPageId = this.currenPage.id;
        this.dragSortPollsInPage({ pollPageId, sortableList });
      },
    },

    hasPollElements() {
      return this.currenPage.pollList.length > 0;
    },

    pollItemsDragOptionsInSidebar() {
      return {
        animation: 0,
        group: "pollTypes",
        disabled: false,
        ghostClass: "ghost",
        sort: "true",
      };
    },
  },
  methods: {
    ...mapMutations([
      "editPageComment",
      "dragSortPollsInPage",
      "dragAddPollInPage",
    ]),
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
  opacity: 0.5;
  background-color: #c8ebfb;
}
.sidebar-item.ghost {
  opacity: 0.7;
  margin-bottom: 0;
  background-color: transparent;
  .sidebar-item__wrapper {
    padding: 30px 20px !important;
  }
  .sidebar-item__ico {
    width: 24px;
    height: 24px;
  }
  .sidebar-item__name {
    font-size: 18px;
    font-weight: 500;
  }
  .sidebar-item__btn {
    display: none;
  }
}
</style>

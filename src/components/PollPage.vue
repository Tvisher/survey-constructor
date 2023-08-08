<template>
  <div class="poll-page-head">
    <div class="poll-page-number">Страница {{ currenPageNumber }}</div>
    <button
      v-if="showRemoveBtnInPage"
      class="remove-btn"
      @click="removePage"
    ></button>
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
          :pollItemId="pollItem.id"
          :pollItemType="pollItem.type"
          :pollItemDescr="pollItem.typeDescr"
          :pollItemName="pollItem.typeName"
          :pollItemData="pollItem.data"
          :key="`${currenPage.id}-${pollItem.id}`"
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
    showRemoveBtnInPage: { type: Boolean },
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
      showPage: false,
    };
  },
  computed: {
    pollList: {
      get() {
        return this.currenPage.pollList;
      },
      set(sortableList) {
        this.dragSortPollsInPage({ sortableList });
      },
    },

    hasPollElements() {
      return this.currenPage.pollList.length > 0;
    },

    pollItemsDragOptionsInSidebar() {
      return {
        scrollSensitivity: 200,
        forceFallback: true,
        animation: 400,
        group: "pollTypes",
        disabled: false,
        ghostClass: "ghost",
        sort: true,
      };
    },
  },
  methods: {
    ...mapMutations([
      "editPageComment",
      "dragSortPollsInPage",
      "dragAddPollInPage",
      "removePollPage",
    ]),
    editComment(event) {
      const pollPageId = this.currenPage.id;
      const commentValue = event.target.value.trim();
      this.editPageComment({ pollPageId, commentValue });
    },

    removePage() {
      this.removePollPage(this.currenPage.id);
    },
  },
};
</script>

<style lang="scss">
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

.fade-page {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>

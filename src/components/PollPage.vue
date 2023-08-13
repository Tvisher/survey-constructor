<template>
  <div class="poll-page-head">
    <div class="poll-page-number">Страница {{ currenPageNumber }}</div>
    <button v-if="showRemoveBtnInPage" class="remove-btn" @click="removePage">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.625 1.875H10.838L10.5333 0.961313C10.4401 0.681239 10.2611 0.437625 10.0217 0.265061C9.78223 0.0924975 9.4945 -0.000245665 9.19934 4.88728e-07H6.80066C6.50546 -0.000195446 6.2177 0.0925603 5.97818 0.265111C5.73867 0.437661 5.55957 0.681246 5.46628 0.961313L5.16194 1.875H2.375C1.59956 1.875 0.96875 2.50581 0.96875 3.28125V4.21875C0.96875 4.74088 1.43878 4.6875 1.94322 4.6875H14.5625C14.8216 4.6875 15.0312 4.47784 15.0312 4.21875V3.28125C15.0312 2.50581 14.4004 1.875 13.625 1.875ZM6.15041 1.875L6.35572 1.25794C6.38684 1.16457 6.44657 1.08337 6.52643 1.02585C6.60629 0.968337 6.70224 0.937425 6.80066 0.9375H9.19934C9.40122 0.9375 9.58022 1.06613 9.64384 1.25794L9.84937 1.875H6.15041ZM2.02081 5.6875L2.76822 14.721C2.83459 15.4502 3.43656 16 4.16853 16H11.8315C12.5635 16 13.1654 15.4502 13.2323 14.7169L13.9793 5.6875H2.02081ZM5.65625 13.6563C5.65625 14.2742 4.71875 14.2767 4.71875 13.6563V7.09375C4.71875 6.47584 5.65625 6.47331 5.65625 7.09375V13.6563ZM8.46875 13.6563C8.46875 14.2742 7.53125 14.2767 7.53125 13.6563V7.09375C7.53125 6.47584 8.46875 6.47331 8.46875 7.09375V13.6563ZM11.2812 13.6563C11.2812 14.2742 10.3438 14.2767 10.3438 13.6563V7.09375C10.3438 6.83466 10.5534 6.625 10.8125 6.625C11.0716 6.625 11.2812 6.83466 11.2812 7.09375V13.6563Z"
          fill="var(--app-color)"
        />
      </svg>
    </button>
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
        <div class="poll-page-zone__image"></div>
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
// .ghost {
//   opacity: 0.5;
//   background-color: #c8ebfb;
// }

.poll-item.ghost,
.sidebar-item.ghost {
  background-color: transparent;
  border: 1px dashed var(--app-color);
  border-radius: 4px;
  & > * {
    opacity: 0;
  }
}
// .sidebar-item.ghost {
//   .sidebar-item__btn,
//   .sidebar-item__wrapper::after,
//   .sidebar-item__ico {
//     display: none;
//   }
//   .sidebar-item__name {
//     width: 100%;
//     font-size: 22px;
//   }
//   border: 1px dashed var(--app-color);
// }

.poll-item.sortable-drag {
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  border: 1px solid #ecf4ff;
  transform: rotate(-3deg);
  opacity: 1 !important;
}
</style>

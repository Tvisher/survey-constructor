<template>
  <div class="container">
    <div class="app-container">
      <div class="polls-container">
        <polls-pages-pagination
          :pollPagesList="pollPagesList"
          :currentPageId="currentPageId"
        />
        <div class="poll-pages">
          <poll-page
            :currenPage="currentPollPage"
            :currenPageNumber="currenPageNumber"
          />
        </div>
      </div>
      <div class="poll-list-sidebar">
        <div class="poll-list-sidebar__wrapper">
          <draggable
            :list="pollTypesList"
            handle=".sidebar-item__wrapper"
            v-bind="{ ghostClass: 'sidebrGhostItem' }"
            :group="{ name: 'pollTypes', pull: 'clone', put: false }"
            :sort="false"
          >
            <sidebar-item
              v-for="(pollTemplate, index) in pollTypesList"
              :key="index"
              :name="pollTemplate.typeName"
              :type="pollTemplate.type"
            />
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import SidebarItem from "./SidebarItem.vue";
import PollPage from "./PollPage.vue";
import PollsPagesPagination from "./PollsPagesPagination";
import { mapState } from "vuex";
export default {
  components: {
    PollPage,
    SidebarItem,
    PollsPagesPagination,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      sidebarItemDraggablePositions: {
        indexInPage: "",
        indexInSidebar: "",
      },
    };
  },
  methods: {
    // checkMove(event) {
    //   this.sidebarItemDraggablePositions.indexInPage =
    //     event.draggedContext.futureIndex;
    //   this.sidebarItemDraggablePositions.indexInSidebar =
    //     event.draggedContext.index;
    //   console.log(this.sidebarItemDraggablePositions);
    // },
    // onDragComplite(event) {
    //   const sideBarItemType = event.added.element.type;
    //   console.log(sideBarItemType);
    // },
  },
  computed: {
    ...mapState({
      currentPageId: (state) => state.currentPageId,
      pollPagesList: (state) => state.pollPages,
      pollTypesList: (state) => state.pollTypesList,
    }),

    currentPollPage() {
      return this.pollPagesList.find((page) => page.id === this.currentPageId);
    },

    currenPageNumber() {
      const pageIndex = this.pollPagesList.findIndex(
        (page) => page.id === this.currentPageId
      );
      return pageIndex + 1;
    },
  },
};
</script>

<style lang="scss">
.sidebrGhostItem {
}
</style>

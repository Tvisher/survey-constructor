<template>
  <div class="container">
    <div class="app-container">
      <div class="polls-container">
        <polls-pages-pagination
          :pollPagesList="pollPagesList"
          :currentPageId="currentPageId"
        />

        <div class="poll-pages">
          <app-poll-page
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
            v-bind="dragOptionsInSidebar"
          >
            <app-sidebar-item
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
import AppSidebarItem from "./SidebarItem.vue";
import AppPollPage from "./PollPage.vue";
import PollsPagesPagination from "./PollsPagesPagination";
import { mapState } from "vuex";
export default {
  components: {
    AppPollPage,
    AppSidebarItem,
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
  methods: {},
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

    dragOptionsInSidebar() {
      return {
        group: { name: "pollTypes", pull: "clone", put: false },
        scrollSensitivity: 200,
        forceFallback: true,
        animation: 0,
        disabled: false,
        sort: false,
        ghostClass: "sidebrGhostItem",
      };
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="container">
    <div class="app-container">
      <div class="polls-container">
        <polls-pagination
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
          <sidebar-item
            v-for="(pollTemplate, index) in pollTypesList"
            :key="index"
            :name="pollTemplate.typeName"
            :type="pollTemplate.type"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PollElement from "./PollElement.vue";
import SidebarItem from "./SidebarItem.vue";
import PollPage from "./PollPage.vue";
import PollsPagination from "./PollsPagination";
import { mapState } from "vuex";
export default {
  components: {
    PollPage,
    SidebarItem,
    PollsPagination,
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
.polls-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 23px;
  padding: 15px 20px;
  background: #ecf4ff;
}
.poll-page-head {
  margin-bottom: 20px;
  color: #202020;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.polls-page-btn {
  cursor: pointer;
  margin-right: 21px;
  width: 50px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #262b31;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 12px 0px rgba(37, 51, 66, 0.08);
  &.active {
    color: #fff;
    background-color: #fa0056;
  }
}
</style>

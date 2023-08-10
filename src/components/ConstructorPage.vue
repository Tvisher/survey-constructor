<template>
  <div class="app-container">
    <div class="constructor__handlers">
      <router-link to="/" class="btn red-btn">К настройкам</router-link>
    </div>
    <div class="app-container__inner">
      <div class="polls-container">
        <polls-pages-pagination
          :pollPagesList="pollPagesList"
          :currentPageId="currentPageId"
          :pagesLimit="pagesLimit"
        />
        <div class="poll-pages">
          <app-poll-page
            :currenPage="currentPollPage"
            :currenPageNumber="currenPageNumber"
            :showRemoveBtnInPage="showRemoveBtnInPage"
          />
        </div>
      </div>
      <app-sidebar :pollTypesList="pollTypesList" />
    </div>
  </div>
</template>

<script>
import AppPollPage from "./PollPage.vue";
import AppSidebar from "./Sidebar.vue";
import PollsPagesPagination from "./PollsPagesPagination";
import { mapState } from "vuex";
export default {
  components: {
    AppPollPage,
    AppSidebar,
    PollsPagesPagination,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      currentPageId: (state) => state.currentPageId,
      pagesLimit: (state) => state.pagesLimit,
      pagesMinLength: (state) => state.pagesMinLength,
      pollPagesList: (state) => state.pollPages,
      pollTypesList: (state) => state.pollTypesList,
    }),
    showRemoveBtnInPage() {
      return this.pollPagesList.length > this.pagesMinLength;
    },

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

<style lang="scss"></style>

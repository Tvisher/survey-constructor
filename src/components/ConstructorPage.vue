<template>
  <div class="app-container">
    <div class="constructor__handlers">
      <router-link to="/" class="btn app-btn">К настройкам</router-link>
      <div class="btn app-btn" @click="saveData">Сохранить</div>
    </div>
    <div class="app-container__inner">
      <div class="polls-container">
        <polls-pages-pagination
          v-if="appType != 'viktorina'"
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
      <transition name="fade">
        <app-sidebar :pollTypesList="pollTypesList" v-if="sidebarVisible" />
      </transition>
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
  methods: {
    saveData() {
      this.$store.dispatch("setQuizData");
      alert("Успешно сохранено");
    },
  },
  computed: {
    ...mapState({
      appType: (state) => state.appType,
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
    sidebarVisible() {
      return this.pollTypesList.length > 0;
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="app-container">
    <div class="constructor__handlers">
      <router-link to="/" class="btn app-btn">К настройкам</router-link>
      <transition name="fade">
        <div class="btn app-btn" v-if="pollHasElements" @click="saveData">
          Сохранить
        </div>
      </transition>
      <transition name="fade">
        <div
          class="btn app-btn"
          v-if="pollHasElements"
          @click="saveAndOpenResult"
        >
          Посмотреть результат
        </div>
      </transition>
    </div>
    <div class="app-container__inner">
      <div class="polls-container">
        <polls-pages-pagination
          v-if="appType != 'quiz'"
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
      this.$store
        .dispatch("setQuizData")
        .then((response) => {
          alert("Успешно сохранено");
        })
        .catch((error) => {
          alert("Произошла ошибка");
        });
    },
    saveAndOpenResult() {
      this.$store
        .dispatch("setQuizData")
        .then((response) => {
          console.log(response);
          window.open(`/lk/poll/public/quizelem/?id=${this.appId}`, "_blank");
        })
        .catch((error) => {
          console.log(error);
          alert("Произошла ошибка");
        });
    },
  },
  computed: {
    ...mapState({
      appId: (state) => state.appId,
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
    pollHasElements() {
      return this.pollPagesList[0].pollList.length > 0;
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

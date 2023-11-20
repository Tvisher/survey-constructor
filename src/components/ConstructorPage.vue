<template>
  <div class="app-container" :class="{ editingIsBlocked }">
    <div class="constructor__handlers">
      <router-link to="/" class="btn app-btn">К настройкам</router-link>
      <transition name="fade">
        <div
          class="btn app-btn save-btn"
          v-if="pollHasElements"
          @click="saveData"
        >
          <span>Сохранить</span>
        </div>
      </transition>
      <transition name="fade">
        <div
          class="btn app-btn save-and-open-btn"
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
        <div class="constructor__handlers constructor__handlers__footer">
          <router-link to="/" class="btn app-btn">К настройкам</router-link>
          <transition name="fade">
            <div
              class="btn app-btn save-btn"
              v-if="pollHasElements"
              @click="saveData"
            >
              <span>Сохранить</span>
              <!-- <div class="save-ok"></div> -->
            </div>
          </transition>
          <transition name="fade">
            <div
              class="btn app-btn save-and-open-btn"
              v-if="pollHasElements"
              @click="saveAndOpenResult"
            >
              Посмотреть результат
            </div>
          </transition>
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
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    AppPollPage,
    AppSidebar,
    PollsPagesPagination,
  },
  data() {
    return {
      btnLoaded: false,
    };
  },
  methods: {
    saveData() {
      if (this.editingIsBlocked) return;

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
      if (this.editingIsBlocked) return;
      this.$store
        .dispatch("setQuizData")
        .then((response) => {
          console.log(response);
          window.open(
            `/lk/poll/public/${this.appType}elem/?id=${this.appId}`,
            "_blank"
          );
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
    ...mapGetters(["editingIsBlocked"]),
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

<style lang="scss">
.constructor__handlers__footer {
  border-radius: 0px 0px 8px 8px !important;
}
.poll-pages {
  border-radius: 8px 8px 0px 0px !important;
}

// .lds-dual-ring {
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 34px;
//   height: 34px;
// }
// .lds-dual-ring:after {
//   content: " ";
//   display: block;
//   width: 34px;
//   height: 34px;
//   border-radius: 50%;
//   border: 4px solid #fff;
//   border-color: #fff transparent #fff transparent;
//   animation: lds-dual-ring 1.2s linear infinite;
// }
// @keyframes lds-dual-ring {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

// .app-btn {
//   position: relative;
// }

// .save-ok {
//   width: 20px;
//   height: 20px;
//   svg {
//     width: 100%;
//     height: 100%;
//   }
// }
// .save-btn {
//   display: flex;
//   align-items: center;
//   gap: 20px;
// }
</style>

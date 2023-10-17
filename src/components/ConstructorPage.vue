<template>
  <div class="app-container">
    <div class="constructor__handlers">
      <router-link to="/" class="btn app-btn">К настройкам</router-link>
      <transition name="fade">
        <div
          class="btn app-btn save-btn"
          v-if="pollHasElements"
          @click="saveData"
        >
          <span>Сохранить</span>
          <!-- <div class="save-ok">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="1280.000000pt"
              height="1253.000000pt"
              viewBox="0 0 1280.000000 1253.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g
                transform="translate(0.000000,1253.000000) scale(0.100000,-0.100000)"
                fill="var(--app-text-color)"
                stroke="none"
              >
                <path
                  d="M12000 12520 c-192 -27 -395 -98 -655 -230 -446 -225 -961 -590
-1620 -1149 -926 -785 -2158 -2000 -3466 -3416 -661 -717 -1389 -1537 -1913
-2157 -87 -104 -159 -188 -160 -188 -1 0 -67 34 -146 76 -255 134 -875 442
-1078 536 -849 391 -1441 595 -1912 659 -134 18 -368 13 -479 -10 -224 -48
-405 -181 -495 -366 -52 -104 -69 -183 -70 -310 -1 -105 1 -113 32 -177 29
-59 55 -87 235 -254 438 -407 919 -904 1273 -1315 792 -921 1625 -2167 2579
-3858 168 -297 234 -355 405 -355 66 0 96 5 132 21 113 51 158 111 238 313
135 341 398 964 565 1335 1285 2866 2820 5295 4654 7365 520 587 971 1049
1821 1866 665 640 790 788 844 1005 81 328 -187 601 -604 614 -63 2 -144 0
-180 -5z"
                />
              </g>
            </svg>
          </div> -->
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
        <div class="constructor__handlers constructor__handlers__footer">
          <router-link to="/" class="btn app-btn">К настройкам</router-link>
          <transition name="fade">
            <div class="btn app-btn" v-if="pollHasElements" @click="saveData">
              <span>Сохранить</span>
              <!-- <div class="save-ok"></div> -->
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
    return {
      btnLoaded: false,
    };
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

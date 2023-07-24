<template>
  <div class="container">
    <div class="app-container">
      <div class="polls-container">
        <div class="polls-pages">
          <div
            class="polls-page"
            v-for="(pollPage, index) in pollPagesList"
            :key="pollPage.id"
            :class="{ active: pollPage.id === currentPageId }"
            @click="setCurrentPollPage(pollPage.id)"
          >
            {{ index + 1 }}
          </div>
        </div>
        <div class="poll-elements">
          <div class="poll-elements__title">Название опроса</div>
          <poll-element
            v-for="(pollItem, index) in pollPage.pollList"
            :pollPageId="pollPage.id"
            :pollItemId="pollItem.id"
            :pollItemType="pollItem.type"
            :pollItemName="pollItem.typeName"
            :pollItemData="pollItem.data"
            :key="pollItem.id"
            :pollNumber="index"
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
import PollElement from "./PollElement.vue";
import SidebarItem from "./SidebarItem.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    PollElement,
    SidebarItem,
  },
  methods: {
    ...mapMutations(["setCurrentPollPage"]),
  },
  computed: {
    ...mapState({
      currentPageId: (state) => state.currentPageId,
      pollPagesList: (state) => state.pollPages,
      pollTypesList: (state) => state.pollTypesList,
    }),
    pollPage() {
      return this.pollPagesList.find((page) => page.id === this.currentPageId);
    },
  },
};
</script>

<style lang="scss">
.polls-pages {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 23px;
}

.polls-page {
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

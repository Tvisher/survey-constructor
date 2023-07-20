<template>
  <div class="container">
    <div class="poll-container">
      <div class="poll-elements">
        <div class="poll-elements__title">Название опроса</div>
        <poll-element
          v-for="(pollItem, index) in pollList"
          :pollItemType="pollItem.type"
          :pollItemName="pollItem.typeName"
          :pollItemData="pollItem.data"
          :key="pollItem.id"
          :pollItemId="pollItem.id"
          :pollNumber="index"
        />
      </div>
      <div class="poll-list-sidebar">
        <div class="poll-list-sidebar__wrapper">
          <sidebar-item
            v-for="pollTemplate in pollTypesList"
            :key="pollTemplate.id"
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
import { mapState } from "vuex";
export default {
  components: {
    PollElement,
    SidebarItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pollList: (state) => state.pollList,
      pollTypesList: (state) => state.pollTypesList,
    }),
  },
  methods: {},
  mounted() {
    // console.log(this.pollTypesList);
  },
};
</script>

<style>
#app {
  margin-top: 60px;
}

.poll-elements {
  max-width: 790px;
  width: 100%;
}
.poll-elements__title {
  margin-bottom: 20px;
  text-align: center;
  color: #202020;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
}

.container {
  max-width: 1180px;
  margin: auto;
}

.poll-elements {
  padding: 20px;
  border-radius: 8px;
  background: #ecf4ff;
}

.poll-container {
  align-items: flex-start;
  display: flex;
  gap: 30px;
}

.poll-list-sidebar {
  max-width: 350px;
  width: 100%;
  padding: 15px;
  background: #ecf4ff;
  position: sticky;
  top: 30px;
  left: 0;
}
.poll-list-sidebar__wrapper {
}
</style>

<template>
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
          :type="pollTemplate.type"
          :name="pollTemplate.typeName"
          @addPollItem="addPollItem"
        />
      </draggable>
    </div>
    <app-confirm-modal
      :showModal="showModal"
      :title="modalData.title"
      :description="modalData.description"
      :isOkModalType="true"
      @confirmRemove="showModal = false"
      @cancel="showModal = false"
    />
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import AppSidebarItem from "./pollSegments/SidebarItem.vue";
import { mapMutations, mapGetters } from "vuex";
import AppConfirmModal from "./ConfirmModal.vue";

export default {
  props: { pollTypesList: { type: Array } },
  components: {
    AppSidebarItem,
    draggable: VueDraggableNext,
    AppConfirmModal,
  },

  data() {
    return {
      showModal: false,
      modalData: {
        title: "Превышен лимит вопросов на странице",
        description: "Для увеличения лимита, необходим другой тариф",
      },
    };
  },
  computed: {
    ...mapGetters(["isHasPagePollsLimit"]),
    dragOptionsInSidebar() {
      return {
        group: { name: "pollTypes", pull: "clone", put: false },
        scrollSensitivity: 200,
        forceFallback: true,
        animation: 0,
        disabled: false,
        sort: false,
      };
    },
  },

  methods: {
    ...mapMutations(["addPollInState"]),
    addPollItem(type) {
      if (this.isHasPagePollsLimit) {
        this.showModal = true;
      } else {
        this.addPollInState(type);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sortable-drag {
  opacity: 1 !important;
  background-color: #fff;
  .sidebar-item__btn {
    margin-left: 0 !important;
  }
}
</style>

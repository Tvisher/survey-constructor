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
          :name="pollTemplate.typeName"
          :type="pollTemplate.type"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import AppSidebarItem from "./pollSegments/SidebarItem.vue";

export default {
  components: {
    AppSidebarItem,
    draggable: VueDraggableNext,
  },
  props: { pollTypesList: { type: Array } },
  computed: {
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

<style></style>

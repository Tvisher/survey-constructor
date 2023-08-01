<template>
  <div class="sidebar-item" :class="type">
    <div class="sidebar-item__wrapper">
      <div class="sidebar-item__ico"></div>
      <div class="sidebar-item__name">{{ name }}</div>
    </div>
    <div
      class="sidebar-item__btn"
      @click="addPollInState(type)"
      title="Добавить в конец страницы"
    ></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    name: { type: String },
    type: { type: String },
  },
  methods: {
    ...mapMutations(["addPollInState"]),
  },
};
</script>

<style></style>

<template>
  <div class="sidebar-item">
    <div class="sidebar-item__wrapper">
      <div class="sidebar-item__ico"></div>
      <div class="sidebar-item__name">{{ name }}</div>
    </div>
    <div class="sidebar-item__btn" @click="addPollInState(type)"></div>
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

<style>
.sidebar-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.sidebar-item__wrapper {
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  background-color: #fff;
  width: 100%;
}
.sidebar-item__ico {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: red;
  margin-right: 16px;
}
.sidebar-item__btn {
  cursor: pointer;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  margin-left: 10px;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1212_1378)'%3e%3cpath d='M8.93164 0C7.34939 0 5.80268 0.469192 4.48708 1.34824C3.17149 2.22729 2.14611 3.47672 1.54061 4.93853C0.935107 6.40034 0.77668 8.00887 1.08536 9.56072C1.39404 11.1126 2.15597 12.538 3.27479 13.6569C4.39361 14.7757 5.81907 15.5376 7.37092 15.8463C8.92277 16.155 10.5313 15.9965 11.9931 15.391C13.4549 14.7855 14.7043 13.7602 15.5834 12.4446C16.4625 11.129 16.9316 9.58225 16.9316 8C16.9294 5.87897 16.0858 3.84547 14.586 2.34568C13.0862 0.845886 11.0527 0.00229405 8.93164 0V0ZM11.5983 8.66667H9.59831V10.6667C9.59831 10.8435 9.52807 11.013 9.40305 11.1381C9.27802 11.2631 9.10846 11.3333 8.93164 11.3333C8.75483 11.3333 8.58526 11.2631 8.46024 11.1381C8.33522 11.013 8.26498 10.8435 8.26498 10.6667V8.66667H6.26498C6.08817 8.66667 5.9186 8.59643 5.79357 8.47141C5.66855 8.34638 5.59831 8.17681 5.59831 8C5.59831 7.82319 5.66855 7.65362 5.79357 7.5286C5.9186 7.40357 6.08817 7.33333 6.26498 7.33333H8.26498V5.33333C8.26498 5.15652 8.33522 4.98695 8.46024 4.86193C8.58526 4.73691 8.75483 4.66667 8.93164 4.66667C9.10846 4.66667 9.27802 4.73691 9.40305 4.86193C9.52807 4.98695 9.59831 5.15652 9.59831 5.33333V7.33333H11.5983C11.7751 7.33333 11.9447 7.40357 12.0697 7.5286C12.1947 7.65362 12.265 7.82319 12.265 8C12.265 8.17681 12.1947 8.34638 12.0697 8.47141C11.9447 8.59643 11.7751 8.66667 11.5983 8.66667Z' fill='%23FA0056'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1212_1378'%3e%3crect width='16' height='16' fill='white' transform='translate(0.931641)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
}
</style>

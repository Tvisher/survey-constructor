<template>
  <div class="editor-descr">параметры выбора даты</div>
  <label class="custom-cb">
    <input
      type="checkbox"
      v-model="dateDataInComponent.range"
      class="custom-cb__checkbox"
      @input="checkRande"
    />
    <span class="custom-cb__text">Разрешить диапазон дат</span>
  </label>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemId: { type: [Number, String] },
    dateData: { type: Object },
  },
  data() {
    return {
      dateDataInComponent: null,
    };
  },
  computed: {},
  methods: {
    ...mapMutations(["setDateOption"]),
    checkRande() {
      const { pollItemId, dateDataInComponent } = this;
      this.setDateOption({ pollItemId, dateDataInComponent });
    },
  },
  beforeMount() {
    this.dateDataInComponent = JSON.parse(JSON.stringify(this.dateData));
  },
};
</script>

<style></style>

<template>
  <div class="range-selection__creater">
    <label class="range-selection__label">
      <span class="editor-descr">От</span>
      <input
        class="variant-item__filed"
        v-model="range.min"
        type="text"
        @input="updateValue($event, 'min')"
      />
    </label>
    <label class="range-selection__label">
      <span class="editor-descr">До</span>
      <input
        class="variant-item__filed"
        v-model="range.max"
        type="text"
        @input="updateValue($event, 'max')"
      />
    </label>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    pollItemId: { type: [Number, String] },
    rangeData: { type: Object },
  },
  data() {
    return {
      range: {
        min: "",
        max: "",
      },
    };
  },

  methods: {
    ...mapMutations(["setRangeSelectionValues"]),

    updateValue(event, type) {
      let filteredValue = event.target.value.replace(/[^0-9]/g, "");
      if (/^0[0-9]/.test(filteredValue)) {
        filteredValue = filteredValue.slice(1);
      }
      this.range[type] = filteredValue;

      const pollItemId = this.pollItemId;
      const rangeData = this.range;
      this.setRangeSelectionValues({ pollItemId, rangeData });
    },
  },

  mounted() {
    this.range.min = this.rangeData.min;
    this.range.max = this.rangeData.max;
  },
};
</script>

<style></style>

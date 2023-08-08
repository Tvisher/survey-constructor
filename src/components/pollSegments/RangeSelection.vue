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
  <div v-if="showDefaultMinMax">
    <span class="editor-descr"
      >Укажите стартовое положение ползунков для пользователя</span
    >
    <div class="range-selection__creater">
      <div class="range-slider-visual">
        <div class="range-slider__min">
          {{ range.min }}
        </div>
        <Slider
          :direction="sliderDirection"
          v-model="sliderDefaultValues"
          :min="minToSlider"
          :max="maxToSlider"
        />
        <div class="range-slider__max">
          {{ range.max }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Slider from "@vueform/slider";

export default {
  components: { Slider },
  props: {
    pollItemId: { type: [Number, String] },
    rangeData: { type: Object },
  },
  data() {
    return {
      range: {
        min: "",
        max: "",
        defaultMin: "",
        defaultMax: "",
      },
    };
  },
  computed: {
    showDefaultMinMax() {
      return this.range.min !== "" && this.range.max !== "";
    },

    sliderDirection() {
      return this.strToNum(this.range.max) >= this.strToNum(this.range.min)
        ? "ltr"
        : "rtl";
    },

    minToSlider() {
      return this.sliderDirection === "ltr"
        ? this.strToNum(this.range.min)
        : this.strToNum(this.range.max);
    },
    maxToSlider() {
      return this.sliderDirection === "ltr"
        ? this.strToNum(this.range.max)
        : this.strToNum(this.range.min);
    },

    sliderDefaultValues: {
      get() {
        let minParam =
          this.sliderDirection === "ltr"
            ? this.range.defaultMin
            : this.range.defaultMax;
        let maxParam =
          this.sliderDirection === "ltr"
            ? this.range.defaultMax
            : this.range.defaultMin;
        minParam = this.strToNum(minParam);
        maxParam = this.strToNum(maxParam);
        return [minParam, maxParam];
      },
      set(rangeData) {
        if (this.sliderDirection === "ltr") {
          this.range.defaultMin = String(rangeData[0]);
          this.range.defaultMax = String(rangeData[1]);
        } else {
          this.range.defaultMin = String(rangeData[1]);
          this.range.defaultMax = String(rangeData[0]);
        }
        this.setData();
      },
    },
  },

  methods: {
    ...mapMutations(["setRangeSelectionValues"]),

    updateValue(event, type) {
      let filteredValue = this.strToNum(event.target.value);
      if (/^0[0-9]/.test(filteredValue)) {
        filteredValue = filteredValue.slice(1);
      }
      this.range[type] = +filteredValue;
      this.range.defaultMax = this.range.max;
      this.range.defaultMin = this.range.min;
      this.setData();
    },
    setData() {
      const pollItemId = this.pollItemId;
      const rangeData = this.range;
      this.setRangeSelectionValues({ pollItemId, rangeData });
    },

    strToNum(value) {
      return +String(value).replace(/[^0-9]/g, "");
    },
  },

  mounted() {
    this.range = { ...this.rangeData };
  },
};
</script>

<style></style>

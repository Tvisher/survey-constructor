<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__head-wrapper">
        <div class="poll-item__name">
          <div class="poll-item__num">{{ indexNumber }}</div>
          <div class="poll-item__title">{{ pollItemName }}</div>
        </div>
        <Popper
          v-if="!isVisualType"
          :content="pollItemDescr"
          :hover="true"
          :arrow="true"
          :placement="'right'"
        >
          <button class="tolltip-btn"></button>
        </Popper>
      </div>
      <div class="poll-item__handlers">
        <button
          class="poll-edit"
          @click="pollEdit"
          :class="{ setting: !isVisualType }"
        >
          <svg
            v-if="isVisualType"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.2788 0.15224C10.9085 4.47035e-08 10.439 0 9.5 0C8.561 0 8.0915 4.47035e-08 7.7212 0.15224C7.2274 0.35523 6.83509 0.74458 6.63056 1.23463C6.53719 1.45834 6.50065 1.7185 6.48635 2.09799C6.46534 2.65568 6.17716 3.17189 5.69017 3.45093C5.20318 3.72996 4.60864 3.71954 4.11149 3.45876C3.77318 3.2813 3.52789 3.18262 3.28599 3.15102C2.75609 3.08178 2.22018 3.22429 1.79616 3.5472C1.47814 3.78938 1.24339 4.1929 0.773898 4.99993C0.304408 5.80697 0.0696677 6.21048 0.0173477 6.60491C-0.0524223 7.1308 0.0911777 7.66266 0.416548 8.0835C0.565058 8.2756 0.773768 8.437 1.0977 8.639C1.57391 8.936 1.88032 9.4419 1.88029 10C1.88026 10.5581 1.57386 11.0639 1.0977 11.3608C0.773718 11.5629 0.564968 11.7244 0.416448 11.9165C0.0910778 12.3373 -0.0525122 12.8691 0.0172478 13.395C0.0695678 13.7894 0.304318 14.193 0.773798 15C1.24329 15.807 1.47804 16.2106 1.79606 16.4527C2.22008 16.7756 2.75599 16.9181 3.28589 16.8489C3.52778 16.8173 3.77305 16.7186 4.11133 16.5412C4.60852 16.2804 5.2031 16.27 5.69012 16.549C6.17714 16.8281 6.46533 17.3443 6.48635 17.9021C6.50065 18.2815 6.53719 18.5417 6.63056 18.7654C6.83509 19.2554 7.2274 19.6448 7.7212 19.8478C8.0915 20 8.561 20 9.5 20C10.439 20 10.9085 20 11.2788 19.8478C11.7726 19.6448 12.1649 19.2554 12.3694 18.7654C12.4628 18.5417 12.4994 18.2815 12.5137 17.902C12.5347 17.3443 12.8228 16.8281 13.3098 16.549C13.7968 16.2699 14.3914 16.2804 14.8886 16.5412C15.2269 16.7186 15.4721 16.8172 15.714 16.8488C16.2439 16.9181 16.7798 16.7756 17.2038 16.4527C17.5219 16.2105 17.7566 15.807 18.2261 14.9999C18.6956 14.1929 18.9303 13.7894 18.9827 13.395C19.0524 12.8691 18.9088 12.3372 18.5835 11.9164C18.4349 11.7243 18.2262 11.5628 17.9022 11.3608C17.4261 11.0639 17.1197 10.558 17.1197 9.9999C17.1197 9.4418 17.4261 8.9361 17.9022 8.6392C18.2263 8.4371 18.435 8.2757 18.5836 8.0835C18.9089 7.66273 19.0525 7.13087 18.9828 6.60497C18.9304 6.21055 18.6957 5.80703 18.2262 5C17.7567 4.19297 17.522 3.78945 17.2039 3.54727C16.7799 3.22436 16.244 3.08185 15.7141 3.15109C15.4722 3.18269 15.2269 3.28136 14.8887 3.4588C14.3915 3.71959 13.7969 3.73002 13.3099 3.45096C12.8229 3.17191 12.5347 2.65566 12.5136 2.09794C12.4993 1.71848 12.4628 1.45833 12.3694 1.23463C12.1649 0.74458 11.7726 0.35523 11.2788 0.15224ZM9.5 13C11.1695 13 12.5228 11.6569 12.5228 10C12.5228 8.3431 11.1695 7 9.5 7C7.8305 7 6.47716 8.3431 6.47716 10C6.47716 11.6569 7.8305 13 9.5 13Z"
              fill="var(--app-color)"
            />
          </svg>
          <svg
            v-else
            width="22"
            height="15"
            viewBox="0 0 22 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z"
              fill="var(--app-color)"
            />
          </svg>
        </button>
        <!-- <button class="poll-remove" @click="showModal = true"> -->
        <button class="poll-remove" @click="pollRemove()">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.625 1.875H10.838L10.5333 0.961313C10.4401 0.681239 10.2611 0.437625 10.0217 0.265061C9.78223 0.0924975 9.4945 -0.000245665 9.19934 4.88728e-07H6.80066C6.50546 -0.000195446 6.2177 0.0925603 5.97818 0.265111C5.73867 0.437661 5.55957 0.681246 5.46628 0.961313L5.16194 1.875H2.375C1.59956 1.875 0.96875 2.50581 0.96875 3.28125V4.21875C0.96875 4.74088 1.43878 4.6875 1.94322 4.6875H14.5625C14.8216 4.6875 15.0312 4.47784 15.0312 4.21875V3.28125C15.0312 2.50581 14.4004 1.875 13.625 1.875ZM6.15041 1.875L6.35572 1.25794C6.38684 1.16457 6.44657 1.08337 6.52643 1.02585C6.60629 0.968337 6.70224 0.937425 6.80066 0.9375H9.19934C9.40122 0.9375 9.58022 1.06613 9.64384 1.25794L9.84937 1.875H6.15041ZM2.02081 5.6875L2.76822 14.721C2.83459 15.4502 3.43656 16 4.16853 16H11.8315C12.5635 16 13.1654 15.4502 13.2323 14.7169L13.9793 5.6875H2.02081ZM5.65625 13.6563C5.65625 14.2742 4.71875 14.2767 4.71875 13.6563V7.09375C4.71875 6.47584 5.65625 6.47331 5.65625 7.09375V13.6563ZM8.46875 13.6563C8.46875 14.2742 7.53125 14.2767 7.53125 13.6563V7.09375C7.53125 6.47584 8.46875 6.47331 8.46875 7.09375V13.6563ZM11.2812 13.6563C11.2812 14.2742 10.3438 14.2767 10.3438 13.6563V7.09375C10.3438 6.83466 10.5534 6.625 10.8125 6.625C11.0716 6.625 11.2812 6.83466 11.2812 7.09375V13.6563Z"
              fill="var(--app-color)"
            />
          </svg>
        </button>
      </div>
    </div>
    <app-settings-poll-body
      v-if="!isVisualType"
      :pollItemId="pollItemId"
      :pollItemType="pollItemType"
      :pollItemData="pollItemData"
    />
    <app-visual-poll-body
      v-if="isVisualType"
      :pollItemId="pollItemId"
      :pollItemType="pollItemType"
      :pollItemData="pollItemData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Popper from "vue3-popper";
import AppSettingsPollBody from "./pollSegments/SettingsPollBody.vue";
import AppVisualPollBody from "./pollSegments/VisualPollBody.vue";

export default {
  components: {
    Popper,
    AppSettingsPollBody,
    AppVisualPollBody,
  },
  props: {
    pollItemId: { type: [Number, String] },
    pollItemType: { type: String },
    pollItemName: { type: String },
    pollItemDescr: { type: String },
    pollItemData: { type: Object },
    pollNumber: { type: Number },
  },

  data() {
    return {
      isVisualType: false,
    };
  },
  computed: {
    ...mapGetters(["editingIsBlocked"]),
    indexNumber() {
      return this.pollNumber + 1;
    },
  },
  methods: {
    pollEdit() {
      this.isVisualType = !this.isVisualType;
    },
    pollRemove() {
      if (this.editingIsBlocked) return;

      const pollItemId = this.pollItemId;
      const pollItemName = this.pollItemName;
      this.$emit("removePollElement", { pollItemId, pollItemName });
    },
  },
};
</script>

<style scoped></style>

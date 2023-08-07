<template>
  <div class="poll-item">
    <div class="poll-item__head">
      <div class="poll-item__name">
        <div class="poll-item__num">{{ indexNumber }}</div>
        <div class="poll-item__title">{{ pollItemName }}</div>
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
          :class="{ setting: isVisualType }"
          @click="pollEdit"
        ></button>
        <button class="poll-remove" @click="removePoll"></button>
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
import { mapMutations } from "vuex";
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
    indexNumber() {
      return this.pollNumber + 1;
    },
  },
  methods: {
    ...mapMutations(["removePollInPage"]),
    removePoll() {
      const pollId = this.pollItemId;
      this.removePollInPage({ pollId });
    },
    pollEdit() {
      this.isVisualType = !this.isVisualType;
    },
  },
};
</script>

<style scoped>
.tolltip-btn {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5C12.4183 16.5 16 12.9183 16 8.5C15.9952 4.08369 12.4163 0.504781 8 0.5ZM6.96 3.612C6.96 4.18196 7.42204 4.644 7.992 4.644C8.56196 4.644 9.024 4.18196 9.024 3.612V3.532C9.024 2.96204 8.56196 2.5 7.992 2.5C7.42204 2.5 6.96 2.96204 6.96 3.532V3.612ZM6.08 13.14H10.064V11.588H9.104V5.924H6V7.492H7.04V11.588H6.08V13.14Z' fill='%23C2CFE0'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  cursor: help;
}
</style>

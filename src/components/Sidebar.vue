<template>
  <div class="right-sidebar">
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
    <div class="analitic-info" :class="{ 'no-need': canBeEdited }">
      <div class="analitic-info__title">Аналитика</div>
      <div class="analitic-info__data">
        <div>Респондента прошли опрос:</div>
        <div class="data-count">{{ completedSurveyCount }}</div>
      </div>
      <div
        class="analitic-info__action btn app-btn"
        @click="openResetAnaliticModal"
      >
        Удалить аналитику и изменить
      </div>
    </div>
    <app-confirm-modal
      :showModal="showResetAnaliticModal"
      :title="showResetAnaliticModalData.title"
      :description="showResetAnaliticModalData.description"
      @confirmRemove="resetAnalitic"
      @cancel="showResetAnaliticModal = false"
    />
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import AppSidebarItem from "./pollSegments/SidebarItem.vue";
import { mapMutations, mapGetters, mapState } from "vuex";
import AppConfirmModal from "./ConfirmModal.vue";
import axios from "axios";

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
      showResetAnaliticModal: false,
      showResetAnaliticModalData: {
        title: "Удалить статистику ?",
        description: "Описание...",
      },
    };
  },
  computed: {
    ...mapState({
      appId: (state) => state.appId,
      completedSurveyCount: (state) => state.completedSurveyCount,
    }),
    ...mapGetters(["isHasPagePollsLimit", "editingIsBlocked"]),
    dragOptionsInSidebar() {
      if (this.editingIsBlocked) {
        return {
          disabled: true,
        };
      }
      return {
        group: { name: "pollTypes", pull: "clone", put: false },
        scrollSensitivity: 200,
        forceFallback: true,
        animation: 0,
        disabled: false,
        sort: false,
      };
    },
    canBeEdited() {
      return this.completedSurveyCount == 0;
    },
  },

  methods: {
    ...mapMutations(["addPollInState", "setCompletedSurveyCount"]),
    openResetAnaliticModal() {
      if (!this.canBeEdited) {
        this.showResetAnaliticModal = true;
      }
    },
    addPollItem(type) {
      if (this.isHasPagePollsLimit) {
        this.showModal = true;
      } else {
        this.addPollInState(type);
      }
    },
    resetAnalitic() {
      this.showResetAnaliticModal = false;
      axios
        .post(
          "/ajax/resultDelete.php",
          {
            id: this.appId,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log("resultDelete", res.data);
          this.setCompletedSurveyCount(0);
        })
        .catch((err) => console.log("resultDelete", err));
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

.analitic-info {
  margin-top: 17px;
}
.analitic-info__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  margin-bottom: 15px;
}
.data-count {
  font-size: 16px;
  font-weight: 600;
}
.analitic-info__title {
  color: #262b31;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 9px;
}
.analitic-info__action {
  width: 100%;
  text-align: center;
}
.analitic-info.no-need {
  user-select: none;
  pointer-events: none;
  .analitic-info__action {
    opacity: 0.3;
    cursor: default;
  }
}
</style>

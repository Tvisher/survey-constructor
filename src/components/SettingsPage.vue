<template>
  <div class="app-container">
    <div class="app-container__inner">
      <div class="polls-container">
        <h1 class="settings-title">Второй шаг</h1>

        <label class="settings-label">
          <div class="settings-label__text">
            Заголовок Вашего опроса
            <span class="settings-label__req">*</span>
          </div>
          <input
            type="text"
            class="settings-input"
            placeholder="Опрос о развитии в компании"
            :value="appSettings.appTitle"
            @input="appFieldEdit($event, 'appTitle')"
            ref="appTitle"
          />
          <div class="err-mes">Необходимо заполнить это поле</div>
        </label>

        <label class="settings-label">
          <div class="settings-label__text">
            Описание опроса
            <span class="settings-label__req">*</span>
          </div>
          <textarea
            class="settings-textarea"
            placeholder="Опрос о развитии в компании"
            :value="appSettings.appDescription"
            @input="appFieldEdit($event, 'appDescription')"
            ref="appDescription"
          ></textarea>
          <div class="err-mes">Необходимо заполнить это поле</div>
        </label>

        <div>
          <div class="settings-label__text">Логотип опроса</div>
          <app-image-loader
            :addedImage="appSettings.appLogo"
            @imageAdded="addImageInAppSettings"
          />
        </div>

        <div>
          <div class="settings-label__text">Цветовая гамма</div>
          <app-color-selection
            :colors="colors"
            :defaultColor="appSettings.appColor"
            @colorSelect="colorSelect"
          />
        </div>

        <label class="settings-label in-dev">
          <div class="settings-label__text">Промокод</div>
          <input
            type="text"
            class="settings-input"
            placeholder="Введите промокод"
            @input="appFieldEdit($event, 'appPromo')"
          />
        </label>

        <app-toggle-option class="in-dev">
          Присваивать вопросам баллы
        </app-toggle-option>

        <app-toggle-option
          v-if="appType != 'viktorina'"
          @toggleCheck="toggleCheck($event, 'hasCorrectAnswers')"
          :toggleParam="appSettings.hasCorrectAnswers"
        >
          Добавить параметр правильный ответ для вопроса
        </app-toggle-option>

        <app-toggle-option class="in-dev">
          Показывать баллы после окончания теста
        </app-toggle-option>

        <app-toggle-option class="in-dev">
          Добавить разветвление вопросов
        </app-toggle-option>

        <label class="settings-label">
          <div class="settings-label__text">
            Форма текста после завершение опроса
          </div>
          <textarea
            class="settings-textarea"
            placeholder="Введите текст"
            @input="appFieldEdit($event, 'appFinalMessage')"
          ></textarea>
        </label>

        <div class="btn app-btn centered-btn" @click="validAndSave">
          Сохранить и продолжить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppImageLoader from "./pollSegments/ImageLoader.vue";
import AppColorSelection from "./pollSegments/ColorSelection.vue";
import AppToggleOption from "./pollSegments/ToggleOption.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    AppImageLoader,
    AppColorSelection,
    AppToggleOption,
  },
  computed: {
    ...mapState({
      appType: (state) => state.appType,
      appSettings: (state) => state.appSettings,
      colors: (state) => state.colors,
    }),
    isValidAppTitle() {
      const { appTitle } = this.appSettings;
      return appTitle.trim() !== "";
    },

    isValidAppDescription() {
      const { appDescription } = this.appSettings;
      return appDescription.trim() !== "";
    },

    isValidReqFields() {
      return this.isValidAppTitle && this.isValidAppDescription;
    },
  },

  methods: {
    ...mapMutations(["editAppSettings"]),
    colorSelect(selectedColor) {
      this.editAppSettings({
        field: "appColor",
        payload: selectedColor,
      });
    },
    addImageInAppSettings(imageData) {
      this.editAppSettings({
        field: "appLogo",
        payload: imageData,
      });
    },
    appFieldEdit(e, type) {
      if (e.target.classList.contains("err-field")) {
        e.target.classList.remove("err-field");
      }
      const value = e.target.value.trim();
      this.editAppSettings({
        field: type,
        payload: value,
      });
    },
    toggleCheck(value, type) {
      this.editAppSettings({
        field: type,
        payload: value,
      });
    },

    validAndSave() {
      if (!this.isValidAppTitle) {
        this.$refs.appTitle.classList.add("err-field");
      }
      if (!this.isValidAppDescription) {
        this.$refs.appDescription.classList.add("err-field");
      }
      const errField = Object.values(this.$refs)[0];
      if (errField) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      if (this.isValidReqFields) {
        this.$store.dispatch("setQuizData");
        this.$router.push({ path: "/constructor" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-dropzone__container {
  margin-bottom: 30px;
}
.err-mes {
  color: red;
  font-size: 14px;
  opacity: 0;
}
.settings-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
}
.settings-label__text {
  display: flex;
  color: #262b31;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */
  margin-bottom: 10px;
  .settings-label__req {
    margin-left: 5px;
    color: #eb3333;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 27px */
  }
}
.settings-input,
.settings-textarea {
  outline: none !important;
  border-radius: 4px;
  border: 1px solid rgba(0, 66, 105, 0.28);
  background: #fff;
  width: 100%;
  padding: 10px 12px;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  &.err-field {
    border-color: red;
    & + .err-mes {
      opacity: 1;
    }
  }
}
.settings-textarea {
  resize: vertical;
  min-height: 150px;
}
</style>

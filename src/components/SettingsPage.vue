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
            @input="appFieldEdit($event, 'appTitle')"
          />
        </label>

        <label class="settings-label">
          <div class="settings-label__text">
            Описание опроса
            <span class="settings-label__req">*</span>
          </div>
          <textarea
            class="settings-textarea"
            placeholder="Опрос о развитии в компании"
            @input="appFieldEdit($event, 'appDescription')"
          ></textarea>
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

        <label class="settings-label">
          <div class="settings-label__text">
            Промокод
            <span class="settings-label__req">*</span>
          </div>
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

        <router-link to="/constructor" class="btn app-btn centered-btn"
          >Сохранить и продолжить</router-link
        >
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
      appSettings: (state) => state.appSettings,
      colors: (state) => state.colors,
    }),
  },
  data() {
    return {};
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
  },
};
</script>

<style lang="scss" scoped>
.poll-dropzone__container {
  margin-bottom: 30px;
}
.settings-label {
  display: block;
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
}
.settings-textarea {
  resize: vertical;
  min-height: 150px;
}

.in-dev {
  opacity: 0.3;
  pointer-events: none;
}
</style>

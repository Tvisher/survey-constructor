<template>
  <div class="app-container">
    <div class="app-container__inner">
      <div class="polls-container">
        <div class="t-wtapper">
          <h1 class="settings-title">Второй шаг</h1>
          <a class="btn app-btn" href="/lk/poll/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="20" y1="12" x2="4" y2="12" />
              <polyline points="10 18 4 12 10 6" />
            </svg>
            Главное меню
          </a>
        </div>
        <label class="settings-label">
          <div class="settings-label__text">
            <span>Заголовок {{ templatesText.appTitle }}</span>
            <span class="settings-label__req">*</span>
            <div class="letters-limit" :class="{ _err: isAppTitleLengthMore }">
              {{ appTitleLength }}/{{ titleLettersLimit }}
            </div>
          </div>
          <input
            :class="{ _err: isAppTitleLengthMore }"
            type="text"
            class="settings-input"
            placeholder='Например: "Опрос о развитии в компании..."'
            :value="appSettings.appTitle"
            @input="appFieldEdit($event, 'appTitle')"
            ref="appTitle"
          />
          <div class="err-mes">Необходимо заполнить это поле</div>
          <div v-if="isAppTitleLengthMore" class="err-mes _limit">
            Привышен лимит символов для этого поля
          </div>
        </label>

        <label class="settings-label">
          <div class="settings-label__text">
            <span>Описание {{ templatesText.appDescr }}</span>
            <span class="settings-label__req">*</span>
            <div
              class="letters-limit"
              :class="{ _err: isAppDescriptionLengthMore }"
            >
              {{ appDescriptionLength }}/{{ descriptionLettersLimit }}
            </div>
          </div>
          <textarea
            :class="{ _err: isAppDescriptionLengthMore }"
            class="settings-textarea"
            placeholder='Например: "Опрос о развитии в компании поможет нам понять..."'
            :value="appSettings.appDescription"
            @input="appFieldEdit($event, 'appDescription')"
            ref="appDescription"
          ></textarea>
          <div class="err-mes">Необходимо заполнить это поле</div>
          <div v-if="isAppDescriptionLengthMore" class="err-mes _limit">
            Привышен лимит символов для этого поля
          </div>
        </label>

        <div>
          <div class="settings-label__text">
            Логотип {{ templatesText.appLogoText }}
          </div>
          <app-image-loader
            :addedImage="appSettings.appLogo"
            @imageAdded="addImageInAppSettings"
            :maxFileSize="1.5"
          />
        </div>

        <div v-if="appType == 'quiz'">
          <div class="settings-label__text">Фон для викторины</div>
          <app-image-loader
            :addedImage="appSettings.appQuizBg"
            @imageAdded="addAppQuizBg"
            :maxFileSize="5"
            :hasSettings="false"
          />
        </div>

        <div v-if="appType == 'survey'">
          <div class="settings-label__text">Слайдер под заголовком опроса</div>
          <app-image-loader-multiple />
        </div>

        <div>
          <div class="settings-label__text">Цветовая гамма</div>
          <app-color-selection
            :colors="appColors"
            :defaultColor="appSettings.appColor"
            :colorBinding="'appColor'"
            @colorSelect="appColorSelect"
          />
        </div>

        <div>
          <div class="settings-label__text">Цветовая гамма текста кнопок</div>
          <app-color-selection
            :colors="appTextColors"
            :defaultColor="appSettings.appTextColor"
            :colorBinding="'appTextColor'"
            @colorSelect="appTextColorSelect"
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
          v-if="appType != 'quiz'"
          @toggleCheck="toggleCheck($event, 'hasCorrectAnswers')"
          :toggleParam="appSettings.hasCorrectAnswers"
          :popperContent="toggleOptionText.hasCorrectAnswers"
        >
          Добавить параметр правильный ответ для вопроса
        </app-toggle-option>

        <app-toggle-option
          @toggleCheck="toggleCheck($event, 'takeTheQuizagain')"
          :toggleParam="appSettings.takeTheQuizagain"
          :popperContent="toggleOptionText.takeTheQuizagain"
        >
          Разрешить пройти {{ templatesText.customFinishLinkText }} повторно
        </app-toggle-option>

        <app-toggle-option
          @toggleCheck="enableCustomLink($event)"
          :toggleParam="appSettings.customFinishLink.enable"
          :popperContent="toggleOptionText.customFinishLink"
        >
          Кастомная ссылка после завершения
          {{ templatesText.takeTheQuizagainText }}
        </app-toggle-option>
        <Vue3SlideUpDown :duration="300" v-model="isHasCustomLink">
          <div class="range-selection__creater link-creater">
            <label class="range-selection__label">
              <span class="editor-descr">Название кнопки</span>
              <input
                class="variant-item__filed settings-input"
                type="text"
                placeholder="Например: Посетить наш сайт"
                v-model="customLinkData.linkText"
                @input="setCustomLinkValue($event, 'linkText')"
                ref="linkText"
              />
              <div class="err-mes">Поле не может быть пустым</div>
            </label>
            <label class="range-selection__label">
              <span class="editor-descr">Ссылка для кнопки</span>
              <input
                class="variant-item__filed settings-input"
                type="text"
                placeholder="Например: https://examplesitename.ru"
                v-model="customLinkData.linkUrl"
                @input="setCustomLinkValue($event, 'linkUrl')"
                ref="linkUrl"
              />
              <div class="err-mes">Поле не может быть пустым</div>
            </label>
          </div>
        </Vue3SlideUpDown>
        <app-toggle-option class="in-dev">
          Показывать баллы после окончания теста
        </app-toggle-option>

        <app-toggle-option class="in-dev">
          Добавить разветвление вопросов
        </app-toggle-option>

        <label class="settings-label">
          <div class="settings-label__text">
            Форма текста после завершения
            {{ templatesText.takeTheQuizagainText }}
          </div>
          <textarea
            :value="appSettings.appFinalMessage"
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
import AppImageLoaderMultiple from "./pollSegments/ImageLoaderMiutiple.vue";
import AppColorSelection from "./pollSegments/ColorSelection.vue";
import AppToggleOption from "./pollSegments/ToggleOption.vue";
import { Vue3SlideUpDown } from "vue3-slide-up-down";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    AppImageLoader,
    AppImageLoaderMultiple,
    AppColorSelection,
    AppToggleOption,
    Vue3SlideUpDown,
  },
  data() {
    return {
      titleLettersLimit: 90,
      descriptionLettersLimit: 700,
      toggleOptionText: {
        hasCorrectAnswers:
          "Вы можете отметить, каким должен быть правильный ответ, если он относится к одному из следующих типов: одиночный выбор, множественный выбор, выпадающий список, множественный выпадающий список",
        takeTheQuizagain:
          "По умолчанию попытка повторного прохождения опроса/квиза с одного IP-адреса будет заблокировано нашей системой. Также система заблокирует попытку повторного прохождения, если информация о первом сохранилась в cookie пользователя.</br></br><strong>Важно!</strong> Если в вашей организации один IP-адрес для всех рабочих компьютеров, следует перевести ползунок в активное положение, чтобы заполнение анкеты было возможным для всех сотрудников.",
        customFinishLink:
          "После того, как респондент завершил прохождение опроса/квиза, вы можете перенаправить его на одну из страниц своего сайта, на страницы в соц.сетях и пр.",
      },
    };
  },
  computed: {
    ...mapState({
      appType: (state) => state.appType,
      appSettings: (state) => state.appSettings,
      appColors: (state) => state.colors,
      appTextColors: (state) => state.textColors,
    }),
    customLinkData() {
      return this.appSettings.customFinishLink.data;
    },
    isHasCustomLink() {
      return this.appSettings.customFinishLink.enable;
    },
    isValidAppTitle() {
      const { appTitle } = this.appSettings;
      return appTitle.trim() !== "";
    },
    appTitleLength() {
      return this.appSettings.appTitle.length;
    },
    isAppTitleLengthMore() {
      return this.appTitleLength > this.titleLettersLimit;
    },

    isValidAppDescription() {
      const { appDescription } = this.appSettings;
      return appDescription.trim() !== "";
    },
    appDescriptionLength() {
      return this.appSettings.appDescription.length;
    },
    isAppDescriptionLengthMore() {
      return this.appDescriptionLength > this.descriptionLettersLimit;
    },

    templatesText() {
      let appTitle = "";
      let appDescr = "";
      let appLogoText = "";
      let customFinishLinkText = "";
      let takeTheQuizagainText = "";
      if (this.appType === "survey") {
        appTitle = "Вашего опроса";
        appDescr = "опроса";
        appLogoText = "опроса";
        customFinishLinkText = "опрос";
        takeTheQuizagainText = "опроса";
      }
      if (this.appType === "quiz") {
        appTitle = "Вашей викторины";
        appDescr = "викторины";
        appLogoText = "викторины";
        customFinishLinkText = "викторину";
        takeTheQuizagainText = "викторины";
      }
      return {
        appTitle,
        appDescr,
        appLogoText,
        customFinishLinkText,
        takeTheQuizagainText,
      };
    },
  },

  methods: {
    ...mapMutations([
      "editAppSettings",
      "setCustomLink",
      "setCustomLinkValues",
    ]),
    enableCustomLink(flag) {
      this.setCustomLink(flag);
    },
    appColorSelect(selectedColor) {
      this.editAppSettings({
        field: "appColor",
        payload: selectedColor,
      });
      document.body.style.setProperty("--app-color", selectedColor.value);
    },
    appTextColorSelect(selectedColor) {
      this.editAppSettings({
        field: "appTextColor",
        payload: selectedColor,
      });
      document.body.style.setProperty("--app-text-color", selectedColor.value);
    },
    addImageInAppSettings(imageData) {
      this.editAppSettings({
        field: "appLogo",
        payload: imageData,
      });
    },
    addAppQuizBg(imageData) {
      this.editAppSettings({
        field: "appQuizBg",
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
    setCustomLinkValue(e, type) {
      if (e.target.classList.contains("err-field")) {
        e.target.classList.remove("err-field");
      }
      const value = e.target.value;
      this.setCustomLinkValues({ type, value });
    },
    validAndSave() {
      if (!this.isValidAppTitle) {
        this.$refs.appTitle.classList.add("err-field");
      }
      if (!this.isValidAppDescription) {
        this.$refs.appDescription.classList.add("err-field");
      }

      if (this.isHasCustomLink) {
        if (this.$refs.linkText.value.trim().length < 1) {
          this.$refs.linkText.classList.add("err-field");
        }
        if (this.$refs.linkUrl.value.trim().length < 1) {
          this.$refs.linkUrl.classList.add("err-field");
        }
      }

      const errBlock = document.querySelectorAll("._err, .err-field")[0];
      if (errBlock) {
        errBlock.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        this.$store.dispatch("setQuizData");
        this.$router.push({ path: "/constructor" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.settings-title {
  margin-bottom: 20px;
}
.poll-dropzone__container {
  margin-bottom: 30px;
}
.err-mes {
  color: red;
  font-size: 14px;
  display: none;
  &._limit {
    display: block;
  }
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
      display: block;
    }
  }
  &._err {
    border-color: red;
  }
}
.settings-textarea {
  resize: vertical;
  min-height: 150px;
}
.link-creater {
  margin-bottom: 0;
  padding-bottom: 20px;
}

.t-wtapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  a {
    // color: #fa0056;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }
  .settings-title {
    margin-bottom: 0;
  }
}
</style>

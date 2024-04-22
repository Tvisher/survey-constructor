<template>
  <div>
    <app-toggle-option
      @toggleCheck="toggleCheck($event)"
      :toggleParam="stretchSlides"
      :popperContent="'Параметр определяет как изображение будет вписано в слайд.<br> <strong><i>Пример отображения можно увидеть в блоках загрузки.</i></strong>'"
    >
      Растянуть изображения в слайдах
    </app-toggle-option>
    <div class="poll-dropzone__container" :class="{ stretch: stretchSlides }">
      <div
        v-if="isHasUploadFiles"
        class="poll-dropzone"
        :class="{ 'no-drop-zone': isHasUploadFiles }"
      >
        <VueDraggableNext
          handle=".uploaded_file"
          v-bind="pollItemsDragOptionsInSidebar"
          v-model="uploadedFiles"
        >
          <transition-group type="transition" name="flip-list">
            <div
              class="uploaded_file multiple-files"
              v-for="(slideImage, index) in uploadedFiles"
              :key="slideImage.path"
            >
              <h4>Слайд № {{ index + 1 }}</h4>
              <div class="dropzone-bg has-image">
                <img :src="slideImage.path" alt="" />
              </div>
              <div class="file-item">
                <div class="file-name">{{ slideImage.name }}</div>
                <button
                  class="delete-file"
                  @click="handleClickDeleteFile(slideImage.path)"
                >
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
          </transition-group>
        </VueDraggableNext>

        <div
          class="add-more"
          v-if="isHasUploadFiles && uploadedFiles.length < 5"
          v-bind="getRootProps()"
          :class="{ 'loading-spinner': loading }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 50 50"
          >
            <path
              d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
            ></path>
          </svg>
          <input v-bind="getInputProps()" />
        </div>
      </div>
      <div
        v-else
        v-bind="getRootProps()"
        class="dropzone-wrapper"
        :class="{ uploading: loading }"
      >
        <input v-bind="getInputProps()" />
        <div class="poll-dropzone">
          <div class="dropzone-bg" :class="{ uploading: loading }">
            <span class="loader" v-if="loading"></span>
          </div>
          <div class="loading__text" v-if="loading">
            Идёт загрузка изображения
          </div>
          <div v-else>
            <div class="poll-dropzone__text">
              Перетащите изображениe или <span>загрузите</span>
            </div>
            <div class="poll-dropzone__descr">
              Поддерживаемые форматы:
              <span class="take-note">PNG, JPEG, JPG</span>
            </div>
            <div class="poll-dropzone__descr">
              Максималяный размер файла
              <span class="take-note">{{ 5 }} МБ</span>
            </div>
            <div class="poll-dropzone__descr">
              Максималяное количество файлов
              <span class="take-note">{{ 5 }} шт</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import AppToggleOption from "./ToggleOption.vue";

import { ref, watch } from "vue";
import { useDropzone } from "vue3-dropzone";
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const uploadedFiles = ref(store.state.appSettings.appHeadSlider.list);
const stretchSlides = ref(store.state.appSettings.appHeadSlider.stretchSlides);
const loading = ref(false);

const isHasUploadFiles = computed(() => uploadedFiles.value.length > 0);
const filterFileErrors = (files) => files.filter((file) => !file.errors);
const url = "/local/templates/quiz/files.php";
const saveFiles = (files) => {
  const notErrorsFiles = filterFileErrors(files);
  const formData = new FormData();
  for (var x = 0; x < notErrorsFiles.length; x++) {
    formData.append("images[]", files[x]);
  }
  loading.value = true;
  axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.info(response.data);
      loading.value = false;
      const newImagesArr = response.data;
      newImagesArr.forEach((el) => {
        uploadedFiles.value.push(el.fileInfo);
      });
    })
    .catch((err) => {
      console.error(err);
      loading.value = false;
    });
};

const handleClickDeleteFile = (pathLikeId) => {
  uploadedFiles.value = uploadedFiles.value.filter(
    (el) => el.path !== pathLikeId
  );
};

watch(uploadedFiles, (newVal, oldVal) => {
  console.log(newVal);
  const updatedData = {
    stretchSlides: stretchSlides.value,
    list: uploadedFiles.value,
  };

  console.log(updatedData);
  store.commit("editAppSettings", {
    field: "appHeadSlider",
    payload: updatedData,
  });
});

const toggleCheck = ($event) => {
  stretchSlides.value = $event;
  const updatedData = {
    stretchSlides: stretchSlides.value,
    list: uploadedFiles.value,
  };
  console.log(store);
  store.commit("editAppSettings", {
    field: "appHeadSlider",
    payload: updatedData,
  });
};

function onDrop(acceptFiles, rejectReasons) {
  const acceptFilesLength = acceptFiles.length;
  if (uploadedFiles.value.length + acceptFilesLength < 6) {
    saveFiles(acceptFiles); // saveFiles as callback
  }
}

const pollItemsDragOptionsInSidebar = () => {
  return {
    scrollSensitivity: 200,
    forceFallback: true,
    animation: 400,
    disabled: false,
    ghostClass: "ghost",
    sort: true,
  };
};

const options = {
  maxFiles: 5,
  multiple: true,
  maxSize: 5 * 1000000,
  onDrop,
  accept: [".jpg", ".jpeg", ".png"],
};

const { getRootProps, getInputProps, ...rest } = useDropzone(options);
</script>

<style lang="scss">
.poll-dropzone__container.stretch {
  .dropzone-bg.has-image {
    img {
      object-fit: cover !important;
    }
  }
}
.multiple-files {
  padding: 10px;
  margin-bottom: 10px;
  border: 2px dashed rgba(0, 66, 105, 0.28);
  border-radius: 4px;

  .file-item {
    justify-content: center;
  }
  &.sortable-ghost {
    // transform: scale(1.3) !important;
    opacity: 0.5;
  }
}
.add-more {
  cursor: pointer;
  position: relative;
  &::before {
    content: "";
    width: 60px;
    height: 60px;
    border: 5px dotted var(--app-color);
    border-radius: 50%;
    display: none;
    position: absolute;
    box-sizing: border-box;

    background-color: #fff;
  }
  margin-top: 20px;
  width: 60px;
  height: 60px;
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    path {
      fill: var(--app-color);
    }
  }
  &.loading-spinner {
    pointer-events: none;
    &::before {
      animation: rotationBtn 5s linear infinite;
      display: inline-block;
    }
  }
}

@keyframes rotationBtn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.dropzone-wrapper.uploading {
  pointer-events: none;
}
.dropzone-wrapper {
  width: 100%;
}

.file-name {
  max-width: 250px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.poll-dropzone {
  padding: 20px;
  min-height: 160px;
  border-radius: 4px;
  border: 2px dashed rgba(0, 66, 105, 0.28);
  display: flex;
  flex-direction: column;
  align-items: center;
  &.no-drop-zone {
    border: 1px solid rgba(0, 66, 105, 0.28);
  }
}
.poll-dropzone__container {
  margin-bottom: 20px;
}
.dropzone-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='72' height='73' viewBox='0 0 72 73' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M68 61.3889V11.6111C68 7.7 64.8 4.5 60.8889 4.5H11.1111C7.2 4.5 4 7.7 4 11.6111V61.3889C4 65.3 7.2 68.5 11.1111 68.5H60.8889C64.8 68.5 68 65.3 68 61.3889ZM23.5556 41.8333L32.4444 52.5356L44.8889 36.5L60.8889 57.8333H11.1111L23.5556 41.8333Z' fill='%23002033' fill-opacity='0.3'/%3e%3c/svg%3e ");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 72px;
  height: 72px;
  &.uploading {
    background-image: none;
  }

  &.has-image {
    width: 300px;
    height: 200px;
    background-image: none;
    background-color: rgb(250, 210, 210);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.poll-dropzone__text {
  color: rgba(0, 32, 51, 0.6);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  span {
    display: inline;
    cursor: pointer;
    color: #0078d2;
  }
}
.poll-dropzone__descr {
  color: rgba(0, 32, 51, 0.5);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.file-item {
  display: flex;
  align-items: center;
}

.delete-file {
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  background-color: transparent;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading__text {
  color: rgba(0, 32, 51, 0.6);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
}

.loader {
  width: 48px;
  height: 48px;
  border: 10px solid #ecf4ff;
  border-radius: 50%;
  position: relative;
  transform: rotate(45deg);
  box-sizing: border-box;
}
.loader::before {
  content: "";
  position: absolute;
  box-sizing: border-box;
  inset: -10px;
  border-radius: 50%;
  border: 10px solid var(--app-color);
  animation: prixClipFix 2s infinite linear;
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>

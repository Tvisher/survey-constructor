<template>
  <div class="poll-dropzone__container">
    <div
      v-if="hasUploadedImage"
      class="poll-dropzone"
      :class="{ 'no-drop-zone': hasUploadedImage }"
    >
      <div class="dropzone-bg has-image">
        <img :src="filePath" alt="" />
      </div>
      <div class="uploaded_file">
        <div class="file-item">
          <div class="file-name">{{ fileName }}</div>
          <button class="delete-file" @click="handleClickDeleteFile()">
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
            <span class="take-note">{{ maxFileSize }} МБ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showSettingsData" class="image-settings">
    <label class="custom-cb">
      <input
        class="custom-cb__checkbox"
        type="checkbox"
        :checked="stretchImage"
        @input="selectOption"
      />
      <span class="custom-cb__text">Растянуть изображение на весь блок</span>
    </label>
  </div>
</template>

<script>
import { ref, computed, toRef } from "vue";
import { useDropzone } from "vue3-dropzone";
import axios from "axios";

export default {
  props: {
    addedImage: { type: Object },
    maxFileSize: { type: [Number, String] },
    hasSettings: { type: Boolean, default: true },
  },
  emits: ["imageAdded"],
  setup(props, { emit }) {
    let imageFile = ref([]);
    let loading = ref(false);
    let stretchImage = ref(false);

    const addedImage = toRef(props, "addedImage");
    const maxFileSize = toRef(props, "maxFileSize");
    const hasSettings = toRef(props, "hasSettings");

    if (addedImage.value) {
      imageFile.value = [{ ...addedImage.value }];
      stretchImage.value = addedImage.value.stretchImage;
    }
    const imageUploaded = computed(() => {
      return imageFile.value.length > 0;
    });

    const hasUploadedImage = computed(() => {
      return addedImage.value && addedImage.value.path;
    });

    const showSettingsData = computed(() => {
      return hasUploadedImage.value && hasSettings.value;
    });

    const fileName = computed(() => {
      return imageFile.value[0].name;
    });

    const filePath = computed(() => {
      if (hasUploadedImage) {
        return imageFile.value[0].path;
      }
    });

    const addImageinPoll = (newImageData) => emit("imageAdded", newImageData);

    function handleClickDeleteFile() {
      addImageinPoll({});
      imageFile.value = [];
      return;
    }

    function onDrop(acceptFile, errors) {
      if (errors.length > 0) {
        console.log(errors);
        return;
      }
      saveFiles(acceptFile);
    }

    function selectOption(e) {
      stretchImage.value = e.target.checked;
      imageFile.value[0].stretchImage = stretchImage.value;
      addImageinPoll(imageFile.value[0]);
    }

    const saveFiles = (acceptFile) => {
      const formData = new FormData();
      formData.append("poll", acceptFile[0]);
      loading.value = true;
      axios({
        method: "post",
        url: "/local/templates/quiz/files.php",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          const newFileData = response.data.fileInfo;
          newFileData.stretchImage = stretchImage.value;
          addImageinPoll(newFileData);
          imageFile.value = [{ ...newFileData }];
          loading.value = false;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const options = {
      multiple: false,
      maxSize: Number(maxFileSize.value) * 1000000,
      onDrop,
      accept: [".jpg", ".jpeg", ".png"],
    };

    const { getRootProps, getInputProps, ...rest } = useDropzone(options);

    return {
      showSettingsData,
      imageFile,
      hasSettings,
      loading,
      imageUploaded,
      fileName,
      filePath,
      hasUploadedImage,
      addImageinPoll,
      getRootProps,
      getInputProps,
      handleClickDeleteFile,
      selectOption,
      stretchImage,
      ...rest,
    };
  },
};
</script>

<style lang="scss">
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

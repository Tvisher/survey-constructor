import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesList from './pollTypesList';
import axios from "axios";


function findPollById(state, pollItemId) {
  const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
  return currentPollPage.pollList.find((poll) => poll.id === pollItemId);
}


export default createStore({
  state: {
    pollTypesList: [],
    currentPageId: '1',
    pagesLimit: 5,
    pagesMinLength: 1,
    colors: [
      { name: "Intercom", value: "#FA0056" },
      { name: "Оранжевый", value: "#FF6B00" },
      { name: "Желтый", value: "#FFD600" },
      { name: "Салатовый", value: "#BDFF00" },
      { name: "Зеленый", value: "#24D421" },
      { name: "Морской", value: "#13EADD" },
      { name: "Синий", value: "#1369EA" },
      { name: "Фиолетовый", value: "#7213EA" },
      { name: "Пурпурный", value: "#EA13D4" },
    ],
    appSettings: {
      appTitle: 'Заголовок опроса',
      appDescription: "Описание для  опроса",
      appPromo: "",
      appLogo: {
        name: 'formImage.jpg',
        path: 'https://ru.experrto.io/blog/media/2020/06/19/1_DIYRN40.png'
      },
      appColor: { name: "Intercom", value: "#FA0056" },
    },

    pollPages: [
      {
        id: "1",
        pageComment: 'Комментарий к первой странице',
        pollList: [
          {
            id: '8',
            type: 'custom-fields',
            typeName: 'Кастомные поля',
            typeDescr: 'Описание для элемента опроса Кастомные поля',
            data: {
              pollImage: {
                name: 'formImage.jpg',
                path: 'https://ru.experrto.io/blog/media/2020/06/19/1_DIYRN40.png'
              },
              editorValue: {
                "ops": [
                  { "insert": "Пожалуйста, дайте нам обратную связь, что бы мы могли сделать наш сервис лучше " },
                  { "attributes": { "italic": true, "bold": true }, "insert": "=)" }, { "insert": "\n" }
                ]
              },
              optionsData: {
                minOptionsLength: 1,
                maxOptionsLength: 10,
                optionsList:
                  [
                    { "id": "1", "type": "text", "value": "Имя" },
                    { "id": "92338df8-c3b0-4ccd-a7fa-5b56993a05d2", "type": "text", "value": "Фамилия" },
                    { "id": "4f212647-b594-4740-8619-8ea7150edc26", "type": "email", "value": "Email" },
                    { "id": "9b3f5549-0e20-4b96-ace4-eaf8a80a0edb", "type": "phone", "value": "Ваш телефон" },
                    { "id": "fbc3b9e9-e836-4cd7-a8ca-9b7e97e16a10", "type": "textarea", "value": "Напишите нам что думаете о нашем сервисе" }
                  ],
              },
            }
          },
          {
            id: '7',
            type: 'date',
            typeName: 'Дата',
            typeDescr: 'Описание для элемента опроса Дата',
            data: {
              pollImage: {
                name: "calendar.jpg",
                path: "https://ru-cafe.ru/content/images/news/kalendar-s-chasami.webp"
              },
              editorValue: { "ops": [{ "insert": "Укажите дату, когда вам будет " }, { "attributes": { "bold": true }, "insert": "удобно " }, { "insert": "посетить наше мероприятие\n" }] },
              dateData: {
                range: false,
              }
            }
          },
          {
            id: '6',
            type: 'ranging',
            typeName: 'Ранжирование',
            typeDescr: 'Описание для элемента опроса Ранжирование',
            data: {
              pollImage: {
                name: "calendar.jpg",
                path: "https://ru-cafe.ru/content/images/news/kalendar-s-chasami.webp"
              },
              editorValue: { "ops": [{ "insert": "Укажите верный порядок дней недели\n" }] },
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                  { id: '1', value: "Понедельник" },
                  { id: '2', value: "Вторник" },
                  { id: '3', value: "Среда" },
                  { id: '4', value: "Четверг" },
                  { id: '5', value: "Пятница" },
                  { id: '6', value: "Суббота" },
                  { id: '7', value: "Воскресенье" },
                ],
              },
            }
          },
          {
            id: '1',
            type: 'single-choice',
            typeName: 'Одиночный выбор',
            typeDescr: 'Описание для элемента опроса Одиночный выбор',
            data: {
              editorValue: { "ops": [{ "insert": "Какой твой любимый персонаж в сериале \"Рик и Морти\"? \n" }, { "attributes": { "italic": true, "script": "sub" }, "insert": "Необходимо выбрать только одного" }, { "insert": "\n" }] },
              pollImage: {
                name: 'image.jpg',
                path: 'https://www.soyuz.ru/public/uploads/files/5/7211786/1005x558_20180704173248b3636157a5.jpg'
              },
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: [],
                optionsList: [
                  { "id": "1", "value": "Рик" },
                  { "id": "2", "value": "Морти" },
                  { "id": "3", "value": "Саммер" },
                  { "id": "4", "value": "Джерри" },
                  { "id": "5", "value": "Бет" }
                ],
              },
            }
          },
          {
            id: '2',
            type: 'drop-down-list',
            typeName: 'Выпадающий список',
            typeDescr: 'Описание для элемента опроса Выпадающий список',
            data: {
              editorValue: { "ops": [{ "insert": "Какой твой любимый персонаж в сериале \"Рик и Морти\"? \n" }, { "attributes": { "italic": true, "script": "sub" }, "insert": "Необходимо выбрать только одного" }, { "insert": "\n" }] },
              pollImage: {
                name: 'image.jpg',
                path: 'https://www.soyuz.ru/public/uploads/files/5/7211786/1005x558_20180704173248b3636157a5.jpg'
              },
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: [],
                optionsList: [
                  { "id": "1", "value": "Рик" },
                  { "id": "2", "value": "Морти" },
                  { "id": "3", "value": "Саммер" },
                  { "id": "4", "value": "Джерри" },
                  { "id": "5", "value": "Бет" }
                ],
              },
            }
          },
          {
            id: '3',
            type: 'multiple-drop-down-list',
            typeName: 'Множественный вып. список',
            typeDescr: 'Описание для элемента опроса Множественный вып. список',
            data: {
              editorValue: { "ops": [{ "insert": "Какие персонажи тебе больше всего нравятся в сериале \"Рик и Морти\"? \n" }, { "attributes": { "italic": true, "script": "sub" }, "insert": "Можно выбрать несколько" }, { "insert": "\n" }] },
              pollImage: {
                name: 'image.jpg',
                path: 'https://www.soyuz.ru/public/uploads/files/5/7211786/1005x558_20180704173248b3636157a5.jpg'
              },
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: [],
                optionsList: [
                  { "id": "1", "value": "Рик" },
                  { "id": "2", "value": "Морти" },
                  { "id": "3", "value": "Саммер" },
                  { "id": "4", "value": "Джерри" },
                  { "id": "5", "value": "Бет" },
                  { "id": "6", "value": "Злой Морти" },
                  { "id": "7", "value": "Мистер Жопосранчик" }
                ],
              },
            }
          },
          {
            id: '4',
            type: 'multiple-choice',
            typeName: 'Множественный выбор',
            typeDescr: 'Описание для элемента опроса Множественный выбор',
            data: {
              editorValue: { "ops": [{ "insert": "Какие персонажи тебе больше всего нравятся в сериале \"Рик и Морти\"? \n" }, { "attributes": { "italic": true, "script": "sub" }, "insert": "Можно выбрать несколько" }, { "insert": "\n" }] },
              pollImage: {
                name: 'image.jpg',
                path: 'https://www.soyuz.ru/public/uploads/files/5/7211786/1005x558_20180704173248b3636157a5.jpg'
              },
              optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: [],
                optionsList: [
                  { "id": "1", "value": "Рик" },
                  { "id": "2", "value": "Морти" },
                  { "id": "3", "value": "Саммер" },
                  { "id": "4", "value": "Джерри" },
                  { "id": "5", "value": "Бет" }
                ],
              },
            }
          },
          {
            id: '5',
            type: 'range-selection',
            typeName: 'Выбор диапазона',
            typeDescr: 'Описание для элемента опроса Выбор диапазона',
            data: {
              editorValue: { "ops": [{ "insert": "Сколько часов в день ты страдаешь у монитра?\n" }, { "attributes": { "underline": true, "italic": true, "script": "sub" }, "insert": "Укажи диапазон" }, { "insert": "\n" }] },
              pollImage: {
                name: 'image.jpg',
                path: 'https://www.soyuz.ru/public/uploads/files/5/7211786/1005x558_20180704173248b3636157a5.jpg'
              },
              rangeData: {
                min: '1',
                max: '24',
                defaultMin: '3',
                defaultMax: '8',
              }
            }
          },
        ],
      },
    ],
  },
  getters: {},
  mutations: {
    editAppSettings(state, { field, payload }) {
      state.appSettings[field] = payload;
    },

    addImageinPoll(state, { pollItemId, newImageData }) {
      const currentPollItem = findPollById(state, pollItemId);
      if (currentPollItem) {
        currentPollItem.data.pollImage = newImageData;
      }
    },

    setCurrentPollPage(state, pageId) {
      state.currentPageId = pageId;
    },

    setRangeSelectionValues(state, { pollItemId, rangeData }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.rangeData = rangeData;
    },

    dragSortPollsInPage(state, { sortableList }) {
      const currentPage = state.pollPages.find(page => page.id === state.currentPageId);
      const newPollList = JSON.parse(JSON.stringify(sortableList));
      const newPollElement = newPollList.find(item => !item.id);
      if (newPollElement) {
        newPollElement.id = uuidv4();
      }
      currentPage.pollList = [...newPollList];
    },

    dragSortOptionsInPoll(state, { sortableList, pollItemId }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.optionsData.optionsList = sortableList;
    },

    addPollInState(state, pollType) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      const pollTmp = state.pollTypesList.find(pollTypeItem => pollTypeItem.type === pollType);
      const addedPollTmp = JSON.parse(JSON.stringify(pollTmp))
      addedPollTmp.id = uuidv4();
      currentPollPage.pollList = [...currentPollPage.pollList, addedPollTmp];
    },

    setSinglePollEditorValue(state, { pollItemId, editorValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        currentPoll.data = { ...currentPoll.data, editorValue };
      }
    },

    editPageComment(state, { pollPageId, commentValue }) {
      const currentPage = state.pollPages.find(page => page.id === pollPageId);
      currentPage.pageComment = commentValue;
    },

    removePollInPage(state, { pollId }) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      currentPollPage.pollList = currentPollPage.pollList.filter(poll => poll.id !== pollId);
    },

    addOptionInPoll(state, { pollItemId }) {
      const currentPoll = findPollById(state, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        value: ""
      };
      currentPoll.data.optionsData.optionsList = [...currentPoll.data.optionsData.optionsList, newOption];
    },

    addPairInPoll(state, pollItemId) {
      const currentPoll = findPollById(state, pollItemId);
      const newPair = {
        id: uuidv4(),
        firstFieldValue: '',
        secondFieldValue: '',
      };
      currentPoll.data.optionsData.optionsList.push(newPair);
    },

    editPairValue(state, { pollItemId, fieldValue, pairId, filedType }) {
      const currentPoll = findPollById(state, pollItemId);
      const pairFiled = currentPoll.data.optionsData.optionsList.find(pair => pair.id === pairId);
      pairFiled[filedType] = fieldValue;
    },

    selectOptionInPoll(state, { pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        if (inputsType === 'radio') {
          currentPoll.data.optionsData.currentAnswerId = [optionId];
        }
        if (inputsType === 'checkbox') {
          if (currentPoll.data.optionsData.currentAnswerId.includes(optionId)) {
            currentPoll.data.optionsData.currentAnswerId = currentPoll.data.optionsData.currentAnswerId.filter(id => id !== optionId);
          } else {
            currentPoll.data.optionsData.currentAnswerId = [...currentPoll.data.optionsData.currentAnswerId, optionId];
          }
        }
      }
    },

    removeOptionInPoll(state, { pollItemId, optionId, inputsType }) {
      const currentPoll = findPollById(state, pollItemId);
      const optionListLength = currentPoll.data.optionsData.optionsList.length;
      const minOptionsLength = currentPoll.data.optionsData.minOptionsLength;
      if (optionListLength <= minOptionsLength) return
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(option => option.id !== optionId);
      if (currentPoll.data.optionsData.currentAnswerId) {
        if (inputsType === 'radio' && currentPoll.data.optionsData.currentAnswerId[0] === optionId) {
          currentPoll.data.optionsData.currentAnswerId = [];
        }
        if (inputsType === 'checkbox') {
          currentPoll.data.optionsData.currentAnswerId = currentPoll.data.optionsData.currentAnswerId.filter(id => id !== optionId);
        }
      }
    },

    removePairInPoll(state, { pollItemId, pairId, }) {
      const currentPoll = findPollById(state, state.currentPageId, pollItemId);
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(pair => pair.id !== pairId);
    },

    editOptionInPoll(state, { pollItemId, optionId, optionValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
        currentOption.value = optionValue
      }
    },

    setDateOption(state, { pollItemId, dateDataInComponent }) {
      const currentPoll = findPollById(state, pollItemId);
      currentPoll.data.dateData = dateDataInComponent;
    },

    addCustomField(state, { pollItemId }) {
      const currentPoll = findPollById(state, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        type: 'text',
        value: ""
      };
      currentPoll.data.optionsData.optionsList = [...currentPoll.data.optionsData.optionsList, newOption];
    },

    setCustomFieldType(state, { pollItemId, optionId, selectedType }) {
      const currentPoll = findPollById(state, pollItemId);
      const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
      currentOption.type = selectedType
    },

    addPollPage(state) {
      const pagesLimit = state.pagesLimit;
      if (state.pollPages.length >= pagesLimit) return;

      const newPage = {
        id: `page-${uuidv4()}`,
        pageComment: '',
        pollList: []
      }
      state.pollPages = [...state.pollPages, newPage]
      state.currentPageId = newPage.id;
    },

    removePollPage(state, pageId) {
      const pagesMinLength = state.pagesMinLength;
      if (state.pollPages.length <= pagesMinLength) return;

      const removedPageIndex = state.pollPages.findIndex(page => page.id === pageId);
      let newCurrentPage;
      if (removedPageIndex === 0) {
        newCurrentPage = 1
      } else {
        newCurrentPage = removedPageIndex - 1;
      }
      state.currentPageId = state.pollPages.find((item, index) => index === newCurrentPage).id;
      state.pollPages = state.pollPages.filter(page => page.id !== pageId);
    },

    setPollTypesListInApp(state, pollTypesList) {
      state.pollTypesList = pollTypesList;
    },


  },
  actions: {
    setPollTypesList({ commit }) {
      setTimeout(() => {
        commit("setPollTypesListInApp", pollTypesList)
      }, 0);
      axios
        .get('https://dev.vnutricom.ru/bitrix/templates/quiz/polltypeslist.php',
          {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          })
        .then((response) => {
          console.info(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
});




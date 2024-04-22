import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesListDefault from './pollTypesList';
import axios from "axios";
import devJson from "./dev-api.js";

// Получаем конкретный вопрос для работы с ним в mutations
function findPollById(state, pollItemId) {
  const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
  return currentPollPage.pollList.find((poll) => poll.id === pollItemId);
}

// Соединяем данные которые пришли с сервера с данными нашего приложения.
function mergeState(state, newState) {
  // Перебираем все свойства newState
  for (const key in newState) {
    if (newState.hasOwnProperty(key)) {
      // Если свойство существует в state и является объектом, рекурсивно объединяем их
      if (typeof state[key] === 'object' && typeof newState[key] === 'object') {
        state[key] = mergeState(state[key], newState[key]);
      } else {
        // В противном случае просто копируем значение из newState в state
        state[key] = newState[key];
      }
    }
  }
  return state;
}

const appId = document.querySelector('#app').dataset.pollId;
const appType = document.querySelector('#app').dataset.pollType;

export default createStore({
  state: {
    appId,
    appType,
    completedSurveyCount: 0,
    pollTypesList: [],
    currentPageId: "1",
    pagesLimit: 5,
    pollsInPageLimit: 40,
    pagesMinLength: 1,
    colors: [],
    textColors: [
      { name: "Белый", value: "#FFFFFF" },
      { name: "Чёрный", value: "#000000" }
    ],
    appSettings: {
      appTitle: "",
      appDescription: "",
      appPromo: "",
      appFinalMessage: "",
      hasCorrectAnswers: false,
      takeTheQuizagain: false,
      customFinishLink: {
        enable: false,
        data: {
          linkText: '',
          linkUrl: ''
        }
      },
      appColor: { name: "Intercom", value: "#FA0056" },
      appTextColor: { name: "Белый", value: "#FFFFFF" },
      appLogo: {},
      appQuizBg: {},
      appHeadSlider: {
        stretchSlides: false,
        list: []
      },
    },
    pollPages: [
      {
        id: "1",
        pageComment: '',
        pollList: [],
      },
    ],
  },
  getters: {
    isHasPagePollsLimit(state) {
      const currenPage = state.pollPages.find(page => page.id === state.currentPageId);
      return currenPage.pollList.length === state.pollsInPageLimit;
    },
    editingIsBlocked: (state) => state.completedSurveyCount > 0,
  },
  mutations: {
    // Установка колличества прохождений (приходит с сервера)
    setCompletedSurveyCount: (state, count) => state.completedSurveyCount = count,
    // Установить для компонента ранжирования параметр учёта верного порядка 
    setRanginCorrectListAnswers(state, { pollItemId, value }) {
      const currentPollItem = findPollById(state, pollItemId);
      if (currentPollItem) {
        currentPollItem.data.optionsData.isHasCorrectListAnswers = value;
      }
    },
    // Включить/выключить опцию кастомной ссылки после завершения опроса/викторины
    setCustomLink(state, flag) {
      state.appSettings.customFinishLink.enable = flag;
      if (flag === false) {
        state.appSettings.customFinishLink.data.linkText = '';
        state.appSettings.customFinishLink.data.linkUrl = '';
      }
    },
    // Указать название и занчение для кастомной ссылки после завершения опроса/викторины
    setCustomLinkValues(state, { type, value }) {
      state.appSettings.customFinishLink.data[type] = value;
    },

    // Метод для добавления/редактирования настроект приложения(цвета, данные экрана настроек)
    editAppSettings(state, { field, payload }) {
      state.appSettings[field] = payload;
    },

    // Добавить изображение к вопросу
    addImageinPoll(state, { pollItemId, newImageData }) {
      const currentPollItem = findPollById(state, pollItemId);
      if (currentPollItem) {
        currentPollItem.data.pollImage = newImageData;
      }
    },

    // Выбрать конкретную страницу в опросе
    setCurrentPollPage(state, pageId) {
      state.currentPageId = pageId;
    },

    // Установить дефолтные значения для порльзователя в компоненте вопроса выбора диапозона
    setRangeSelectionValues(state, { pollItemId, rangeData }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.rangeData = rangeData;
    },

    // Drag&Drop сортировка вопросов на станице  
    dragSortPollsInPage(state, { sortableList }) {
      const currentPage = state.pollPages.find(page => page.id === state.currentPageId);
      const newPollList = JSON.parse(JSON.stringify(sortableList));
      const newPollElement = newPollList.find(item => !item.id);
      if (newPollElement) {
        newPollElement.id = uuidv4();
      }
      currentPage.pollList = [...newPollList];
    },

    // Drag&Drop сортировка вариантов ответа в вопросах где это возможно 
    dragSortOptionsInPoll(state, { sortableList, pollItemId }) {
      const currentPollItem = findPollById(state, pollItemId);
      currentPollItem.data.optionsData.optionsList = sortableList;
    },

    // Добавить на конкретную страниицу(для опросов) или в общий список вопросов(для викторины) новый вопрос с указанием типа(шаблона вопроса)
    addPollInState(state, pollType) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      const pollTmp = state.pollTypesList.find(pollTypeItem => pollTypeItem.type === pollType);
      const addedPollTmp = JSON.parse(JSON.stringify(pollTmp))
      addedPollTmp.id = uuidv4();
      currentPollPage.pollList = [...currentPollPage.pollList, addedPollTmp];
    },

    // Установить значение тексторого редактора в конкретном вопросе
    setSinglePollEditorValue(state, { pollItemId, editorValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        currentPoll.data = { ...currentPoll.data, editorValue };
      }
    },

    // Редактировать комментарий к конкретной страницце(для опросов)
    editPageComment(state, { pollPageId, commentValue }) {
      const currentPage = state.pollPages.find(page => page.id === pollPageId);
      currentPage.pageComment = commentValue;
    },

    // Удалить вопрос с конкретной страницы(для опроса) или из огбщего списка вопросов(для викторины) 
    removePollInPage(state, pollId) {
      const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
      currentPollPage.pollList = currentPollPage.pollList.filter(poll => poll.id !== pollId);
    },

    // Добавить опцию варианта ответа в компонент где это возможно
    addOptionInPoll(state, { pollItemId }) {
      const currentPoll = findPollById(state, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        value: ""
      };
      currentPoll.data.optionsData.optionsList = [...currentPoll.data.optionsData.optionsList, newOption];
    },

    // Добавить опцию варианта ответа в компонент где это возможно
    addCustomOptionInPoll(state, { pollItemId, customOption }) {
      const currentPoll = findPollById(state, pollItemId);
      currentPoll.data.optionsData.hasCustomAnswer = customOption;
    },

    // Указать вариант ответа как "верный", для вопросов с такой возможностью
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

    // Удалить опцию из вопроса(с проверкой на минимальное количество оставшихся опций )
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

    // Добапвить пару в вопрос компонента парного ранжирования (PairRanking.vue)
    addPairInPoll(state, pollItemId) {
      const currentPoll = findPollById(state, pollItemId);
      const newPair = {
        id: uuidv4(),
        firstFieldValue: '',
        secondFieldValue: '',
      };
      currentPoll.data.optionsData.optionsList.push(newPair);
    },

    // Удалить пару из вопроса компонента парного ранжирования (PairRanking.vue)
    removePairInPoll(state, { pollItemId, pairId, }) {
      const currentPoll = findPollById(state, state.currentPageId, pollItemId);
      currentPoll.data.optionsData.optionsList = currentPoll.data.optionsData.optionsList.filter(pair => pair.id !== pairId);
    },

    // Редактировать значение поля пары из вопроса компонента парного ранжирования (PairRanking.vue)
    editPairValue(state, { pollItemId, fieldValue, pairId, filedType }) {
      const currentPoll = findPollById(state, pollItemId);
      const pairFiled = currentPoll.data.optionsData.optionsList.find(pair => pair.id === pairId);
      pairFiled[filedType] = fieldValue;
    },

    // Редактирование значения поля value у вопросов где есть варианты ответа( В основном у инпутов)
    editOptionInPoll(state, { pollItemId, optionId, optionValue }) {
      const currentPoll = findPollById(state, pollItemId);
      if (currentPoll) {
        const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
        currentOption.value = optionValue
      }
    },

    //Установить возможность выбора диапозона дат в компоненте Опции выбора даты (dateOption.vue)
    setDateOption(state, { pollItemId, dateDataInComponent }) {
      const currentPoll = findPollById(state, pollItemId);
      currentPoll.data.dateData = dateDataInComponent;
    },

    //Добавить новое кастомное поле в компоненте отпроса Кастомные поля.
    addCustomField(state, { pollItemId }) {
      const currentPoll = findPollById(state, pollItemId);
      const newOption = {
        id: `${uuidv4()}`,
        type: 'text',
        value: "",
        req: true,
      };
      currentPoll.data.optionsData.optionsList = [...currentPoll.data.optionsData.optionsList, newOption];
    },

    //Указать тип кастомного поля в компоненте отпроса Кастомные поля.
    setCustomFieldType(state, { pollItemId, optionId, selectedType }) {
      const currentPoll = findPollById(state, pollItemId);
      const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
      currentOption.type = selectedType
    },

    setCustomFieldReq(state, { pollItemId, optionId, value }) {
      const currentPoll = findPollById(state, pollItemId);
      const currentOption = currentPoll.data.optionsData.optionsList.find(option => option.id === optionId);
      currentOption.req = value;
    },

    //Добавить страниццу с вопросами(Только для опросов, не для викторины)
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

    // Удалить конкретный вопрос из опроса 
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

    // Установка нового state на основании данных с сервера
    setQuizState(state, newState) {
      // Поправить склейку данных
      // Object.assign(state, newState);
      mergeState(state, newState)
      document.body.style.setProperty("--app-color", state.appSettings.appColor.value);
      document.body.style.setProperty("--app-text-color", state.appSettings.appTextColor.value);
      // state.applicationReady = true;
      state.appType = appType;
      if (appType === 'quiz') {
        state.appSettings.hasCorrectAnswers = true;
      }
    },

    // Шаблоны вариантов вопросов
    setPollTypesListInApp(state, resPollTypesList) {
      const typeToData = Object.fromEntries(pollTypesListDefault.map(obj => [obj.type, obj.data]));
      const appPollTypesList = resPollTypesList.map(obj => ({
        ...obj,
        data: typeToData[obj.type] || null,
      }));
      state.pollTypesList = appPollTypesList;
    },

    // Шаблоны выбора основного цвета(кнопки, выделение и тд.)
    setColorListInApp(state, colorList) {
      state.colors = colorList;
    },
  },
  actions: {
    // Получение с сервера данных опроса в формате json
    getQuizTemplate({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/local/templates/quiz/itemjson.php', {
          params: {
            id: appId,
            type: appType,
          }
        })
          .then(function (response) {
            console.log(response.data);
            const resJson = response.data;
            const resState = JSON.parse(resJson.resState);
            const resColors = resJson.colors;
            const resPollTypesList = resJson.pollTypesList;

            commit("setQuizState", resState);
            commit("setColorListInApp", resColors)
            commit("setPollTypesListInApp", resPollTypesList)

            const getSurveyCount = () => {
              return new Promise((res, rej) => {
                axios.post('/ajax/resultResave.php', {
                  id: appId,
                },
                  {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  })
                  .then((response) => {
                    commit("setCompletedSurveyCount", response.data);
                    res();
                  })
                  .catch((error) => {
                    console.log('resultResave', error);
                    rej(error)
                  });
              })
            }
            getSurveyCount()
              .then(() => {
                setInterval(() => getSurveyCount(), 3000);
                resolve();
              })
          })
          .catch(function (error) {
            console.log(error);
            // DEV
            const resState = JSON.parse(devJson.resState);
            const resColors = devJson.colors;
            const resPollTypesList = devJson.pollTypesList;
            commit("setQuizState", resState);
            commit("setColorListInApp", resColors)
            commit("setPollTypesListInApp", resPollTypesList)
            reject(error)
          });
      })

    },

    // Отправка данных опроса на сервер в формате json
    setQuizData({ state }) {
      return new Promise((resolve, reject) => {
        let newAppData = JSON.parse(JSON.stringify(state));
        newAppData.completedSurveyCount = '';
        newAppData.pollTypesList = [];
        newAppData.colors = [];
        // newAppData.applicationReady = false;
        newAppData = JSON.stringify(newAppData);
        axios.post('/local/templates/quiz/itemjson.php',
          {
            id: appId,
            payload: newAppData,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(function (response) {
            console.log(response);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    }
  }
});




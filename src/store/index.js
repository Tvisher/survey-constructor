import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import pollTypesListDefault from './pollTypesList';
import axios from "axios";
import devJson from "./dev-api.js";


function findPollById(state, pollItemId) {
  const currentPollPage = state.pollPages.find(page => page.id === state.currentPageId);
  return currentPollPage.pollList.find((poll) => poll.id === pollItemId);
}

const quizID = document.querySelector('#app').dataset.pollId;
const quizType = document.querySelector('#app').dataset.pollType;

export default createStore({
  state: {
    appType: null,
    applicationReady: false,
    pollTypesList: [],
    currentPageId: "1",
    pagesLimit: 5,
    pollsInPageLimit: 10,
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
      appColor: { name: "Intercom", value: "#FA0056" },
      appTextColor: { name: "Белый", value: "#FFFFFF" },
      appLogo: {},
      appQuizBg: {},
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
    }
  },
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

    removePollInPage(state, pollId) {
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


    setQuizState(state, newState) {
      Object.assign(state, newState);
      document.body.style.setProperty("--app-color", state.appSettings.appColor.value);
      document.body.style.setProperty("--app-text-color", state.appSettings.appTextColor.value);
      state.applicationReady = true;
      state.appType = quizType;
      if (quizType === 'quiz') {
        state.appSettings.hasCorrectAnswers = true;
      }
    },

    setPollTypesListInApp(state, resPollTypesList) {
      const typeToData = Object.fromEntries(pollTypesListDefault.map(obj => [obj.type, obj.data]));
      const appPollTypesList = resPollTypesList.map(obj => ({
        ...obj,
        data: typeToData[obj.type] || null,
      }));
      state.pollTypesList = appPollTypesList;
    },

    setColorListInApp(state, colorList) {
      state.colors = colorList;
    },
  },
  actions: {
    getQuizTemplate({ commit }) {
      axios.get('/bitrix/templates/quiz/itemjson.php', {
        params: {
          id: quizID,
          type: quizType,
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
        });
    },

    setQuizData({ state }) {
      let newAppData = JSON.parse(JSON.stringify(state));
      newAppData.pollTypesList = [];
      newAppData.colors = [];
      newAppData.applicationReady = false;
      newAppData = JSON.stringify(newAppData);
      axios.get('/bitrix/templates/quiz/itemjson.php', {
        params: {
          id: quizID,
          payload: newAppData,
        }
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
});




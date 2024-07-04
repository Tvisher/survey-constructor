import { v4 as uuidv4 } from 'uuid';
let pollTypesList;
const addPollTypesList = () => {
    return [
        {
            type: 'single-choice',
            typeName: 'Одиночный выбор',
            typeDescr: 'Описание для элемента опроса Одиночный выбор',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 2,
                    maxOptionsLength: 10,
                    currentAnswerId: [],
                    hasCustomAnswer: false,
                    optionsList: [
                        { id: uuidv4(), value: "" },
                        { id: uuidv4(), value: "" },
                    ],
                },
            }
        },
        {
            type: 'drop-down-list',
            typeName: 'Выпадающий список',
            typeDescr: 'Описание для элемента опроса Выпадающий список',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 2,
                    maxOptionsLength: 10,
                    currentAnswerId: [],
                    optionsList: [
                        { id: uuidv4(), value: "" },
                        { id: uuidv4(), value: "" },
                    ],
                },
            }
        },
        {
            type: 'multiple-drop-down-list',
            typeName: 'Множественный вып. список',
            typeDescr: 'Описание для элемента опроса Множественный вып. список',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 2,
                    maxOptionsLength: 10,
                    currentAnswerId: [],
                    optionsList: [
                        { id: uuidv4(), value: "" },
                        { id: uuidv4(), value: "" },
                    ],
                },
            }
        },
        {
            type: 'multiple-choice',
            typeName: 'Множественный выбор',
            typeDescr: 'Описание для элемента опроса Множественный выбор',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 2,
                    maxOptionsLength: 10,
                    currentAnswerId: [],
                    hasCustomAnswer: false,
                    optionsList: [
                        { id: uuidv4(), value: "" },
                        { id: uuidv4(), value: "" },
                    ],
                },
            }
        },
        {
            type: 'ranging',
            typeName: 'Ранжирование',
            typeDescr: 'Описание для элемента опроса Ранжирование',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 2,
                    maxOptionsLength: 10,
                    currentAnswerId: [],
                    isHasCorrectListAnswers: false,
                    optionsList: [
                        { id: uuidv4(), value: "" },
                        { id: uuidv4(), value: "" },
                    ],
                },
            }
        },
        {
            type: 'range-selection',
            typeName: 'Выбор диапазона',
            typeDescr: 'Описание для элемента опроса Выбор диапазона',
            data: {
                pollImage: {},
                editorValue: {},
                rangeData: {
                    min: '',
                    max: '',
                    defaultMin: '',
                    defaultMax: '',
                }
            }
        },
        {
            type: 'date',
            typeName: 'Выбор даты',
            typeDescr: 'Описание для элемента опроса Дата',
            data: {
                pollImage: {},
                editorValue: {},
                dateData: {
                    range: false,
                }
            }
        },
        {
            type: 'custom-fields',
            typeName: 'Кастомные поля',
            typeDescr: 'Описание для элемента опроса Кастомные поля',
            data: {
                pollImage: {},
                editorValue: {},
                optionsData: {
                    minOptionsLength: 1,
                    maxOptionsLength: 10,
                    optionsList: [
                        { id: uuidv4(), type: 'text', value: "", req: true },
                    ],
                },
            }
        },
        // {
        //     type: 'pair-ranking',
        //     typeName: 'Парное ранжирование',
        //     typeDescr: 'Описание для элемента опроса Парное ранжирование',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //         optionsData: {
        //             minOptionsLength: 2,
        //             maxOptionsLength: 10,
        //             optionsList: [
        //                 {
        //                     id: uuidv4(),
        //                     firstFieldValue: '',
        //                     secondFieldValue: '',
        //                 },
        //                 {
        //                     id: uuidv4(),
        //                     firstFieldValue: '',
        //                     secondFieldValue: '',
        //                 },
        //             ]
        //         }
        //     }
        // },
        // {
        //     type: 'matrix',
        //     typeName: 'Матрица',
        //     typeDescr: 'Описание для элемента опроса Матрица',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },
        // {
        //     type: 'free-response-matrix',
        //     typeName: 'Матрица свободных ответов',
        //     typeDescr: 'Описание для элемента опроса Матрица свободных ответов',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },
        // {
        //     type: 'full-name',
        //     typeName: 'ФИО',
        //     typeDescr: 'Описание для элемента опроса ФИО',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },
        // {
        //     type: 'phone-number',
        //     typeName: 'Номер телефона',
        //     typeDescr: 'Описание для элемента опроса Номер телефона',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },
        // {
        //     type: 'email',
        //     typeName: 'Эл. почта',
        //     typeDescr: 'Описание для элемента опроса Эл. почта',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },

        // {
        //     type: 'selecting-date-range',
        //     typeName: 'Выбор промежутка дат',
        //     typeDescr: 'Описание для элемента опроса Выбор промежутка дат',
        //     data: {
        //         pollImage: {},
        //         editorValue: {},
        //     }
        // },


    ]
}

pollTypesList = addPollTypesList();

export default pollTypesList;
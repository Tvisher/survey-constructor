
const pollTypesList = [
    {
        type: 'single-choice',
        typeName: 'Одиночный выбор',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                    { id: '1', value: "" },
                    { id: '2', value: "" },
                ],
            },
        }
    },
    {
        type: 'drop-down-list',
        typeName: 'Выпадающий список',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                    { id: '1', value: "" },
                    { id: '2', value: "" },
                ],
            },
        }
    },
    {
        type: 'multiple-drop-down-list',
        typeName: 'Множественный вып. список',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                    { id: '1', value: "" },
                    { id: '2', value: "" },
                ],
            },
        }
    },
    {
        type: 'multiple-choice',
        typeName: 'Множественный выбор',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                currentAnswerId: ['1'],
                optionsList: [
                    { id: '1', value: "" },
                    { id: '2', value: "" },
                ],
            },
        }
    },
    {
        type: 'ranging',
        typeName: 'Ранжирование',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                    { id: '1', value: "" },
                    { id: '2', value: "" },
                ],
            },
        }
    },
    {
        type: 'range-selection',
        typeName: 'Выбор диапазона',
        data: {
            editorValue: {},
            rangeData: {
                min: '',
                max: ''
            }
        }
    },
    {
        type: 'pair-ranking',
        typeName: 'Парное ранжирование',
        data: {
            editorValue: {},
            optionsData: {
                minOptionsLength: 2,
                maxOptionsLength: 10,
                optionsList: [
                    {
                        id: '1',
                        firstFieldValue: '',
                        secondFieldValue: '',
                    },
                    {
                        id: '2',
                        firstFieldValue: '',
                        secondFieldValue: '',
                    },
                ]
            }
        }
    },
    {
        type: 'matrix',
        typeName: 'Матрица',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'free-response-matrix',
        typeName: 'Матрица свободных ответов',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'full-name',
        typeName: 'ФИО',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'phone-number',
        typeName: 'Номер телефона',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'date',
        typeName: 'Дата',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'selecting-date-range',
        typeName: 'Выбор промежутка дат',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'email',
        typeName: 'Эл. почта',
        data: {
            editorValue: {},
        }
    },

]

export default pollTypesList;
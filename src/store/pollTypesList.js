
const pollTypesList = [
    {
        type: 'single-choice',
        typeName: 'Одиночный выбор',
        typeDescr: 'Описание для элемента опроса Одиночный выбор',
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
        typeDescr: 'Описание для элемента опроса Выпадающий список',
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
        typeDescr: 'Описание для элемента опроса Множественный вып. список',
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
        typeDescr: 'Описание для элемента опроса Множественный выбор',
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
        typeDescr: 'Описание для элемента опроса Ранжирование',
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
        typeDescr: 'Описание для элемента опроса Выбор диапазона',
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
        typeDescr: 'Описание для элемента опроса Парное ранжирование',
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
        typeDescr: 'Описание для элемента опроса Матрица',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'free-response-matrix',
        typeName: 'Матрица свободных ответов',
        typeDescr: 'Описание для элемента опроса Матрица свободных ответов',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'full-name',
        typeName: 'ФИО',
        typeDescr: 'Описание для элемента опроса ФИО',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'phone-number',
        typeName: 'Номер телефона',
        typeDescr: 'Описание для элемента опроса Номер телефона',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'date',
        typeName: 'Дата',
        typeDescr: 'Описание для элемента опроса Дата',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'selecting-date-range',
        typeName: 'Выбор промежутка дат',
        typeDescr: 'Описание для элемента опроса Выбор промежутка дат',
        data: {
            editorValue: {},
        }
    },
    {
        type: 'email',
        typeName: 'Эл. почта',
        typeDescr: 'Описание для элемента опроса Эл. почта',
        data: {
            editorValue: {},
        }
    },

]

export default pollTypesList;
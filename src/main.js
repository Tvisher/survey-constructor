import { createApp, h } from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router/router";
import vSelect from 'vue-select';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import "./assets/scss/style.scss";


vSelect.props.components.default = () => ({
    OpenIndicator: {
        render: () => h("span", {
            class: { "toggle-arrow": true },
        }),
    },
    Deselect: {
        render: () => h("span", {
            class: { "deselect-btn": true },
            title: ''
        }),
    },
});


const globalOptions = {
    formats: [
        'bold', 'italic', 'underline', 'strike', 'script', 'link'
    ],
    modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike', 'link'], [{ 'script': 'sub' }, { 'script': 'super' }], ['clean']],
    },
    placeholder: '',
    theme: 'snow',

}
QuillEditor.props.globalOptions.default = () => globalOptions

const app = createApp(App)
    .component('QuillEditor', QuillEditor)
    .component('vSelect', vSelect)
    .use(store)
    .use(router)
    .mount('#app')

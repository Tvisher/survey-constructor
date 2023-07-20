import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import "./assets/scss/reset.scss";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const globalOptions = {
    modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike',], [{ 'script': 'sub' }, { 'script': 'super' }], ['clean']]
    },
    placeholder: '',
    theme: 'snow',
}

QuillEditor.props.globalOptions.default = () => globalOptions

const app = createApp(App)
    .component('QuillEditor', QuillEditor)
    .use(store)
    .mount('#app')

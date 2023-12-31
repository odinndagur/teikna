import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
//import './i18n'
// import './index.css'
// import './App.css'
import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread'
import PromiseWorker from 'promise-worker'
let worker = new Worker(new URL('./index.worker.ts', import.meta.url), {
    type: 'module',
})
let promiseWorker = new PromiseWorker(worker)
initBackend(worker)
window.worker = worker
window.promiseWorker = promiseWorker

import { registerSW } from 'virtual:pwa-register'
// add this to prompt for a refresh
const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
            updateSW(true)
        }
    },
})

// document.addEventListener('keydown', (e) => {
//     if (e.code == 'Enter') {
//         let element: HTMLElement = document!.activeElement! as HTMLElement
//         element.click()
//     }
// })

ReactDOM.createRoot(document!.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

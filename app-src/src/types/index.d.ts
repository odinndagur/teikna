export {}

declare global {
    interface Window {
        promiseWorker: any
        worker: any
        setActiveStyleSheet: any
    }
}

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

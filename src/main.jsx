import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './stores/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ModalHandler from './components/modals/ModalHandler.jsx'
import { ModalProvider } from './components/modals/ModalProvider.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DashboardTemplate from './components/templates/DashboardTemplate.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    Component: App,
  },
  { 
    path: "home",
    Component: ProtectedRoute,
    children: [
      { index: true, Component: DashboardTemplate },
    ]
  },
]);

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ModalHandler />
        <RouterProvider router={router} />
      </ModalProvider>
    </Provider>
  </StrictMode>,
)

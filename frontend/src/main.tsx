import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Kezdolap from './components/Kezdolap';
import SongsFelvetel from './components/SongsFelvetel';

const router = createBrowserRouter([
  {
    path: "/kezdolap",
    element: <Kezdolap />,
  },
  {
    path: 'song-felvetel',
    element: <SongsFelvetel/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

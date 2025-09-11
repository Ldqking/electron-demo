import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import MsgBoard from './routes/msg-board';
import Martyr from './routes/martyr';
import MartyrDetail from './routes/martyr-detail';


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/martyr",
    element: <Martyr />,
  },
  {
    path: "/martyr/:id",
    element: <MartyrDetail />,
  },
  {
    path: "/msg-board",
    element: <MsgBoard />,
  }
]
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);

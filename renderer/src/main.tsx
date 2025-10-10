import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './routes/App';
import Martyr from './routes/martyr';

// 创建错误处理组件
function ErrorPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Oops!</h1>
      <p>抱歉，发生了意外错误。</p>
      <a href="/">返回首页</a>
    </div>
  );
}

// 创建路由配置
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/martyr",
    element: <Martyr />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

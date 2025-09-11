import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

export interface IElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}

interface HeaderBarHandles {
  handleBackgroundClick: () => void;
}

const HeaderBar = forwardRef<HeaderBarHandles>((_props, ref) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [clickTimer, setClickTimer] = useState<any>(null);

  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    // 清除之前的定时器
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
    }

    // 显示导航栏
    setShowNavbar(true);

    // 3秒后自动隐藏
    const timer = setTimeout(() => {
      setShowNavbar(false);
    }, 3000);

    setClickTimer(timer);
  };

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    handleBackgroundClick
  }));

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);
  
  return (
    <div className={`title-bar ${showNavbar ? '' : 'hidden'}`}>
      <div className="title-bar-title"><img src="./vite.svg" alt="logo" /><p>烈士-留言板</p></div>
      <div className="title-bar-buttons">
        <img
          src="./img/bar/x.svg" alt="最小化"
          onClick={() => window.electron.minimize()}
          onTouchStart={() => window.electron.minimize()}
        />
        <img
          src="./img/bar/d.svg" alt="最大化"
          onClick={() => window.electron.maximize()}
          onTouchStart={() => window.electron.maximize()}
        />
        <img
          src="./img/bar/close.svg" alt="关闭"
          onClick={() => window.electron.close()}
          onTouchStart={() => window.electron.close()}
        />
      </div>
    </div>
  );
});

export default HeaderBar;
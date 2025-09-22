import { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";

export interface IElectronAPI {
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  openKeyboard: () => Promise<void>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}

export interface HeaderBarHandles {
  handleBackgroundClick: () => void;
}

const HeaderBar = forwardRef<HeaderBarHandles>((_props, ref) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 显示导航栏
    setShowNavbar(true);

    // 3秒后自动隐藏
    timerRef.current = setTimeout(() => {
      setShowNavbar(false);
      timerRef.current = null;
    }, 3000);
  };

  // 创建统一的事件处理函数
  const createWindowActionHandler = (action: () => Promise<void>) => {
    return (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      action().catch(err => {
        console.error('窗口操作失败:', err);
      });
    };
  };

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    handleBackgroundClick
  }));

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={`title-bar ${showNavbar ? '' : 'hidden'}`}>
      <div className="title-bar-title">
        <img src="./vite.svg" alt="logo" />
        <p>烈士-留言板</p>
      </div>
      <div className="title-bar-buttons">
        <img
          src="./img/bar/x.svg"
          alt="最小化"
          onClick={createWindowActionHandler(() => window.electron.minimize())}
          onTouchStart={createWindowActionHandler(() => window.electron.minimize())}
        />
        <img
          src="./img/bar/d.svg"
          alt="最大化"
          onClick={createWindowActionHandler(() => window.electron.maximize())}
          onTouchStart={createWindowActionHandler(() => window.electron.maximize())}
        />
        <img
          src="./img/bar/close.svg"
          alt="关闭"
          onClick={createWindowActionHandler(() => window.electron.close())}
          onTouchStart={createWindowActionHandler(() => window.electron.close())}
        />
      </div>
    </div>
  );
});

export default HeaderBar;
import { useEffect, useRef, useState } from 'react';
import './App.css'
import ViewImg from './components/view-img';
import ViewVideo from './components/view-video';

// renderer/src/types/global.d.ts
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

function App() {
  const [showViewImg, setShowViewImg] = useState(false);
  const [showViewVideo, setShowViewVideo] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [clickTimer, setClickTimer] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

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

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);

  const handleViewImg = () => {
    setShowViewImg(true);
    setShowViewVideo(false);
  };

  const handleViewVideo = () => {
    setShowViewVideo(true);
    setShowViewImg(false);
  };

  const handleClose = () => {
    setShowViewImg(false);
    setShowViewVideo(false);
  };

  // 处理触摸事件，防止冒泡
  const handleCloseTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={`title-bar ${showNavbar ? 'hidden' : 'hidden'}`}>
        <div className="title-bar-title"><img src="./vite.svg" alt="logo" /><p>和平解放西藏</p></div>
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
      <div className="app-container">
        {/* 视频背景 */}
        <video
          ref={videoRef}
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./img/bg/bg.mp4" type="video/mp4" />
          您的浏览器不支持视频背景。
        </video>

        <div
          className='app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        >
          <div
            onClick={handleViewImg}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            <video
              className="btn-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn1.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            onClick={handleViewVideo}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            <video
              className="btn-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn2.mp4" type="video/mp4" />
            </video>
          </div>

          {showViewImg && <ViewImg />}
          {showViewVideo && <ViewVideo onClose={handleClose} />}

          {(showViewImg || showViewVideo) && (
            <div
              className='close'
              onClick={handleClose}
              onTouchStart={handleCloseTouch}
            >
              <img style={{ width: '100%', height: '100%' }} src="./img/close.svg" alt="close" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App;
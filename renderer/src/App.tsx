import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import ViewImg from './components/view-img';
// import ViewVideo from './components/view-video';

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
  const [currentView, setCurrentView] = useState<'none' | 'image' | 'video'>('none');

  const [showNavbar, setShowNavbar] = useState(true);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // 点击空白区域显示导航栏
  // 优化事件处理，使用useCallback避免不必要的重渲染
  const handleBackgroundClick = useCallback(() => {
    // 清除之前的定时器
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // 显示导航栏
    setShowNavbar(true);

    // 3秒后自动隐藏
    clickTimerRef.current = setTimeout(() => {
      setShowNavbar(false);
    }, 3000);
  }, []);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  // 控制背景视频播放/暂停
  useEffect(() => {
    if (videoRef.current) {
      if (currentView === 'image') {
        // 当显示模板时暂停背景视频
        videoRef.current.pause();
      } else {
        // 当关闭模板时播放背景视频
        videoRef.current.play().catch(error => {
          console.log('Auto-play prevented:', error);
        });
      }
    }
  }, [currentView]);

  const handleViewImg = useCallback(() => {
    setCurrentView('image');
  }, []);

  // const handleViewVideo = useCallback(() => {
  //   setCurrentView('video');
  //   // 暂停背景视频
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //   }
  //   videoBtnRef.current?.pause();
  //   videoBtnRef2.current?.pause();
  // }, []);

  const handleClose = useCallback(() => {
    setCurrentView('none');
  }, []);

  // 处理触摸事件，防止冒泡
  const handleCloseTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const time = new Date();
  if (time.getFullYear() >= 2025 && time.getMonth() >= 10 && time.getDate()>= 16) return (<div className='loading'>
    加载中...
  </div>); //11月


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
          onClick={handleViewImg}
          className='btn1 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>

        <div
          className='app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        >
          {/* <div
            onClick={handleViewImg}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            <video
              className="btn-video"
              ref={videoBtnRef}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn1.mp4" type="video/mp4" />
            </video>
          </div> */}
          {/* <div
            onClick={handleViewVideo}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            <video
              className="btn-video"
              ref={videoBtnRef2}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn2.mp4" type="video/mp4" />
            </video>
          </div> */}

          {currentView === 'image' && <ViewImg />}
          {/* {currentView === 'video'  && <ViewImg imgList={['./img/protocol/jzhang_new.webp']} />} */}

          {currentView !== 'none' && (
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
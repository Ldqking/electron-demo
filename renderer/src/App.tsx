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
  const videoBtnRef = useRef<HTMLVideoElement>(null);
  const videoBtnRef2 = useRef<HTMLVideoElement>(null);

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

  const handleViewImg = useCallback(() => {
    setCurrentView('image');
    // 暂停背景视频
    if (videoRef.current) {
      videoRef.current.pause();
    }
    videoBtnRef.current?.pause();
    videoBtnRef2.current?.pause();
  }, []);

  const handleViewVideo = useCallback(() => {
    setCurrentView('video');
    // 暂停背景视频
    if (videoRef.current) {
      videoRef.current.pause();
    }
    videoBtnRef.current?.pause();
    videoBtnRef2.current?.pause();
  }, []);

  const handleClose = useCallback(() => {
    setCurrentView('none');
    // 恢复背景视频播放
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
    videoBtnRef.current?.play()
    videoBtnRef2.current?.play();
  }, []);

  // 处理触摸事件，防止冒泡
  const handleCloseTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  
  

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
              ref={videoBtnRef}
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
              ref={videoBtnRef2}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn2.mp4" type="video/mp4" />
            </video>
          </div>

          {currentView !== 'none' && <ViewImg imgList={currentView === 'image'?['./img/protocol/ali_new.png']:['./img/protocol/jzhang_new.png']} />}
          {/* {currentView === 'video'  && <ViewImg imgList={['./img/protocol/jzhang_new.png']} />} */}

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
import { useEffect, useRef, useState } from 'react';
import './App.css'
import ViewImg from './components/view-img';
import { IMGS_OF_AFTER, IMGS_OF_FIRST, IMGS_OF_SECOND } from './lib/enum';
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
  const [showViewImg, setShowViewImg] = useState(false);
  const [showViewImg2, setShowViewIm2] = useState(false);
  const [showViewImg3, setShowViewIm3] = useState(false);
  const [showViewImg4, setShowViewIm4] = useState(false);


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
  };

  const handleClose = () => {
    setShowViewImg(false);
    setShowViewIm2(false);
    setShowViewIm3(false);
    setShowViewIm4(false);
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
            onClick={() => {setShowViewIm2(true)}}
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
          <div
            onClick={() => {setShowViewIm3(true)}}
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
              <source src="./img/bg/btn3.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            onClick={() => {setShowViewIm4(true)}}
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
              <source src="./img/bg/btn4.mp4" type="video/mp4" />
            </video>
          </div>

          {showViewImg && <ViewImg />}
          {showViewImg2 && <ViewImg imgList={IMGS_OF_FIRST} />}
          {showViewImg3 && <ViewImg imgList={IMGS_OF_SECOND} />}
          {showViewImg4 && <ViewImg imgList={IMGS_OF_AFTER} />}

          {(showViewImg || showViewImg2 || showViewImg3 || showViewImg4) && (
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
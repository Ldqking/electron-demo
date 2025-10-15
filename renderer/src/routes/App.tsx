import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
// import ViewImg from '../components/view-img';
// import ViewVideo from '../components/view-video';
import ViewImgOverflow from '../components/view-img-overflow';
import { useNavigate } from 'react-router-dom';

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
  const [showViewImg, setShowViewImg] = useState<'ali'|''>('');
  const [showViewVideo, setShowViewVideo] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  // const [clickTimer, setClickTimer] = useState<any>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    // 清除之前的定时器
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }

    // 显示导航栏
    setShowNavbar(true);

    // 3秒后自动隐藏
    clickTimerRef.current = setTimeout(() => {
      setShowNavbar(false);
      clickTimerRef.current = null;
    }, 3000);

  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  // 控制背景视频播放/暂停
  useEffect(() => {
    if (videoRef.current) {
      if (showViewImg || showViewVideo) {
        // 当显示模板时暂停背景视频
        videoRef.current.pause();
      } else {
        // 当关闭模板时播放背景视频
        videoRef.current.play().catch(error => {
          console.log('Auto-play prevented:', error);
        });
      }
    }
  }, [showViewImg, showViewVideo]);

  const handleClose = useCallback(() => {
    setShowViewImg('');
    setShowViewVideo(false);
  }, []);

  const handleViewImgAli = useCallback(() => {
    setShowViewImg('ali');
    setShowViewVideo(false);
  }, []);

  // const handleViewImg = useCallback(() => {
  //   setShowViewImg('other');
  //   setShowViewVideo(false);
  // }, []);

  // const handleViewVideo = useCallback(() => {
  //   setShowViewVideo(true);
  //   setShowViewImg('');
  // }, []);

  const handleCloseTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  const navigate = useNavigate();

  const time = new Date();
  if (time.getFullYear() >= 2025 && time.getMonth() >= 10 && time.getDate()>= 16) return (<div className='loading'>
    加载中...
  </div>); //11月15日

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
      <div className="app-container"
        onClick={handleBackgroundClick}
        onTouchStart={handleBackgroundClick}>
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
          onClick={handleViewImgAli}
          className='btn1 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        <div
          onClick={() => navigate('/martyr')}
          className='btn2 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        {/* <div
          onClick={handleViewImg}
          className='btn1 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        <div
          onClick={handleViewVideo}
          className='btn2 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div> */}

        {/* <div
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
              ref={btn1Ref}
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
              ref={btn2Ref}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn2.mp4" type="video/mp4" />
            </video>
          </div>
        </div> */}
        {/* {showViewImg === 'other' && <ViewImg />} */}
        {showViewImg === 'ali' && <ViewImgOverflow />}
        {/* {showViewVideo && <ViewVideo onClose={handleClose} />} */}

        {(showViewImg === 'ali') && (
          <div
            className='close'
            onClick={handleClose}
            onTouchStart={handleCloseTouch}
          >
            <img style={{ width: '100%', height: '100%' }} src="./img/close.svg" alt="close" />
          </div>
        )}
      </div>
    </>
  )
}

export default App;
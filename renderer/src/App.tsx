import { memo, useCallback, useEffect, useRef, useState } from 'react';
import './App.css'
import ViewImg from './components/view-img';
// import { IMGS_OF_AFTER, IMGS_OF_BEFORE, IMGS_OF_FIRST, IMGS_OF_SECOND } from './lib/enum';
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
  const [showViewImg, setShowViewImg] = useState<'before' | 'first' | 'second' | 'after' | ''>('');

  const [showNavbar, setShowNavbar] = useState(true);
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
      if (showViewImg !== '') {
        // 当显示模板时暂停背景视频
        videoRef.current.pause();
      } else {
        // 当关闭模板时播放背景视频
        videoRef.current.play().catch(error => {
          console.log('Auto-play prevented:', error);
        });
      }
    }
  }, [showViewImg]);

  const handleViewImg = useCallback((str: 'before' | 'first' | 'second' | 'after') => {
    setShowViewImg(str);
  }, []);

  const handleClose = useCallback(() => {
    setShowViewImg('');
  }, []);

  // 计算图片列表
  // const getImgList = useCallback((str: 'before' | 'first' | 'second' | 'after') => {
  //   switch (str) {
  //     case 'before':
  //       return IMGS_OF_BEFORE;
  //     case 'first':
  //       return IMGS_OF_FIRST;
  //     case 'second':
  //       return IMGS_OF_SECOND;
  //     case 'after':
  //       return IMGS_OF_AFTER;
  //     default:
  //       return [];
  //   }
  // }, []);

  // 处理触摸事件，防止冒泡
  const handleCloseTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  // // 预加载图片
  // useEffect(() => {
  //   const preloadImages = (imgList: string[]) => {
  //     imgList.forEach(src => {
  //       const img = new Image();
  //       img.src = src;
  //     });
  //   };

  //   // 预加载所有图片
  //   preloadImages(IMGS_OF_BEFORE);
  //   preloadImages(IMGS_OF_FIRST);
  //   preloadImages(IMGS_OF_SECOND);
  //   preloadImages(IMGS_OF_AFTER);
  // }, []);

  // const currentImgList = showViewImg ? getImgList(showViewImg) : [];

  const time = new Date();
  // console.log('[ time.getDay() ]', time,  time.getDate())
  if (time.getFullYear() >= 2025 && time.getMonth() >= 9 && time.getDate()>= 16) return (<div className='loading'>
    加载中...
  </div>); //10月16日之后，显示加载中

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
          onClick={() => { handleViewImg('before') }}
          className='btn1 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        <div
          onClick={() => { handleViewImg('first') }}
          className='btn2 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        <div
          onClick={() => { handleViewImg('second') }}
          className='btn3 common-button'
          onTouchStart={(e) => e.stopPropagation()}
        >
        </div>
        <div
          onClick={() => { handleViewImg('after') }}
          className='btn4 common-button'
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
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn1.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            onClick={() => { setShowViewIm2(true) }}
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
            onClick={() => { setShowViewIm3(true) }}
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
            onClick={() => { setShowViewIm4(true) }}
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
          </div> */}
          {showViewImg !== '' && (
            <ViewImg sign={showViewImg} />
          )}

          <div
            className='close'
            style={{ display: showViewImg !== '' ? '' : 'none' }}
            onClick={handleClose}
            onTouchStart={handleCloseTouch}
          >
            <img style={{ width: '100%', height: '100%' }} src="./img/close.svg" alt="close" />
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(App);
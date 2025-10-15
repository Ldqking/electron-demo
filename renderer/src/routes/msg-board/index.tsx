import './index.css';
import '../App.css'
import HeaderBar from '../../components/header-bar';
import { useEffect, useRef, useState } from 'react';
import Back from '../../components/back';
import MsgList from '../../components/msg-list';
const MsgBoard = () => {
  const headerBarRef = useRef<any>(null);
  const [showBack, setShowBack] = useState<boolean>(true);
  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    headerBarRef.current?.handleBackgroundClick();
  };
  
  useEffect(() => { 
    let msgList = localStorage.getItem('msgsList');
    if(!msgList) {
      localStorage.setItem('msgsList', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <HeaderBar ref={headerBarRef} />
      <div className="app-container">
        {/* 视频背景 */}
        {/* <video
          ref={videoRef}
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./img/bg/bg.mp4" type="video/mp4" />
          您的浏览器不支持视频背景。
        </video> */}
        <img
          className="video-background"
          src="./img/bg/msg-board-bg.webp" alt="msg-board-bg" />

        <div
          className='app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        > 
          <MsgList handleBack={(show) => setShowBack(show)} />
          {showBack && <Back />}
        </div>
      </div>
    </>
  );
}

export default MsgBoard;

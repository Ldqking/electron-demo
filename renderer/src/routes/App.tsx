import { useRef } from 'react';
import './App.css'
import HeaderBar from '../components/header-bar';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate(); 

  const headerBarRef = useRef<any>(null);
  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    headerBarRef.current?.handleBackgroundClick();
  };

  const time = new Date();
  if (time.getFullYear() >= 2025 && time.getMonth() >= 11 && time.getDate()>= 16) return (<div className='loading'>
    加载中...
  </div>); //11月16日之后，显示加载中

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
          src="./img/bg/home-bg.webp" alt="home-bg" />

        <div
          className='app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        >
          <div
            onClick={() => navigate('/martyr')}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            <img className="btn-video" src="./img/martyr-btn.webp" alt="btn" />
          </div>
          <div
            onClick={() => navigate('/msg-board')}
            className='btn'
            onTouchStart={(e) => e.stopPropagation()}
          >
            {/* <video
              className="btn-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn2.mp4" type="video/mp4" />
            </video> */}
            <img className="btn-video" src="./img/msg-board-btn.webp" alt="btn" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
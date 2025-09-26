import { useRef } from 'react';
import './index.css';
import '../App.css';
import HeaderBar from '../../components/header-bar';
import { MARTYR_LIST_NEW } from '../../lib/enum';
import { useNavigate } from 'react-router-dom';
import Back from '../../components/back';
const Martyr = () => {
  const navigate = useNavigate();
  const headerBarRef = useRef<any>(null);
  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    headerBarRef.current?.handleBackgroundClick();
  };

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
          src="./img/bg/martyr-bg.png" alt="martyr-bg" />

        <div
          className='martyr-app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        >
          {MARTYR_LIST_NEW.map((item, _) => (
            <div
              onClick={() => navigate(`/martyr/${item.id}`)}
              className='martyr-btn'
              key={item.id}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* <video
              className="btn-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="./img/bg/btn1.mp4" type="video/mp4" />
            </video> */}
              <img className="btn-video" src={item.btnUrl} alt="btn" />
            </div>
          ))}
          <Back />
        </div>
      </div>
    </>
  )
}

export default Martyr;
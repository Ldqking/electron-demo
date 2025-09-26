import { useParams } from 'react-router-dom';
import './index.css'
import '../App.css'
import { useEffect, useRef, useState } from 'react';
import { MARTYR_LIST_NEW } from '../../lib/enum';
import HeaderBar from '../../components/header-bar';
import Back from '../../components/back';
import DeliverFlower from '../../components/deliver-flower';
import QuestionList from '../../components/question-list';
// 烈士问题类型
export interface MartyrQuestion {
  id: number;
  question: string;
  answer: string;
}

// 烈士信息类型
interface Martyr {
  id: number;
  name: string;
  btnUrl: string;
  img: string;
  desc: string;
  questions: MartyrQuestion[];
}

const FLOWER_NUM = 2.2;
const MartyrDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [martyr, setMartyr] = useState<Martyr | null>(null);

  const headerBarRef = useRef<any>(null);
  // 点击空白区域显示导航栏
  const handleBackgroundClick = () => {
    headerBarRef.current?.handleBackgroundClick();
  };

  useEffect(() => {
    // 根据路由参数id查找对应的烈士信息
    const selectedMartyr = MARTYR_LIST_NEW.find(item => item.id === Number(id)) || null;
    setMartyr(selectedMartyr);
  }, [id]);

  const [showFlower, setShowFlower] = useState(false);
  const timer = useRef<any>(null);

  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (showFlower) {
      timer.current = setTimeout(() => {
        setShowFlower(false);
      }, 1000*FLOWER_NUM);
    }
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [showFlower]);

  const handleFlower = () => {
    setShowFlower(true);
    //计数，当前烈士打开一次+1
    localStorage.setItem(`${martyr?.id}`, (Number(localStorage.getItem(`${martyr?.id}`) || 0) + 1).toString());
  };

  if (!martyr) {
    return <div>烈士信息未找到</div>;
  }

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
          className='martyr-detail-app'
          onClick={handleBackgroundClick}
          onTouchStart={handleBackgroundClick}
        >
          <div className='martyr-detail'>
            <img
              className="martyr-detail-avatar"
              src={martyr.img}
              alt={martyr.name}
            />
            <div className='martyr-detail-info'>
              <div className='info-title' style={{ background: `url(./img/info-title.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <span className='info-title-line'>|</span>
                <span>{martyr.name}</span>
              </div>
              <div className='info-desc'>
                {martyr.desc}
              </div>
            </div>
          </div>
          <div className='martyr-btns'>
            <img
              className=""
              src="./img/question-btn.png"
              alt="问题词条"
              onClick={() => {
                setShowQuestion(true);
              }}
            />
            <img
              className=""
              src="./img/hua-btn.png"
              alt="送花"
              onClick={() => handleFlower()}
            />
          </div>
          <DeliverFlower show={showFlower} id={martyr.id}/>
          <QuestionList list={martyr.questions} show={showQuestion} onClose={() => setShowQuestion(false)} />
          {!showQuestion && <Back />}
        </div>
      </div>
    </>
  )
}

export default MartyrDetail
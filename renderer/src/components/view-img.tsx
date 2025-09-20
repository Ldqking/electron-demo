import { memo, useCallback, useState } from "react";

const IMGS = [
  './img/protocol/jzhang1.png',
  './img/protocol/jzhang2.png',
];
const ViewImg = ({imgList = IMGS}: {imgList?: string[]}) => {

  const [imgIndex, setImgIndex] = useState(0);

  // 使用 useCallback 优化事件处理函数
  const handlePrev = useCallback(() => {
    setImgIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setImgIndex(prev => Math.min(imgList.length - 1, prev + 1));
  }, [imgList.length]);

  // 防止事件冒泡和默认行为
  const handleButtonMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="mask">
      <div className="image-container">
        <img src={imgList[imgIndex]} alt={`img-${imgIndex}`} className="preview-image" />
      </div>
      <div className="navigation" style={{ display: imgList.length > 1 ? "flex" : "none" }}>
        <img
          src="./img/l-btn.webp"
          alt="left"
          className={`nav-button ${imgIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
        />
        <img
          src="./img/r-btn.webp"
          alt="right"
          className={`nav-button ${imgIndex === imgList.length - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
        />
      </div>
    </div>
  );
};

export default memo(ViewImg);
import { useState, useCallback, useMemo } from "react";

const ViewImg = () => {
  const IMGS = useMemo(() => [
    './img/protocol/1_00000.png',
    './img/protocol/2_00000.png',
    './img/protocol/3_00000.png',
    './img/protocol/4_00000.png',
    './img/protocol/5_00000.png',
    './img/protocol/6_00000.png',
    './img/protocol/7_00000.png',
    './img/protocol/8_00000.png',
    './img/protocol/9_00000.png',
    './img/protocol/10_00000.png',
    './img/protocol/11_00000.png',
    './img/protocol/12_00000.png'
  ], []);

  const [imgIndex, setImgIndex] = useState(0);

  // 使用 useCallback 优化事件处理函数
  const handlePrev = useCallback(() => {
    setImgIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setImgIndex(prev => Math.min(IMGS.length - 1, prev + 1));
  }, [IMGS.length]);

  // 防止事件冒泡和默认行为
  const handleButtonMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  // 预加载相邻图片
  const preloadImages = useCallback(() => {
    const preload = (index: number) => {
      if (index >= 0 && index < IMGS.length) {
        const img = new Image();
        img.src = IMGS[index];
      }
    };

    // 预加载前一张和后一张图片
    preload(imgIndex - 1);
    preload(imgIndex + 1);
  }, [IMGS, imgIndex]);

  // 图片加载完成后的回调
  const handleImageLoad = useCallback(() => {
    preloadImages();
  }, [preloadImages]);

  // 检查按钮状态
  const isPrevDisabled = imgIndex === 0;
  const isNextDisabled = imgIndex === IMGS.length - 1;

  return (
    <div className="mask">
      <div className="image-container">
        <img 
          src={IMGS[imgIndex]} 
          alt={`img-${imgIndex}`} 
          className="preview-image"
          onLoad={handleImageLoad}
        />
      </div>
      <div className="navigation">
        <img
          src="./img/l-btn.webp"
          alt="left"
          className={`nav-button ${isPrevDisabled ? 'disabled' : ''}`}
          onClick={handlePrev}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
          style={{ cursor: isPrevDisabled ? 'not-allowed' : 'pointer' }}
        />
        <img
          src="./img/r-btn.webp"
          alt="right"
          className={`nav-button ${isNextDisabled ? 'disabled' : ''}`}
          onClick={handleNext}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
          style={{ cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  );
};

export default ViewImg;
import { useState, useEffect, memo } from "react";

const IMGS = [
  './img/protocol/find1.jpg',
  './img/protocol/find2.jpg',
  './img/protocol/find3.jpg',
  './img/protocol/find4.png',
  './img/protocol/find5.png',
];
const ViewImg = ({list = IMGS}: {list?: string[]}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(list[0]);
  const [preloadedImages, setPreloadedImages] = useState<{[key: string]: boolean}>({});

  // 预加载当前和相邻图片
  useEffect(() => {
    const preload = (index: number) => {
      if (index >= 0 && index < list.length && !preloadedImages[list[index]]) {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => ({ ...prev, [list[index]]: true }));
        };
        img.src = list[index];
      }
    };

    // 预加载当前图片
    preload(imgIndex);
    
    // 预加载前一张和后一张图片
    preload(imgIndex - 1);
    preload(imgIndex + 1);
    
    // 设置当前显示的图片
    setCurrentImage(list[imgIndex]);
  }, [imgIndex, list]);

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  };

  const handleNext = () => {
    if (imgIndex < list.length - 1) {
      setImgIndex(imgIndex + 1);
    }
  };

  // 防止事件冒泡和默认行为
  const handleButtonMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="mask">
      <div className="image-container">
        <img 
          src={currentImage} 
          alt={`img-${imgIndex}`} 
          className="preview-image" 
        />
      </div>
      <div className="navigation">
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
          className={`nav-button ${imgIndex === list.length - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
        />
      </div>
    </div>
  );
};

export default memo(ViewImg);
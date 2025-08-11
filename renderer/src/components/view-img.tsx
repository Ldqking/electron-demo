import { useState } from "react";

const ViewImg = () => {
  const IMGS = [
    './img/protocol/IMG_7482.jpg',
    './img/protocol/IMG_7483.jpg',
    './img/protocol/IMG_7484.jpg',
    './img/protocol/IMG_7485.jpg',
    './img/protocol/IMG_7486.jpg',
    './img/protocol/IMG_7487.jpg',
    './img/protocol/IMG_7488.jpg',
    './img/protocol/IMG_7489.jpg',
    './img/protocol/IMG_7490.jpg',
    './img/protocol/IMG_7491.jpg',
    './img/protocol/IMG_7493.jpg',
    './img/protocol/IMG_7494.jpg'
  ];

  const [imgIndex, setImgIndex] = useState(0);

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  };

  const handleNext = () => {
    if (imgIndex < IMGS.length - 1) {
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
        <img src={IMGS[imgIndex]} alt={`img-${imgIndex}`} className="preview-image" />
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
          className={`nav-button ${imgIndex === IMGS.length - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonMouseDown}
        />
      </div>
    </div>
  );
};

export default ViewImg;
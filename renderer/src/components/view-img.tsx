import { useState } from "react";
// import { IMGS_OF_BEFORE } from "../lib/enum";

const IMGS: string[] = [];
const ViewImg = ({imgList = IMGS}: {imgList?: string[]}) => {
  console.log('[ imgList ]', imgList)

  const [imgIndex, setImgIndex] = useState(0);

  const handlePrev = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  };

  const handleNext = () => {
    if (imgIndex < imgList.length - 1) {
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

export default ViewImg;
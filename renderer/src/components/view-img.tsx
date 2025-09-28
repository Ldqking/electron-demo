// renderer/src/components/view-img.tsx
import { useState, useCallback, useEffect } from "react";
import { IMGS_OF_BEFORE, IMGS_OF_FIRST, IMGS_OF_SECOND, IMGS_OF_AFTER } from "../lib/enum";

// const IMGS: string[] = IMGS_OF_BEFORE;
const BASE_IMGS = {
  'before': IMGS_OF_BEFORE,
  'first': IMGS_OF_FIRST,
  'second': IMGS_OF_SECOND,
  'after': IMGS_OF_AFTER
}

interface ViewImgProps {
  sign: "before" | "first" | "second" | "after" | "";
}

const ViewImg = ({ sign }: ViewImgProps) => {
  let IMGS =  sign ? BASE_IMGS[sign] ?? [] : [];
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

  useEffect(
    () => { 
      setImgIndex(0)
    },[sign]
  )

  // 检查按钮状态
  const isPrevDisabled = imgIndex === 0;
  const isNextDisabled = imgIndex === IMGS.length - 1;

  return (
    <div className="mask" style={{display: sign !==''? 'flex': 'none'}}>
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
  // const [imgIndex, setImgIndex] = useState(0);
  // const [currentImage, setCurrentImage] = useState(BASE_IMGS[sign][0]);
  // const [preloadedImages, setPreloadedImages] = useState<{[key: string]: boolean}>({});
  // const [imageLoading, setImageLoading] = useState(true);

  // // 预加载当前和相邻图片
  // useEffect(() => {
  //   // 设置当前显示的图片
  //   setCurrentImage(BASE_IMGS[sign][imgIndex]);
  //   const preload = (index: number) => {
      
  //     if (index >= 0 && index < BASE_IMGS[sign].length && !preloadedImages[BASE_IMGS[sign][index]]) {
  //       const img = new Image();
  //       img.onload = () => {
  //         setPreloadedImages(prev => ({ ...prev, [BASE_IMGS[sign][index]]: true }));
  //       };
  //       img.src = BASE_IMGS[sign][index];
  //     }
  //   };

  //   // 预加载当前图片
  //   preload(imgIndex);
    
  //   // 预加载前一张和后一张图片
  //   preload(imgIndex - 1);
  //   preload(imgIndex + 1);
    
  // }, [imgIndex, sign]);

  // const handlePrev = () => {
  //   if (imgIndex > 0) {
  //     setImgIndex(imgIndex - 1);
  //   }
  // };

  // const handleNext = () => {
  //   if (imgIndex < BASE_IMGS[sign].length - 1) {
  //     setImgIndex(imgIndex + 1);
  //   }
  // };

  // // 防止事件冒泡和默认行为
  // const handleButtonMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
  //   e.stopPropagation();
  // };

  // // 图片加载完成时的回调
  // const handleImageLoad = () => {
  //   setImageLoading(false);
  // };

  // // 图片加载出错时的回调
  // const handleImageError = () => {
  //   setImageLoading(false);
  // };

  // return (
  //   <div className="mask">
  //     <div className="image-container">
  //       {/* 显示loading状态 */}
  //       {imageLoading && (
  //         <div className="loading-indicator">
  //           <div className="spinner"></div>
  //           <p>加载中...</p>
  //         </div>
  //       )}
        
  //       <img 
  //         src={currentImage} 
  //         alt={`img-${imgIndex}`} 
  //         loading="lazy"
  //         decoding="async"
  //         className={`preview-image ${imageLoading ? 'loading' : 'loaded'}`}
  //         onLoad={handleImageLoad}
  //         onError={handleImageError}
  //       />
  //     </div>
  //     <div className="navigation">
  //       <img
  //         src="./img/l-btn.webp"
  //         alt="left"
  //         className={`nav-button ${imgIndex === 0 ? 'disabled' : ''}`}
  //         onClick={handlePrev}
  //         onMouseDown={handleButtonMouseDown}
  //         onTouchStart={handleButtonMouseDown}
  //       />
  //       <img
  //         src="./img/r-btn.webp"
  //         alt="right"
  //         className={`nav-button ${imgIndex === BASE_IMGS[sign].length - 1 ? 'disabled' : ''}`}
  //         onClick={handleNext}
  //         onMouseDown={handleButtonMouseDown}
  //         onTouchStart={handleButtonMouseDown}
  //       />
  //     </div>
  //   </div>
  // );
};

export default ViewImg;
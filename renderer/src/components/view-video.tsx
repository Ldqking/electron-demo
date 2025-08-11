// renderer/src/components/view-video.tsx
import { useEffect, useRef } from "react";

const ViewVideo = ({ onClose }: { onClose: () => void }) => {
  const VIDEO_URL = './home.mp4';
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // 视频加载完成后自动播放
      const playVideo = async () => {
        try {
          await video.play();
          // // 尝试全屏
          // if (video.requestFullscreen) {
          //   await video.requestFullscreen();
          // } else if ((video as any).webkitRequestFullscreen) {
          //   // Safari兼容
          //   await (video as any).webkitRequestFullscreen();
          // } else if ((video as any).mozRequestFullScreen) {
          //   // Firefox兼容
          //   await (video as any).mozRequestFullScreen();
          // } else if ((video as any).msRequestFullscreen) {
          //   // IE兼容
          //   await (video as any).msRequestFullscreen();
          // }
        } catch (error) {
          console.log("Auto-play prevented:", error);
        }
      };
      
      playVideo();
      
      // // 监听全屏变化事件
      // const handleFullscreenChange = () => {
      //   const fullscreenElement = 
      //     document.fullscreenElement ||
      //     (document as any).webkitFullscreenElement ||
      //     (document as any).mozFullScreenElement ||
      //     (document as any).msFullscreenElement;
        
      //   setIsFullscreen(!!fullscreenElement);
        
      //   // 如果退出全屏，则通知App关闭视频界面
      //   if (!fullscreenElement) {
      //     onClose();
      //   }
      // };
      
      // document.addEventListener('fullscreenchange', handleFullscreenChange);
      // document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      // document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      // document.addEventListener('MSFullscreenChange', handleFullscreenChange);
      
      // // 当组件卸载时暂停视频
      // return () => {
      //   video.pause();
      //   document.removeEventListener('fullscreenchange', handleFullscreenChange);
      //   document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      //   document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      //   document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      // };
    }
  }, [onClose]);

  // // 退出全屏
  // const exitFullscreen = () => {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if ((document as any).webkitExitFullscreen) {
  //     // Safari兼容
  //     (document as any).webkitExitFullscreen();
  //   } else if ((document as any).mozCancelFullScreen) {
  //     // Firefox兼容
  //     (document as any).mozCancelFullScreen();
  //   } else if ((document as any).msExitFullscreen) {
  //     // IE兼容
  //     (document as any).msExitFullscreen();
  //   }
  // };

  // 处理视频容器的触摸事件
  const handleVideoContainerTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="mask">
      <div className="video-wrapper">
        <div 
          className="video-container"
          onTouchStart={handleVideoContainerTouch}
        >
          <video 
            ref={videoRef}
            src={VIDEO_URL} 
            className="video-player"
            controls={true}
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default ViewVideo;
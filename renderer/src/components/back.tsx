const Back = () => {
  // 处理触摸事件，防止冒泡
  const handleCloseTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
  };
  const handleClose = () => {
    window.history.back();
  };
  
  return (
    <div
      className='close'
      style={{ width: '4vw', height: '4vw' }}
      onClick={handleClose}
      onTouchStart={handleCloseTouch}
    >
      <img style={{ width: '100%', height: '100%' }} src="./img/back.svg" alt="close" />
    </div>
  )
};
export default Back;
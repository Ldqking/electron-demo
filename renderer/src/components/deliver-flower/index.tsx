import './index.css'
const DeliverFlower = ({show, id}:{show:boolean, id:number}) => { 
  let num = localStorage.getItem(`${id}`) || 1;
  return (
    <div className='deliver-flower' style={{display: show? 'flex':'none'}}>
      <img style={{opacity: show? 1:0}} src="./img/flower.gif" alt="flower" />
      <div className='flower-text'>
        <span>您是第</span>
        <span className='flower-num'>{num}</span>
        <span className='flower-sign'>位</span>
        <span>送花的观众</span>
      </div>
      {/* <div className='flower-opening' style={{background: `url(./img/flower.webp)` , backgroundSize: 'cover', backgroundPosition: 'center'}}></div> */}
    </div>
  );
};

export default DeliverFlower;
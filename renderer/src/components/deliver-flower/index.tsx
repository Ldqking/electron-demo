import './index.css'
const DeliverFlower = ({show}:{show:boolean}) => { 
  return (
    <div className='deliver-flower' style={{display: show? 'flex':'none'}}>
      <img style={{opacity: show? 1:0}} src="./img/flower.gif" alt="flower" />
      {/* <div className='flower-opening' style={{background: `url(./img/flower.png)` , backgroundSize: 'cover', backgroundPosition: 'center'}}></div> */}
    </div>
  );
};

export default DeliverFlower;
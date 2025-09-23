import { memo } from "react";
import "./styles/view-img-overflow.css"

const ViewImgOverflow = ({imgUrl = './ali.png'}: {imgUrl?: string}) => {

  return (
    <div className="mask-new">
      <div className="image-container-new">
        <img src={imgUrl} alt={`img-${imgUrl}`} className="preview-image-new" />
      </div>
    </div>
  );
};

export default memo(ViewImgOverflow);
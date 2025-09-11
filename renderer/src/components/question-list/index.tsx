import { useState } from "react";
import type { MartyrQuestion } from "../../routes/martyr-detail"
import './index.css'
import ViewVideo from "../view-video";

const QuestionList = ({ list, show, onClose }: { list: MartyrQuestion[], show: boolean, onClose: () => void }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<MartyrQuestion | null>(null);
  if (!show) return null;
  return (
    <>
      <div className="question-list">
        <div className="question-list-container">
          {list.map((item) => (
            <div className="question-list-item" key={item.id} onClick={() => {
              setShowVideo(true);
              setCurrentQuestion(item);
            }}>
              <div className="question-content">{item.question}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="close" onClick={onClose}>
        <img src="./img/close.svg" alt="关闭" />
      </div>
      {showVideo && currentQuestion && (
        <ViewVideo url={currentQuestion.answer} onClose={() => setShowVideo(false)} />
      )}
    </>
  )
}

export default QuestionList
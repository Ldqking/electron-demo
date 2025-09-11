import { useEffect, useRef, useState } from 'react';
import './index.css'
import { BANNED_WORDS } from '../../lib/enum';
const MsgList = () => {
  const [list, setList] = useState<{msg:string,time:string}[]>(JSON.parse(localStorage.getItem('msgList') ?? '[]'));
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [addMsg, setAddMsg] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('请输入您的留言...');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const msg = e.target.value.trim();
    console.log('[ msg ]', msg)
    if (msg.length > 0) {
      setAddMsg(msg);
      // setShowAdd(true);
    } else {
      setAddMsg('');
      // setShowAdd(false);
    }
  }

  // 检查是否包含敏感词
  const containsBannedWords = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return BANNED_WORDS.some(word => lowerText.includes(word.toLowerCase()));
  };

  const handleSendMsg = () => {
    if (addMsg.trim().length === 0) {
      // 如果输入为空，直接关闭输入框
      setShowAdd(false);
      setAddMsg('');
      setPlaceholder('请输入您的留言...');
      return;
    }

    // 检查是否包含不文明文字
    if (containsBannedWords(addMsg)) {
      // 包含敏感词，提示用户重新输入
      setAddMsg('');
      setPlaceholder('文明留言！！！');
      return;
    }

    // 正常发送流程
    setShowAdd(false);
    setAddMsg(''); // 清空输入框
    setPlaceholder('请输入您的留言...');

    let msgList = JSON.parse(localStorage.getItem('msgList') ?? '[]');
    msgList.unshift({
      msg: addMsg,
      time: new Date().toLocaleString()
    });

    // 保持数组长度为9，超出部分移除
    if (msgList.length > 9) {
      msgList = msgList.slice(0, 9);
    }

    localStorage.setItem('msgList', JSON.stringify(msgList));
    setList(msgList);
  }

  useEffect(() => { 
    if (showAdd) { 
      //自动聚焦文本框
      textareaRef.current&&textareaRef.current.focus();
    }
  }, [showAdd]);

  return (
    <div className="msg-list">
      <div className='msg-list-container'>
        {/* {list.length === 0 && (
          <div>暂无留言</div>
        )} */}
        {list.length > 0 && list.map((item, index) => (
          <div className='msg-list-item' key={index}>
            <div className='msg-item-content'>
              {item.msg}
            </div>
          </div>
        ))}
      </div>
      <div className='msg-add' onClick={() => setShowAdd(true)}>
        <img src="./img/msg-btn.png" alt="书写留言" />
      </div>
      {showAdd && (
        <div className='msg-add-box'>
          <div className='msg-box'>
            <div className='msg-box-info'>
              <textarea
                ref={textareaRef}
                value={addMsg}
                placeholder={placeholder}
                onChange={(e) => handleChangeMsg(e)}
                maxLength={50}
                name="msg" id=""
              ></textarea>
            </div>
          </div>
          <div className='msg-box-send' onClick={() => handleSendMsg()}>
            <img src="./img/send-btn.png" alt="发送" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MsgList;
import { useEffect, useMemo, useRef, useState } from 'react';
import './index.css'
import { BANNED_WORDS } from '../../lib/enum';
import { getRowData, vhToPx } from '../../lib/utils';

const MSG_NUM = 200;
const itemHeight = '12vh' // 使用vh单位
const itemsPerRow = 3 // 每行元素个数
const MsgList = ({ handleBack }: { handleBack: (showAdd: boolean) => void }) => {
  const [list, setList] = useState<string[]>(JSON.parse(localStorage.getItem('msgsList') ?? '[]'));
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [addMsg, setAddMsg] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('请输入您的留言...');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  // 确保 list 更新时 rowData 也会更新
  const rowData = useMemo(() => getRowData(list, itemsPerRow), [list]);

  // // 处理滚动事件
  // const handleScroll = useMemo(
  //   () => debounce(() => {
  //     // console.log('[ debounce ]')
  //     scrollCallback();
  //   }, 16), // 约等于 60fps
  //   []
  // );

  const handleScroll = () => {
    scrollCallback();
  };

  useEffect(() => {
    if (rowData.length > 0) {
      scrollCallback();
    }
  }, [list, rowData]);

  const scrollCallback = () => {
    const innerContainer = innerContainerRef.current!;
    const container = containerRef.current!;
    const scrollTop = Math.max(container.scrollTop, 0);

    // 固定行高
    const fixedRowHeight = vhToPx(itemHeight);

    // 计算起始和结束索引
    const startIndex = Math.floor(scrollTop / fixedRowHeight);
    const visibleRowCount = Math.ceil(container.clientHeight / fixedRowHeight) + 5; // 多渲染几行避免白屏
    const endIndex = Math.min(startIndex + visibleRowCount - 1, rowData.length - 1);

    // 计算padding
    // 优化paddingTop和paddingBottom，确保首尾都能完整显示
    const paddingTop = Math.max(startIndex * fixedRowHeight, 0);
    const paddingBottom = Math.max((rowData.length - endIndex - 1) * fixedRowHeight, 0);
    // 设置padding
    innerContainer.setAttribute('style', `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px`);

    // 渲染可见行
    innerContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    // 确保渲染范围不会超出数组边界
    const renderStart = Math.max(0, startIndex);
    const renderEnd = Math.min(endIndex, rowData.length - 1);

    for (let i = renderStart; i <= renderEnd; i++) {
      if (i >= rowData.length) break;

      const row = document.createElement('div');
      row.className = 'row';

      const rowDataItem = rowData[i];

      // 创建行内元素
      for (let j = 0; j < rowDataItem.length; j++) {
        const parent = document.createElement('div');
        parent.className = 'msg-list-item';

        const item = document.createElement('div');
        item.className = 'msg-item-content';
        item.innerHTML = rowDataItem[j];

        parent.appendChild(item);
        row.appendChild(parent);
      }

      fragment.appendChild(row);
    }

    innerContainer.appendChild(fragment);
  }

  const handleChangeMsg = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const msg = e.target.value.trim();
    // console.log('[ msg ]', msg)
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

    let msgList = JSON.parse(localStorage.getItem('msgsList') ?? '[]');
    msgList.unshift(addMsg);
    // msgList.unshift({
    //   msg: addMsg,
    //   // time: new Date().toLocaleString()
    // });

    // 保持数组长度为9，超出部分移除
    if (msgList.length > MSG_NUM) {
      msgList = msgList.slice(0, MSG_NUM);
    }

    localStorage.setItem('msgsList', JSON.stringify(msgList));
    setList(msgList);
  }

  useEffect(() => {
    if (showAdd && textareaRef.current) {
      // 自动聚焦文本框
      textareaRef.current.focus();
    }
    handleBack(!showAdd);
  }, [showAdd]);

  useEffect(() => {
    // 只有在显示输入框时才监听聚焦事件
    if (!showAdd) return;

    // 延迟执行确保 DOM 已经挂载
    const timer = setTimeout(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // 定义聚焦处理函数
      const handleFocus = () => {
        console.log('文本框获得焦点，尝试打开键盘');
        // if (window.electron) {
        //   window.electron.openKeyboard().catch((err: any) => {
        //     console.error('无法打开键盘:', err);
        //   });
        // }
      };

      // 添加聚焦事件监听器
      textarea.addEventListener('focus', handleFocus);

      // 手动触发一次聚焦事件处理（因为可能已经聚焦了）
      if (document.activeElement === textarea) {
        handleFocus();
      }

      // 清理函数
      return () => {
        textarea.removeEventListener('focus', handleFocus);
      };
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [showAdd]);

  useEffect(() => {
    // 清理 localStorage，移除所有缓存除了 msgsList,1,2,3,4
    const preservedKeys = ['msgsList', '1', '2', '3', '4'];
    const msgList = localStorage.getItem('msgsList');
    const currentMsgList = msgList ? JSON.parse(msgList) : [];

    // 只保留指定的键值
    Object.keys(localStorage).forEach(key => {
      if (!preservedKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    localStorage.setItem('msgsList', JSON.stringify(currentMsgList));
    scrollCallback();
  }, []);

  return (
    <div className="msg-list">
      <div className='msg-list-container'
        ref={containerRef}
        onScroll={handleScroll}
        style={{ overflowY: list.length > 9 ? 'auto' : 'hidden' }}
      >
        <div className='innerContainer' ref={innerContainerRef}></div>
        {/* {list.length === 0 && (
          <div>暂无留言</div>
        )} */}
        {/* {list.map(({ item, originalIndex }) => (
          <div className={`msg-list-item item-${item}`} key={originalIndex}>
            <div className='msg-item-content'>
              {item}
            </div>
          </div>
        ))} */}
      </div>
      <div className='msg-add' onClick={() => setShowAdd(true)}>
        <img src="./img/msg-btn.webp" alt="书写留言" />
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
                name="msg"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="sentences"
                spellCheck="true"
                aria-label="留言输入框"
              ></textarea>
            </div>
          </div>
          <div className='msg-box-send' onClick={() => handleSendMsg()}>
            <img src="./img/send-btn.webp" alt="发送" />
          </div>
          <div className="close" onClick={() => setShowAdd(false)}>
            <img src="./img/close.svg" alt="关闭" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MsgList;
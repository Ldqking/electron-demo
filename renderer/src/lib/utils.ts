// 将vh单位转换为像素值
export const vhToPx = (vhValue: string) => {
  if (typeof vhValue === 'string' && vhValue.endsWith('vh')) {
    const vh = parseFloat(vhValue);
    return Math.max(window.innerHeight * vh / 100, 1);
  } else if (typeof vhValue === 'number') {
    return Math.max(window.innerHeight * vhValue / 100, 1);
  }
  return 0;
}

// 将数据按行分组
export const getRowData = (list: string[], itemsPerRow: number) => {
  const rows = []
  for (let i = 0; i < list.length; i += itemsPerRow) {
    const row = []
    for (let j = 0; j < itemsPerRow; j++) {
      if (i + j < list.length) {
        row.push(list[i + j])
      }
    }
    rows.push(row)
  }
  return rows
}

/**
 * 防抖函数
 * @template T - 函数类型，表示传入的函数 `func` 的类型。
 * @param {T} func - 需要防抖的函数。
 * @param {number} delay - 延迟时间（毫秒），表示在延迟时间内如果有新的调用，则重新计时。
 * @returns {(...args: Parameters<T>) => void} - 返回一个新的函数，调用该函数会触发防抖逻辑。
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
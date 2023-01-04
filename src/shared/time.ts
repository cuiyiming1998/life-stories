export const getConvertedDateString = (): string => {
  const date = new Date()
  return `${date.getMonth() + 1}月 ${date.getDate()}日`
}

// 获得当前时间在本年中已过多久
export const getGoneTimesPercent = (): string => {
  const year = new Date().getFullYear()
  const startTime = new Date(year, 0, 1).getTime()
  const currentYearTime = new Date(year + 1, 0, 1).getTime()
  const currentTime = Date.now()

  const percent =
    ((currentTime - startTime) / (currentYearTime - startTime)) * 100
  return `${percent.toFixed(3)}%`
}

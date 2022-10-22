import { getConvertedDateString, getGoneTimesPercent } from '@/shared/time'
import { Ref } from 'vue'

/**
 * description
 * 定时器获取当前currentTime
 *
 * @param void
 * @return { currentTime }
 *
 */
export const useCurrentTime = () => {
  const currentYear = ref<number>(new Date().getFullYear())
	const date = ref<string>(getConvertedDateString()) // 日期string
	const time = ref<string>(new Date().toLocaleTimeString()) // 时间string
  const gonePercent = ref<string>(getGoneTimesPercent())
  // 当前时间
	const currentTime = computed<string>(() => {
    return `${unref(date)} ${unref(time)}`
	})

	const changeTime = () => {
    currentYear.value = new Date().getFullYear()
		date.value = getConvertedDateString()
		time.value = new Date().toLocaleTimeString()
    gonePercent.value = getGoneTimesPercent()
	}
	// 定时器修改时间
	window.setInterval(changeTime, 1000)

	return { currentYear, currentTime, gonePercent }
}

import type { Count, Callback } from './types.d'

enum Unit {
  S = 's',
  MS = 'ms'
}

export const useCountdown = (
  count: Count,
  callback: Callback,
  unit: Unit = Unit.MS
) => {
  const ms = isMs(unit)
  const countdown = ref<Count>(ms ? count / 1000 : count)

  const interval = window.setInterval(() => {
    countdown.value -= 1
    if (0 === countdown.value) {
      callback()
      window.clearInterval(interval)
    }
  }, 1000)

  return {
    countdown
  }
}

const isMs = (u: Unit) => Unit.MS === u

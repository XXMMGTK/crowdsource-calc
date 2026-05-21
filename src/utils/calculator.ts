import type { CalcInput, CalcResult, Rating } from '@/types'

/**
 * 计算每公里收益并返回评级
 * 总距离为骑手→商家 + 商家→顾客
 */
export function calculate(input: CalcInput): CalcResult {
  const totalDist = input.distToShop + input.distToCustomer
  const earningPerKm = totalDist > 0
    ? Math.round((input.price / totalDist) * 100) / 100
    : 0

  let rating: Rating
  if (earningPerKm >= 2.3) {
    rating = 'good'
  } else if (earningPerKm >= 1.8) {
    rating = 'normal'
  } else {
    rating = 'bad'
  }

  return { totalDist, earningPerKm, rating }
}

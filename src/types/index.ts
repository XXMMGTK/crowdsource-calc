/** 评级等级 */
export type Rating = 'good' | 'normal' | 'bad'

/** 评级文案映射 */
export const RATING_MAP: Record<Rating, { label: string; color: string }> = {
  good: { label: '优质好单 优先接单', color: '#34C759' },
  normal: { label: '普通订单 顺路可接', color: '#FF9500' },
  bad: { label: '低价订单 不建议接', color: '#FF3B30' }
}

/** 计算输入 */
export interface CalcInput {
  price: number
  distToShop: number
  distToCustomer: number
}

/** 计算结果 */
export interface CalcResult {
  totalDist: number
  earningPerKm: number
  rating: Rating
}

/** 历史记录条目 */
export interface HistoryItem {
  id: string
  input: CalcInput
  result: CalcResult
  createdAt: string
}

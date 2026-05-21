import type { HistoryItem } from '@/types'

const STORAGE_KEY = 'crowdsource-calc-history'

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveRecord(item: HistoryItem): void {
  const list = loadHistory()
  list.unshift(item)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function deleteRecord(id: string): void {
  const list = loadHistory().filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

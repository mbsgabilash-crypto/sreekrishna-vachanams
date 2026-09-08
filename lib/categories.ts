import type { CategoryId } from './vachanams'

export interface CategoryMeta {
  id: CategoryId
  label: string
  english: string
}

export const categories: CategoryMeta[] = [
  { id: 'karma', label: 'കർമ്മം', english: 'Karma' },
  { id: 'dharma', label: 'ധർമ്മം', english: 'Dharma' },
  { id: 'bhakti', label: 'ഭക്തി', english: 'Bhakti' },
  { id: 'love', label: 'സ്നേഹം', english: 'Love' },
  { id: 'peace', label: 'ശാന്തി', english: 'Peace' },
  { id: 'wisdom', label: 'ജ്ഞാനം', english: 'Wisdom' },
  { id: 'courage', label: 'ധൈര്യം', english: 'Courage' },
  { id: 'forgiveness', label: 'ക്ഷമ', english: 'Forgiveness' },
  { id: 'life', label: 'ജീവിതം', english: 'Life' },
]

export const categoryMap: Record<CategoryId, CategoryMeta> = categories.reduce(
  (acc, c) => {
    acc[c.id] = c
    return acc
  },
  {} as Record<CategoryId, CategoryMeta>,
)

export const ALL_LABEL = { label: 'എല്ലാം', english: 'All' }

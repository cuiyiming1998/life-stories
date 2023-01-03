interface Origin {
  title: string
  dynasty: string
  author: string
  content: string[]
  translate: string[]
}

interface Detail {
  id: string
  content: string
  popularity: string
  origin: Origin
  matchTags: string[]
  recommendedReason: string
  cacheAt: string
}

export interface PoetryData {
  status: string
  data: Detail
  token: string
  ipAddress: string
}

export interface Options {
  onLoad?: (res: Detail) => any
}

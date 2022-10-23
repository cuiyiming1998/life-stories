import * as poetries from 'jinrishici'

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

interface Options {
  onLoad?: (res: Detail) => any
}

export const usePoetry = (options?: Options) => {
	const poetry = ref<string>()
	const poetryName = ref<string>()
	const author = ref<string>()
	const run = () => {
		poetries.load((res: PoetryData): void => {
      const { data } = res
			poetry.value = data.content
			poetryName.value = data.origin.title
			author.value = data.origin.author
      options?.onLoad && options.onLoad(data)
		})
	}
	run()

	return { poetry, poetryName, author, run }
}

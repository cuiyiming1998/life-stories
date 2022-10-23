import * as poetries from 'jinrishici'

interface Origin {
	title: string
	dynasty: string
	author: string
	content: string[]
	translate: string[]
}

export interface PoetryData {
	status: string
	data: {
		id: string
		content: string
		popularity: string
		origin: Origin
		matchTags: string[]
		recommendedReason: string
		cacheAt: string
	}
	token: string
	ipAddress: string
}

export const usePoetry = (onLoad?: (res: PoetryData) => any) => {
	const poetry = ref<string>()
	const poetryName = ref<string>()
	const author = ref<string>()
	poetries.load((res: PoetryData) => {
		poetry.value = res.data.content
		poetryName.value = res.data.origin.title
		author.value = res.data.origin.author
		onLoad && onLoad(res)
	})

	return { poetry, poetryName, author }
}

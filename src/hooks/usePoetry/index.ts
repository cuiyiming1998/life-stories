import * as poetries from 'jinrishici'
import type { PoetryData, Options } from './types.d'

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

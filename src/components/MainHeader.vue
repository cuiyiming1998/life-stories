<template>
	<main
		class="cursor-default flex flex-col justify-center items-start p-20 animate__animated animate__fadeIn animate__faster"
	>
		<h1 class="text-5xl text-gray-600">Life Stories</h1>
		<h1 class="text-2xl text-gray-400">{{ greetings }} {{ name }}</h1>
		<div class="text-2xl text-gray-300">
			{{ currentTime }}
		</div>
		<div class="text-2xl text-gray-300 mt-2">
			{{ currentYear }}年 已过
			{{ gonePercent }}
		</div>
		<div
			class="text-5xl text-gray-700 mt-4 cursor-pointer"
			@click="getPoetries"
		>
			{{ poetry }}
		</div>
	</main>
</template>

<script lang="ts" setup>
	import { getGreetings } from '../shared/getGreetings'
	import { useUserStore } from '../store/useUserStore'
	import { useCurrentTime } from '../hooks/useCurrentTime'
	import { usePoetry } from '../hooks/usePoetry'
	import { debounce } from 'lodash-es'

	const user = useUserStore()
	const { name } = storeToRefs(user)

	const greetings = getGreetings()

	const { currentYear, currentTime, gonePercent } = useCurrentTime()

	const { poetry, run: getP } = usePoetry()
	const getPoetries = debounce(getP, 200)
</script>

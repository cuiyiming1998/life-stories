<template>
	<main class="flex flex-col justify-center items-center p-20">
		<h1 class="text-5xl text-gray-400">Life Stories</h1>
		<h1 class="text-2xl text-gray-400 animate__animated animate__heartBeat">
			{{ greetings }} {{ name }}
		</h1>
		<div class="text-2xl text-gray-400">
      现在是{{ currentTime }}
    </div>
		<div class="my-4">
			<a :href="github"> github: {{ github }}</a>
		</div>
	</main>
</template>

<script lang="ts" setup>
	import { getGreetings } from '../shared/getGreetings'
	import { useUserStore } from '../store/useUserStore'
  import { useCurrentTime } from '../hooks/useCurrentTime'

	const user = useUserStore()
	const { name, github } = storeToRefs(user)

  const greetings = getGreetings()

  const { currentTime } = useCurrentTime()
</script>

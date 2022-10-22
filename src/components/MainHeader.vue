<template>
	<main class="flex flex-col justify-center items-start p-20">
		<h1 class="text-5xl text-gray-600">Life Stories</h1>
		<h1 class="text-2xl text-gray-400 animate__animated animate__heartBeat">
			{{ greetings }} {{ name }}
		</h1>
		<div class="text-2xl text-gray-400">
      {{ currentTime }}
    </div>
		<div class="text-2xl text-gray-300 mt-2">
      {{ currentYear}}年
      已过
      {{ gonePercent }}
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

  const { currentYear, currentTime, gonePercent } = useCurrentTime()
</script>

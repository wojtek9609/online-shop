<template>
	<div class="message">
		Thank You for your purchase !<br />
		You will be redirected to our shop main page within a few seconds...
	</div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()

		onMounted(() => {
			setTimeout(() => {
				router.push({ path: `/` })
			}, 6000)
		})
	}
}
</script>

<style lang="scss" scoped>
.message {
	margin: 1.5rem;
	text-align: center;
	font-size: 1.25rem;
	font-weight: bold;
}
</style>

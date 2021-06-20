<template>
	<h4>
		Thank You for your purchase !<br />
		You will be redirected to our shop main page in few seconds...
	</h4>
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
			}, 5000)
		})
	}
}
</script>

<style lang="scss" scoped></style>

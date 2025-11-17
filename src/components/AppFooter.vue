<template>
	<v-footer
		id='footer'
		absolute
		app
		class='ma-0 pa-0 mb-3'
		color='transparent'
	>
		<v-row align='center' class='no-gutters ma-0 pa-0' justify='center'>

			<v-col class='no-gutters unselectable ma-0 pa-0' cols='auto'>

				<v-chip
					class='not-cl elevation-0'
					color='offwhite'
					pill
					:ripple='false'
					variant='flat'
				>

					<section v-if='showBuild' class='text-caption' @click='buildInfo'>
						<span>site version: {{ appVersion }}</span>
						<span class='ml-3 '>built: {{ buildDate }}</span>
					</section>

					<section v-else>
						<a :href rel='noopener noreferrer' target='_blank'>
							<v-icon class='' color='black' href='' :icon='mdiGithub' />
						</a>
						<span @click='buildInfo'>
							mrjackwills 2024-
						</span>
					</section>

				</v-chip>
			</v-col>
		</v-row>

	</v-footer>
</template>

<script setup lang='ts'>
import { mdiGithub } from '@mdi/js'
import { env } from '@/vanillaTS/env'
const buildTimeout = ref(0)
const showBuild = ref(false)
const buildDate = env.build_date
const href = env.homepage

onUnmounted(() => {
	clearTimeout(buildTimeout.value)
})

const appVersion = computed(() => env.app_version)

function buildInfo (): void {
	showBuild.value = !showBuild.value
	clearTimeout(buildTimeout.value)
	if (showBuild.value) {
		buildTimeout.value = window.setTimeout(() => {
			showBuild.value = false
		}, 10_000)
	}
}
</script>

<style scoped>
.lowercase-button {
	text-transform: lowercase;
}

a {
	color: #000000 !important;
	text-decoration: none;
}
</style>

<template>
	<v-footer id='footer' class='ma-0 pa-0 mb-3' color='transparent' app absolute>
		<v-row justify='center' align='center' class='no-gutters ma-0 pa-0'>

			<v-col cols='auto' class='no-gutters unselectable ma-0 pa-0'>

				<v-chip :ripple='false' class='not-cl elevation-0' color='offwhite' variant='flat' pill>

					<section v-if='showBuild' class='text-caption' @click='buildInfo'>
						<span>site version: {{ appVersion }}</span>
						<span class='ml-3 '>built: {{ buildDate }}</span>
					</section>

					<section v-else>
						<a :href='href' target='_blank' rel='noopener noreferrer'>
							<v-icon color='black' class='' href='' :icon='mdiGithub' />
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
import { env } from '@/vanillaTS/env';
import { mdiGithub } from '@mdi/js';
const buildTimeout = ref(0);
const showBuild = ref(false);
const buildDate = env.build_date;
const href = env.homepage;

onUnmounted(() => {
	clearTimeout(buildTimeout.value);
});

const appVersion = computed(() => env.app_version);

const buildInfo = (): void => {
	showBuild.value = !showBuild.value;
	clearTimeout(buildTimeout.value);
	if (showBuild.value) {
		buildTimeout.value = window.setTimeout(() => {
			showBuild.value = false;
		}, 10000);
	}
};
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
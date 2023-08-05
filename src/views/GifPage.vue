<template>
	<v-app id="inspire">

		<v-main>
			<v-container>
				<NotFoundElement 
					v-if="isNotFound"
					title="Gif not found."
				></NotFoundElement>
				<div class="gif page" v-else-if="gif">
					<h1>{{gif.title}}</h1>
					<v-row class="d-flex justify-center mt-6">
						<v-col
							cols="12"
							sm="8"
							md="6"
						>
							<GifWrapper :item="gif"></GifWrapper>
						</v-col>
					</v-row>
					<v-row class="mt-10">
						<v-col>
							<h2>
								Added by:
							</h2>
						</v-col>
					</v-row>
					<v-row class="pa-2  align-center">
						<v-col class="pa-0 user-image-avatar">
							<v-img
								:src="gif.user.avatar_url"
								width="100%"
								class="rounded-circle"
								
							>
								<template v-slot:placeholder>
									<div class="d-flex align-center justify-center fill-height">
										<v-progress-circular
											color="grey-lighten-4"
											indeterminate
										></v-progress-circular>
									</div>
								</template>		
							</v-img>
						</v-col>
						<v-col class="ml-4 d-flex flex-column justify-between">
							<div style="font-size:20px">{{ gif.user.display_name }} 
								<span style="opacity:0.7">
									(@{{ gif.user.username }})
								</span>
							</div>
							<router-link tag="a" :to="`/users/${gif.user.username}?gif=${gif.id}`" class="w-100 text-truncate" style="font-size:20px">
								To user profile
								<v-icon :icon="`mdi-account`"></v-icon>
							</router-link>
						</v-col>
					</v-row>
					<v-row v-if="sliderGifs.length">
						<v-col>
							<GifSlider :gifs="sliderGifs"></GifSlider>
						</v-col>
					</v-row>
				</div>
			</v-container>
		</v-main>
</v-app>
</template>

<script setup lang="ts">
import type { IGifData, IGifDataResponse, IResponse } from '@/types';
import { ref, onMounted, computed } from 'vue';
import { getGifById, getTrendGifs } from "../api/index"
import NotFoundElement from "@/components/NotFoundElement.vue";
import GifWrapper from "@/components/GifWrapper.vue";
import GifSlider from '@/components/GifSlider.vue';
import { watch } from 'vue';

const props = defineProps<{
    id:string
}>()

const gif = ref<IGifData|null>(null);
let gifLoading = ref<boolean>(false);
let isInited = ref(false);
let sliderGifs = ref<IGifData[]>([])

let loadPageData = async() =>{
	if(gifLoading.value) return;
	gifLoading.value = true
	try {
		let res = await getGifById(props.id) as IGifDataResponse;
		console.log('onMounted', res);
		
		if(res){
			gif.value = res.data;
		}
	} catch (error) {
		
	}
	gifLoading.value = false;
	getRandomGifs()
	if(!isInited.value){
		isInited.value=true
	}
}

watch(() => props.id, ()=>{
	console.log('props.id');
	if(props.id){
		loadPageData()
	}
})

onMounted(()=>{
	loadPageData()
}) 

let isNotFound = computed(()=>{
	return !gif.value && !gifLoading.value && isInited.value
})

let getRandomGifs = async () => {
	let res:IResponse|null = await getTrendGifs(0) as IResponse;
	if(res){
		sliderGifs.value = res.data;
	}
}
</script>

<style>
@media (min-width: 1024px) {

}
</style>

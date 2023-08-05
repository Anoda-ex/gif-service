

<template>
	<v-app id="inspire">
		<v-app-bar
			app
			
		>	
			<v-container>
				<v-row>
					<v-col cols="4" md="3">
					
						<v-img
							src="https://www.goomlandscapes.co.nz/wp-content/uploads/2018/08/logo-placeholder.png"
							contain
							height="45px"
							width="120px"
						></v-img>
							
					</v-col>
					<v-col cols="8" md="9">
						<v-text-field
							density="compact"
							variant="solo"
							label="Search"
							prepend-inner-icon="mdi-magnify"
							single-line
							hide-details
							v-model="searchValue"
						></v-text-field>
					</v-col>
				</v-row>
				
				
				
			</v-container>
		</v-app-bar>

		<v-main>
			<v-container>
				<NotFoundElement 
					v-if="isNotFound"
					title="Gifs not found."
				></NotFoundElement>
				
				<v-row v-else>
					<v-col
						v-for="item in gifs" 
						:key="item.id" 
						cols="6"
						sm="4"
						md="3"
						
					>
						<router-link :to="`/gifs/${item.id}`" tag="div">
							<GifWrapper :item="item"></GifWrapper>
							
						</router-link>
					</v-col>
				</v-row>
				<Loading v-if="gifsLoading"></Loading>

				<div v-if="!isNotFound" ref="observeElement" class="observer "></div>
			</v-container>
			

		</v-main>
	</v-app>
	
</template>




<script setup lang="ts">

import { type IGifData, type IResponse } from "../types"
import { getTrendGifs, getSearchGifs } from '../api/index';
import { onMounted, ref, watch } from "vue";
import NotFoundElement from "@/components/NotFoundElement.vue";
import { computed } from "vue";
import Loading from "@/components/Loading.vue";
import GifWrapper from "@/components/GifWrapper.vue";
let searchValue = ref<string>('');
let gifs = ref<IGifData[]>([])
let gifsLoading = ref<boolean>(false)
let pagination = ref<number>(0);
let observeElement = ref(undefined)
let isInited = ref(false)

watch(searchValue, ()=>{
	pagination.value=0;
	gifs.value=[];
	nextPage();
})

watch(searchValue, (newSearchValue) => {
	console.log(`x is ${newSearchValue}`)
})

let nextPage = async () => {
	if(gifsLoading.value) return;

	gifsLoading.value = true
	let res:IResponse|null = null
	if(searchValue.value){
		// console.log('getSearchGifs');
		res = await getSearchGifs(pagination.value, searchValue.value) as IResponse;
	}else{
		res = await getTrendGifs(pagination.value) as IResponse;
	}
	if(res){
		pagination.value = pagination.value + res.pagination.count;
		gifs.value = [...gifs.value, ...res.data];
	}
	gifsLoading.value=false
	if(!isInited.value){
		return isInited.value=true
	}
}

let isNotFound = computed(()=>{
	return gifs.value.length===0 && !gifsLoading.value && isInited.value
})

onMounted(async ()=>{
	let options = {
		rootMargin: "0px",
		threshold: 1.0,
	};
	let callback:IntersectionObserverCallback = (entries, observer) => {
		if(entries[0].isIntersecting){
			nextPage()
		}
	}
	let observer:IntersectionObserver = new IntersectionObserver(callback, options);
	console.log('observe element', observeElement);
	
	if(observeElement.value){
		observer.observe(observeElement.value)
	}
})


</script>
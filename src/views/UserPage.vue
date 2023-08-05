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
				<v-col cols="8" md="9" class="d-flex align-center justify-end">
					<router-link v-if="$route.query.gif" tag="a" :to="`/gifs/${$route.query.gif}`">Back to gif page</router-link>
					<router-link v-else tag="a" :to="`/`">Back to home page</router-link>
				</v-col>
			</v-row>
			
			
			
		</v-container>
	</v-app-bar>
	<v-main>
        <v-container>
			<Loading v-if="userLoading"></Loading>
			<NotFoundElement 
				v-else-if="isNotFound"
				title="Gif not found."
			></NotFoundElement>
			<v-row class="pa-2  align-center" v-else-if="user">
				<v-col class="pa-0 user-image-avatar" >
					<v-img
						:src="user.avatar_url"
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
					<div style="font-size:20px">{{ user.display_name }} 
						<span style="opacity:0.7">
							(@{{ user.username }})
						</span>
					</div>
					<a :href="user.profile_url" target="_blank" class="w-100 text-truncate" style="font-size:20px">
						To giphy user profile
						<v-icon :icon="`mdi-account`"></v-icon>
					</a>
				</v-col>
			</v-row>
        </v-container>
	</v-main>
</v-app>
</template>


<script setup lang="ts">
import { ref } from "vue";
import {getUser} from "../api/index"
import { onMounted } from 'vue';
import { type IUser } from "@/types";
import { computed } from "vue";
import NotFoundElement from "@/components/NotFoundElement.vue";
import Loading from "@/components/Loading.vue";

const props = defineProps<{
    id:string
}>()

let user = ref<IUser|null>(null)
let userLoading = ref<boolean>(false)
let isInited = ref<boolean>(false)

let loadPageData = async () => {
	if(userLoading.value) return;
	userLoading.value = true
	try {
		let res = await getUser(props.id);
	
		
		if(res){
			user.value = res as IUser;
		}
	} catch (error) {
		
	}

	userLoading.value = false;
	if(!isInited.value){
		isInited.value=true
	}
}

let isNotFound = computed(()=>{
	return !user.value && !userLoading.value && isInited.value
})

onMounted(()=>{
	loadPageData()
}) 
</script>



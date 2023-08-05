<template>
    <v-row class="d-flex justify-center">
        <v-col
            cols="12"
            sm="8"
            md="6"
        >
                <div class="gif-item-inner">
                    <div class="gif-item-content">
                        
                        <v-img
                            class="w-100 h-100"
                            aspect-ratio="16/9"
                            cover
                            :src="notFoundGif?.images.original.url"
                            :lazy-src="notFoundGif?.images?.fixed_width_small ? notFoundGif.images.fixed_width_small.url:undefined"
                        >
                            <template v-slot:placeholder v-if="notFoundGif?.images?.fixed_width_small">
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular
                                        color="grey-lighten-4"
                                        indeterminate
                                    ></v-progress-circular>
                                </div>
                            </template>					
                        </v-img>
                    </div>
                </div>
        </v-col>
    </v-row>
    <h1 class="d-flex justify-center my-6">{{ props.title }}</h1>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { getNotFoundGif } from '../api/index';
import { ref } from 'vue';
import type { IGifData } from '@/types';

export interface Props {
    title:string
}


const props = withDefaults(defineProps<Props>(), {
    title:'Not found.'
})

let notFoundGif = ref<null | IGifData>(null)
onMounted(async ()=>{
    let res = await getNotFoundGif();
    notFoundGif.value = res as IGifData;
})
</script>
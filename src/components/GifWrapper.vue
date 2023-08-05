<template>
    <v-hover v-slot:default="{ isHovering, props }">
        <div class="gif-item-inner"  v-bind="props">
            <div class="gif-item-content">
                <v-img
                    class="w-100 h-100"
                    aspect-ratio="16/9"
                    cover
                    :src="item.images.original.url"
                    :lazy-src="item.images.fixed_width_small?item.images.fixed_width_small.url:undefined"
                >
                    <template v-slot:placeholder v-if="item.images.fixed_width_small">
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular
                                color="grey-lighten-4"
                                indeterminate
                            ></v-progress-circular>
                        </div>
                    </template>					
                </v-img>
                <div
                    class="v-card--reveal pa-2 align-start"
                    :class="{'v-card--reveal--show':isHovering}"
                >
                    <div class="share-icon" @click.prevent="shareHandler(item)">
                        <v-icon :icon="`mdi-share-variant`"></v-icon>
                    </div>
                </div>
                
            </div>
        </div>
    </v-hover>
</template>
<script setup lang="ts">
import {shareHandler} from "@/helpers/share"
import type { IGifData } from "@/types";
const props = defineProps<{
    item:IGifData
}>()
</script>

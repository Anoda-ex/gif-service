<template>
    <v-slide-group
        class="gifs-slider"
        selected-class="bg-success"
        show-arrows
    >
        <v-slide-group-item
            v-for="item in props.gifs"
            :key="item.id"
        >
                <v-card
                    color="grey-lighten-1"
                    :class="['ma-4']"
                    class="slide-item"
                >
                    <router-link :to="`/gifs/${item.id}`">
                            <GifWrapper :item="item"> </GifWrapper>
                    </router-link>
                </v-card>
        </v-slide-group-item>
    </v-slide-group>
</template>
<script setup lang="ts">
import type { IGifData } from '@/types';
import GifWrapper from './GifWrapper.vue';
const props = defineProps<{
    gifs: IGifData[]
}>()
</script>
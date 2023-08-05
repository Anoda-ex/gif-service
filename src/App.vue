
<template>
  	<RouterView />
	
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { getNotFoundGif } from './api';
</script>

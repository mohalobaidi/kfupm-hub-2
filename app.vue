<script setup lang="ts">
const { data: info } = await useFetch('/api/info')
</script>

<template lang="pug">
h1 Hello, World!
p {{ info }}
</template>

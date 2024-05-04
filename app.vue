<script setup lang="ts">
const { data: info } = await useFetch('/api/info')
const generatedAt = useState(() => new Date().toISOString())
</script>

<template lang="pug">
h1 Hello, World!
p {{ info }}
p {{ generatedAt }}
</template>

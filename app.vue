<script setup lang="ts">
const response = ref('')

fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Accept': 'text/plain',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: [
      {
        role: 'user',
        content: 'SAAY YYEEESS!!'
      }
    ]
  })
}).then(async res => {
  if (!res.body) return
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    const chunk = decoder.decode(value)
    response.value += chunk
    if (done) break
  }
}).catch(() => {
  response.value = 'ERROR'
})
</script>

<template>
<div>{{ response }}</div>
</template>
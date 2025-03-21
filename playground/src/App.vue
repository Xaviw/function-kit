<script lang="ts" setup>
// import { onMounted, useTemplateRef } from 'vue'
// import { canvasPoster } from '../../src/canvas/poster'

// const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

// onMounted(() => {
//   canvasPoster([
//     {
//       type: 'line',
//       begin: [10, 10],
//       end: [80, 80],
//       backgroundColor: '#ff0000',
//       lineWidth: 10,
//       lineDash: [5, 10, 20],
//       lineCap: 'round',
//     },
//     {
//       type: 'line',
//       begin: [100, 100],
//       end: [200, 0],
//       backgroundColor: '#ffff00',
//       lineWidth: 10,
//     },
//   ], {
//     node: canvas.value!,
//     width: 400,
//     height: 400,
//   })
// })
</script>

<template>
  <canvas ref="canvas" />
</template>

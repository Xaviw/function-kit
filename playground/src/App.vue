<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { canvasPoster } from "../../functions/src/canvas/poster"

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  canvasPoster([
    {
      id: 'a',
      type: 'line',
      backgroundColor: '#ff0000',
      lineWidth: 5,
      lineDash: [5, 10, 20],
      lineCap: 'round',
      points: [[0,0],[100,100],[200,0]]
    },
    {
      type: 'line',
      backgroundColor: '#ffff00',
      lineWidth: 10,
      points: [[0,100],[100,0],[200,100]]
    },
    {
      type: 'line',
      id: 'b',
      relativeTo: 'a',
      points: [[0, '50%'], ['100%', '50%']]
    },
    {
      type: 'line',
      relativeTo: 'b',
      points: [['20%', '50%'], ['80%', '50%']],
      backgroundColor: '#00ff00',
      lineWidth: 5,
      lineCap: 'round',
    },
  ], {
    node: canvas.value!,
    width: 400,
    height: 400,
  })
})
</script>

<template>
  <canvas ref="canvas" style="width: 400px;height: 400px;" />
</template>

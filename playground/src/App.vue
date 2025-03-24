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
      relativeTo: 'a',
      points: [[0, '50%'], ['100%', '30%']]
    },
    (ctx) => {
      ctx.restore()
      ctx.beginPath()
      ctx.moveTo(150, 10)
      ctx.lineTo(220, 80)
      ctx.lineTo(150, 80)
      // ctx.closePath()
      ctx.stroke()
    }
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

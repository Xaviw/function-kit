<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { canvasPoster } from "../../functions/src/canvas/poster"

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  canvasPoster([
    {
      id: 'a',
      type: 'line',
      lineColor: '#ff0000',
      lineWidth: 5,
      lineDash: [5, 10, 20],
      lineCap: 'round',
      points: [[0,0],[100,100],[200,0]]
    },
    {
      type: 'line',
      lineColor: '#ffff00',
      lineWidth: 10,
      points: [[0,100],[100,0],[200,100]]
    },
    {
      type: 'line',
      relativeTo: 'b',
      points: [['20%', '50%'], ['80%', '50%']],
      lineColor: '#00ff00',
      lineWidth: 5,
      lineCap: 'round',
      rotate: 90
    },
    {
      id: 'r3',
      relativeTo: 'r2',
      type: 'rect',
      left: '100%',
      top: '100%',
      right: '-50%',
      bottom: '-50%',
      backgroundColor: '#ffff00',
      rotate: 45
    },

    {
      id: 'r1',
      type: 'rect',
      top: 30,
      left: 230,
      width: 100,
      height: 100,
      backgroundColor: '#0000ff',
      borderSize: 5,
      borderColor: '#00ffff',
      borderRadius: 10,
      borderStyle: 'dashed',
      rotate: 45,
    },
    {
      id: 'r2',
      relativeTo: 'r1',
      type: 'rect',
      left: '50%',
      top: '50%',
      width: '50%',
      height: '50%',
      backgroundColor: '#ff00ff',
    },
    {
      type: 'line',
      id: 'b',
      relativeTo: 'a',
      lineDash: [5,5],
      points: [[0, '50%'], ['100%', '50%']]
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

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { CanvasPoster, saveCanvasAsImage } from '../../functions/src/CanvasPoster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(244, 0, 444, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      id: 'a',
      type: 'line',
      points: [
        [244, 50],
        [444, 50],
        [244, 250],
        [444, 250],
      ],
      lineWidth: 5,
      lineColor: gradient,
      lineDash: [10, 10],
      lineDashOffset: 2,
      lineCap: 'round',
      lineJoin: 'round',
      miterLimit: 5,
      rotate: 15,
      shadowBlur: 5,
      shadowColor: '#0000ff33',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
    },
    {
      relativeTo: 'a',
      type: 'line',
      points: [
        [({ containerWidth }) => containerWidth * -0.5, ({ containerHeight }) => containerHeight * 0.5],
        [({ containerWidth }) => containerWidth * 1.5, ({ containerHeight }) => containerHeight * 0.5],
      ],
      lineWidth: 5,
    },
    {
      type: 'line',
      points: [
        [10, 10],
        [80, 10],
        [45, 80],
      ],
      lineWidth: 5,
      closePath: true,
      backgroundColor: '#0000ff33',
    },
  ])
})

function onExport() {
  if (!canvas.value)
    return
  saveCanvasAsImage(canvas.value)
}
</script>

<template>
  <canvas ref="canvas" style="width: 688px;height: 300px;border: 1px solid;" />

  <button style="margin-top: 8px; padding: 6px 12px; background-color: #69c0ff; color: white; border: none; border-radius: 5px; cursor: pointer;" @click="onExport">
    导出
  </button>
</template>

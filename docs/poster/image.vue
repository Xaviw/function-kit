<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { CanvasPoster, saveCanvasAsImage } from '../../functions/src/canvasPoster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(200, 0, 600, 0)
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
      type: 'image',
      src: '/logo.png',
      width: 94,
      height: 150,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      left: ({ containerWidth }) => containerWidth,
      width: 94,
      height: 150,
      flipX: true,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: ({ containerHeight }) => containerHeight,
      width: 94,
      height: 150,
      flipY: true,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: ({ containerHeight }) => containerHeight,
      left: ({ containerWidth }) => containerWidth,
      width: 94,
      height: 150,
      flipX: true,
      flipY: true,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 200,
      width: 94,
      height: 94,
      rotate: 90,
      mode: 'aspectFit',
      border: {
        lineColor: gradient,
        lineDash: [5, 5],
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 315,
      width: 94,
      height: 94,
      rotate: 180,
      mode: 'scaleToFill',
      border: {
        lineColor: gradient,
        lineDash: [5, 5],
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 430,
      width: 94,
      height: 94,
      rotate: 225,
      mode: 'aspectFill',
      border: {
        lineColor: gradient,
        lineDash: [5, 5],
        lineWidth: 5,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 545,
      width: 94,
      height: 94,
      sourceX: 0,
      border: {
        lineColor: gradient,
        lineWidth: 2,
      },
      borderRadius: ({ selfWidth }) => selfWidth,
      sourceY: 640,
      sourceWidth: 1080,
      sourceHeight: 1080,
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

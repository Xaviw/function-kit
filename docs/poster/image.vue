<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { saveCanvasAsImage } from '../../functions/src/canvas/common'
import { canvasPoster } from '../../functions/src/canvas/poster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(200, 0, 600, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')

  canvasPoster([
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
      left: '100%',
      width: 94,
      height: 150,
      flipX: true,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: '100%',
      width: 94,
      height: 150,
      flipY: true,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: '/logo.png',
      top: '100%',
      left: '100%',
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
      borderColor: gradient,
      borderDash: [5, 5],
      borderRadius: '100%',
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
      borderStyle: 'dashed',
      borderSize: 5,
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
      borderColor: gradient,
      borderDash: [5, 5],
      borderRadius: '100%',
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
      borderStyle: 'dashed',
      borderSize: 5,
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
      borderColor: gradient,
      borderDash: [5, 5],
      borderRadius: '100%',
      shadowBlur: 2,
      shadowColor: '#00000066',
      shadowOffsetX: 20,
      shadowOffsetY: 20,
      borderStyle: 'dashed',
      borderSize: 5,
    },
    {
      type: 'image',
      src: '/logo.png',
      top: 103,
      left: 545,
      width: 94,
      height: 94,
      sourceX: 0,
      borderSize: 2,
      borderColor: gradient,
      sourceY: 640,
      sourceWidth: 1080,
      sourceHeight: 1080,
    },
  ], {
    node: canvas.value!,
    width: 688,
    height: 300,
  })
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

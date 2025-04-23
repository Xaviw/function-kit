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
      type: 'rect',
      left: 200,
      right: 200,
      top: 10,
      bottom: 10,
      backgroundColor: gradient,
      border: {
        lineWidth: 5,
        lineDash: [5, 5],
        lineColor: '#0000ff',
      },
      borderRadius: ({ selfWidth }) => selfWidth * 0.5,
      shadowBlur: 5,
      shadowColor: '#0000ff33',
      shadowOffsetX: 10,
      shadowOffsetY: 10,
    },
    {
      relativeTo: 'a',
      type: 'rect',
      left: ({ containerWidth }) => containerWidth * 0.2,
      top: ({ containerHeight }) => containerHeight * 0.2,
      width: ({ containerWidth }) => containerWidth * 0.6,
      height: ({ containerHeight }) => containerHeight * 0.6,
      rotate: 45,
      backgroundColor: '#0000ff',
    },
    // {
    //   type: 'rect',
    //   width: 30,
    //   height: 30,
    //   backgroundColor: '#ff0000',
    // },
    // {
    //   type: 'rect',
    //   width: 30,
    //   height: 30,
    //   right: 0,
    //   backgroundColor: '#ff0000',
    // },
    // {
    //   type: 'rect',
    //   width: 30,
    //   height: 30,
    //   bottom: 0,
    //   backgroundColor: '#ff0000',
    // },
    // {
    //   type: 'rect',
    //   width: 30,
    //   height: 30,
    //   bottom: 0,
    //   right: 0,
    //   backgroundColor: '#ff0000',
    // },
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

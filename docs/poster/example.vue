<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { saveCanvasAsImage } from '../../functions/src/canvas/common'
import { canvasPoster } from '../../functions/src/canvas/poster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 900, 0, 1006)
  gradient.addColorStop(0, '#a55002')
  gradient.addColorStop(1, '#ffb470')

  canvasPoster([
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-bg-long.png',
      width: '100%',
      height: '100%',
    },
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
      top: 47.88,
      left: 47.86,
      height: 31.18,
      mode: 'aspectFit',
    },
    {
      type: 'text',
      content: '姓名',
      top: 236,
      textAlign: 'center',
      fontSize: 44,
      fontWeight: 600,
      color: '#5d4d4a',
    },
    {
      type: 'text',
      content: 'X月X日参加了',
      top: 322,
      textAlign: 'center',
      fontSize: 32,
      color: '#5b4c49',
    },
    {
      type: 'text',
      content: '某某某某某某组织的某某某某某某活动',
      top: 396,
      textAlign: 'center',
      fontSize: 32,
      color: '#5b4c49',
      left: 72,
      right: 72,
      lineHeight: 48,
    },
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-personal1.png',
      bottom: 118,
      left: 67,
      right: 67,
      height: 306,
      mode: 'aspectFit',
    },
    {
      type: 'text',
      content: '- 每步志愿路，都在铸就美好未来 -',
      top: 924,
      textAlign: 'center',
      fontSize: 32,
      color: gradient,
    },
  ], {
    node: canvas.value!,
    width: 620,
    height: 1006,
  })
})

function onExport() {
  if (!canvas.value)
    return
  saveCanvasAsImage(canvas.value)
}
</script>

<template>
  <canvas ref="canvas" style="width: 310px;height: 503px;" />

  <button style="margin-top: 8px; padding: 6px 12px; background-color: #69c0ff; color: white; border: none; border-radius: 5px; cursor: pointer;" @click="onExport">
    导出
  </button>
</template>

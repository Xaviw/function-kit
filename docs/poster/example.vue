<script lang="ts" setup>
import type { PosterText } from '../../functions/types/canvas'
import { onMounted, ref } from 'vue'
import { CanvasPoster, saveCanvasAsImage } from '../../functions/src/CanvasPoster'

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const poster = new CanvasPoster({
    node: '#canvas',
    width: 620,
    height: 1006,
  })

  const gradientText: PosterText = {
    type: 'text',
    content: '- 每步志愿路，都在铸就美好未来 -',
    bottom: 30,
    textAlign: 'center',
    fontSize: 32,
  }

  let nameWidth: number
  let nameHeight: number

  poster.draw([
    async ({ ctx, canvas: node }) => {
      canvas.value = node

      const gradient = ctx.createLinearGradient(0, 900, 0, 1006)
      gradient.addColorStop(0, '#a55002')
      gradient.addColorStop(1, '#ffb470')
      gradientText.color = gradient

      const metrics = await poster.measure({
        content: '姓名',
        fontSize: 44,
        fontWeight: 600,
        color: '#5d4d4a',
      })
      nameWidth = metrics.width
      nameHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    },
    {
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/certificate-bg-long.png',
      width: ({ containerWidth }) => containerWidth - 20,
      height: ({ containerHeight }) => containerHeight - 20,
      top: 10,
      left: 10,
      border: {
        lineColor: '#ffc069',
        lineWidth: 10,
      },
      borderRadius: 40,
    },
    {
      id: 'a',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
      top: 47.88,
      left: 47.86,
      height: 31.18,
    },
    {
      relativeTo: 'a',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/logo.png',
      left: ({ containerWidth }) => containerWidth + 30,
      height: 31.18,
    },
    {
      id: 'b',
      type: 'image',
      src: 'https://cdn-public-test.community-platform.qq.com/applet-public-img/default_avatar.png',
      left: ({ containerWidth }) => (containerWidth - nameWidth - 60 - 20) / 2,
      top: 236,
      height: 60,
      width: 60,
    },
    {
      relativeTo: 'b',
      type: 'text',
      content: '姓名',
      top: ({ containerHeight }) => (containerHeight - nameHeight) / 2,
      left: ({ containerWidth }) => containerWidth + 20,
      fontSize: 44,
      fontWeight: 600,
      color: '#5d4d4a',
      lineHeight: h => h,
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
      mode: 'aspectFit',
    },
    gradientText,
  ])
})

function onExport() {
  if (!canvas.value)
    return
  saveCanvasAsImage(canvas.value)
}
</script>

<template>
  <canvas id="canvas" style="width: 310px;height: 503px;" />

  <button style="margin-top: 8px; padding: 6px 12px; background-color: #69c0ff; color: white; border: none; border-radius: 5px; cursor: pointer;" @click="onExport">
    导出
  </button>
</template>

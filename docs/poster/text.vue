<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { saveCanvasAsImage } from '../../functions/src/canvas/common'
import { canvasPoster } from '../../functions/src/canvas/poster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const Hanalei = new FontFace('Hanalei', 'url(https://fonts.gstatic.font.im/s/hanaleifill/v22/fC1mPYtObGbfyQznIaQzPQi8UAjAhFqtag.woff2)')
document.fonts.add(Hanalei)

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 280, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')

  canvasPoster([
    () => {
      // 放在字体使用前，确保字体加载完成
      return Hanalei.load()
    },
    {
      type: 'text',
      content: '测试 test 1234 !@#$',
      color: gradient,
      fontSize: 22,
      fontStyle: 'italic',
      fontFamily: 'Hanalei',
      letterSpacing: 6,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
      textStyle: 'stroke',
      wordSpacing: 6,
      backgroundColor: '#5cdbd348',
    },
    {
      type: 'text',
      top: 30,
      fontSize: 22,
      content: [
        {
          content: 'textBaseLine: top ',
          textBaseLine: 'top',
        },
        {
          content: 'hanging ',
          textBaseLine: 'hanging',
        },
        {
          content: 'middle ',
          textBaseLine: 'middle',
        },
        {
          content: 'alphabetic ',
          textBaseLine: 'alphabetic',
        },
        {
          content: 'ideographic ',
          textBaseLine: 'ideographic',
        },
        {
          content: 'bottom',
          textBaseLine: 'bottom',
        },
      ],
    },
    {
      type: 'text',
      top: 95,
      fontSize: 22,
      content: [
        {
          content: 'textDecoration: underline',
          textDecoration: 'underline',
          textDecorationProps: {
            lineColor: '#ff0000',
            lineWidth: 5,
            lineDash: [15, 5],
          },
        },
        {
          content: ' line-through ',
          textDecoration: 'line-through',
          textDecorationProps: {
            lineColor: '#00ff00',
          },
        },
        {
          content: 'overline',
          textDecoration: 'overline',
          textDecorationProps: {
            lineColor: '#0000ff',
          },
        },
      ],
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'textAlign: left',
      textAlign: 'left',
      backgroundColor: '#ff000044',
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'center',
      textAlign: 'center',
      backgroundColor: '#00ff0044',
    },
    {
      type: 'text',
      top: 145,
      fontSize: 22,
      content: 'right',
      textAlign: 'right',
      backgroundColor: '#0000ff44',
    },
    {
      id: 'a',
      type: 'text',
      fontSize: 22,
      top: 190,
      width: 220,
      content: '内容超出指定行数后省略显示，内容超出指定行数后省略显示，内容超出指定行数后省略显示',
      lineClamp: 3,
    },
    {
      relativeTo: 'a',
      type: 'text',
      fontSize: 22,
      fontFamily: 'Hanalei Fill',
      left: '120%',
      width: 220,
      content: '自定义超出省略内容，自定义超出省略内容，自定义超出省略内容，自定义超出省略内容',
      lineClamp: 3,
      ellipsisContent: '~~~',
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

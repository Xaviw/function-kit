<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { CanvasPoster, saveCanvasAsImage } from '../../functions/src/canvasPoster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 280, 0)
  gradient.addColorStop(0, '#cf1322')
  gradient.addColorStop(1, '#389e0d')
  const poster = new CanvasPoster({
    node: canvas.value!,
    width: 688,
    height: 300,
  })

  poster.draw([
    {
      type: 'text',
      content: [
        {
          content: '测试字体 ！，。',
          fontFamily: 'ZCOOL KuaiLe',
          fontFamilySrc: 'https://fonts.gstatic.com/s/zcoolkuaile/v19/tssqApdaRQokwFjFJjvM6h2Wo-Tpo2MpsrpYU3EJjXfOiTrBdUtGm0PGsPHkbHZzpr3G.116.woff2',
        },
        {
          content: 'FontFamily 123 !,.',
          fontFamily: 'Underdog',
          fontFamilySrc: 'https://gstatic.loli.net/s/underdog/v23/CHygV-jCElj7diMroWSlWV8.woff2',
        },
      ],
      color: gradient,
      fontSize: 26,
      fontStyle: 'italic',
      letterSpacing: 6,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
      textStyle: 'stroke',
      wordSpacing: 6,
      backgroundColor: '#5cdbd348',
      lineHeight: h => h,
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
            lineWidth: 5,
          },
        },
        {
          content: 'overline',
          textDecoration: 'overline',
          textDecorationProps: {
            lineColor: '#0000ff',
            lineWidth: 5,
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
      left: ({ containerWidth }) => containerWidth * 1.2,
      width: 220,
      content: '自定义超出省略内容，自定义超出省略内容，自定义超出省略内容，自定义超出省略内容',
      lineClamp: 3,
      ellipsisContent: '~~~',
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

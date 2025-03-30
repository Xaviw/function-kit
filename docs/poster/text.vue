<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { canvasPoster } from '../../functions/src/canvas/poster'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
  const ctx = canvas.value!.getContext('2d')
  const gradient = ctx!.createLinearGradient(0, 0, 300, 0)
  gradient.addColorStop(0, '#ff0000')
  gradient.addColorStop(1, '#00ff00')

  canvasPoster([
    {
      type: 'text',
      content: '测试 test 1234 !@#$',
      color: gradient,
      fontSize: 22,
      fontStyle: 'italic',
      fontWeight: 'bold',
      letterSpacing: 6,
      shadowBlur: 2,
      shadowColor: '#00000033',
      shadowOffsetX: 6,
      shadowOffsetY: 6,
      textDecoration: 'underline',
      textStyle: 'stroke',
      wordSpacing: 6,
      backgroundColor: '#b5f5ecee',
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
      top: 100,
      fontSize: 22,
      content: [
        {
          content: 'textDecoration: underline',
          textDecoration: 'underline',
          textDecorationProps: {
            lineColor: '#ff0000',
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
            lineDash: [15, 5],
          },
        },
      ],
    },
    {
      type: 'text',
      top: 150,
      fontSize: 22,
      content: 'textAlign: left',
      textAlign: 'left',
    },
    {
      type: 'text',
      top: 150,
      fontSize: 22,
      content: 'textAlign: center',
      textAlign: 'center',
    },
    {
      type: 'text',
      top: 150,
      fontSize: 22,
      content: 'textAlign: right',
      textAlign: 'right',
    },
    {
      id: 'a',
      type: 'text',
      fontSize: 22,
      top: 200,
      width: 220,
      content: '内容超出指定行数后省略显示，内容超出指定行数后省略显示，内容超出指定行数后省略显示',
      lineClamp: 3,
    },
    {
      relativeTo: 'a',
      type: 'text',
      fontSize: 22,
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
</script>

<template>
  <canvas ref="canvas" style="width: 688px;height: 300px;border: 1px solid;" />
</template>

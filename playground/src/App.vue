<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue'
import { canvasPoster } from '../../functions/src/canvas/poster'

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
      points: [[0, 0], [100, 100], [200, 0]],
    },
    {
      type: 'line',
      lineColor: '#ffff00',
      lineWidth: 10,
      points: [[0, 100], [100, 0], [200, 100]],
    },
    {
      type: 'line',
      relativeTo: 'b',
      points: [['20%', '50%'], ['80%', '50%']],
      lineColor: '#00ff00',
      lineWidth: 5,
      lineCap: 'round',
      rotate: 90,
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
      rotate: 45,
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
      lineDash: [5, 5],
      points: [[0, '50%'], ['100%', '50%']],
    },
    {
      type: 'image',
      top: 200,
      left: 20,
      width: 100,
      height: 140,
      src: '/avatar.png',
      borderSize: 5,
      borderColor: '#00ffff',
      borderRadius: 30,
      borderStyle: 'dashed',
      rotate: 45,
      mode: 'aspectFill',
      sourceX: 0,
      sourceY: 0,
      sourceWidth: '50%',
      sourceHeight: '50%',
      flipX: true,
      flipY: true,
    },
    {
      id: 't1',
      type: 'text',
      top: 200,
      left: 170,
      // width: 80,
      // height: 80,
      // rotate: 30,
      content: [
        {
          content: '一段测试文本一段测试文本一段测试文本一段测试文本',
          color: '#ff0000',
          fontWeight: 'bold',
          textStyle: 'stroke',
          fontSize: 20,
          strokeProps: { lineWidth: 1, lineDash: [4, 1] },
          letterSpacing: 5,
          shadowColor: '#00000066',
          shadowBlur: 5,
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          textBaseLine: 'top',
          lineHeight: '150%',
          textDecoration: 'line-through',
        },
        {
          content: 'this is a test text',
          fontSize: 12,
          fontStyle: 'italic',
          textBaseLine: 'bottom',
          lineHeight: '100%',
          textDecoration: 'underline',
          fontWeight: 'bold',
          letterSpacing: 3,
          wordSpacing: 10,
          textDecorationProps: { lineColor: '#ff0000', lineWidth: 2 },
        },
        {
          content: '1234567890!@#$%^&*()1234567890!@#$%^&*()',
          color: '#0000ff',
          fontSize: 16,
          textDecoration: 'overline',
          textBaseLine: 'middle',
        },
      ],
      textAlign: 'center',
      lineClamp: 3,
    },
    {
      type: 'rect',
      relativeTo: 't1',
      left: -20,
      top: -20,
      right: 20,
      bottom: 20,
      borderSize: 2,
      borderStyle: 'dashed',
    },
    // (ctx) => {
    //   ctx.font = 'italic 32px sans-serif'
    //   ctx.textBaseline = 'top'
    //   console.log(ctx.measureText('测试'))
    // },
  ], {
    node: canvas.value!,
    width: 400,
    height: 400,
  })
})
</script>

<template>
  <canvas ref="canvas" style="width: 400px;height: 400px;border: 2px solid #000000;" />

  <div style="line-height: 1;">
    <span style="font-size: 16px;line-height: 20px;">这是一行文字</span>
    <span style="font-size: 34px; line-height: 50px;vertical-align: bottom;">行高不同</span>
    <span style="font-size: 12px;">对齐测试</span>
  </div>
  <div>这是一行文字</div>
</template>

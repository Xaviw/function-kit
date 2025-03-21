// import type { CanvasElementRenderFnOptions, CanvasLineElement } from '../../types/canvas'
// import { isArray, isNumber } from '../is'

// /**
//  * 绘制 Canvas 线条
//  * @web
//  * @miniprogram
//  */
// export function renderLine(renderOptions: CanvasLineElement, contextOptions: CanvasElementRenderFnOptions): void {
//   const {
//     begin,
//     end,
//     lineWidth,
//     lineDash,
//     lineDashOffset,
//     lineCap,
//     lineJoin,
//     miterLimit,
//     backgroundColor,
//   } = renderOptions

//   const x1 = Number.parseFloat(begin?.[0] as any)
//   const y1 = Number.parseFloat(begin?.[1] as any)
//   const x2 = Number.parseFloat(end?.[0] as any)
//   const y2 = Number.parseFloat(end?.[1] as any)

//   if ([x1, y1, x2, y2].every(Number.isNaN)) {
//     console.warn(`请检查配置：${renderOptions}`)
//     return
//   }

//   const { ctx } = contextOptions

//   if (isNumber(lineWidth))
//     ctx.lineWidth = lineWidth

//   if (isArray(lineDash) && lineDash.every(isNumber))
//     ctx.setLineDash(lineDash)

//   if (isNumber(lineDashOffset))
//     ctx.lineDashOffset = lineDashOffset

//   if (lineCap && ['butt', 'round', 'square'].includes(lineCap))
//     ctx.lineCap = lineCap

//   if (lineJoin && ['round', 'bevel', 'miter'].includes(lineJoin))
//     ctx.lineJoin = lineJoin

//   if (isNumber(miterLimit))
//     ctx.miterLimit = miterLimit

//   if (backgroundColor)
//     ctx.strokeStyle = backgroundColor

//   ctx.beginPath()
//   ctx.moveTo(x1, y1)
//   ctx.lineTo(x2, y2)
//   ctx.stroke()
//   ctx.closePath()
// }

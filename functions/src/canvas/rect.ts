// import type { CanvasElementRenderFnOptions, CanvasRectElement } from '../../types/canvas'
// import { isNil } from '../is'

// /**
//  * 绘制 Canvas 矩形
//  * @web
//  * @miniprogram
//  */
// export function renderRect(renderOptions: CanvasRectElement, contextOptions: CanvasElementRenderFnOptions): void {
//   let {
//     width,
//     height,
//     backgroundColor,
//     // borderSize,
//     // borderStyle,
//     // borderColor,
//     // borderRadius,
//     top,
//     right,
//     bottom,
//     left,
//     // id,
//     // relativeTo,
//     // rotate,
//     shadowBlur,
//     shadowColor,
//     shadowOffsetX,
//     shadowOffsetY,
//   } = renderOptions

//   const { canvas, ctx, width: canvasWidth, height: canvasHeight } = contextOptions

//   const x = isNil(left) ? (canvasWidth - Number.parseFloat(right as any)) : Number.parseFloat(left as any)
//   const y = isNil(top) ? (canvasWidth - Number.parseFloat(bottom as any)) : Number.parseFloat(top as any)
//   width = Number.parseFloat(width as any)
//   height = Number.parseFloat(height as any)
//   if ([x, y, width, height].every(Number.isNaN)) {
//     console.warn(`请检查配置：${renderOptions}`)
//     return
//   }

//   if (backgroundColor)
//     ctx.fillStyle = backgroundColor

//   if (shadowColor) {
//     ctx.shadowColor = shadowColor
//     ctx.shadowBlur = shadowBlur || 0
//     ctx.shadowOffsetX = shadowOffsetX || 0
//     ctx.shadowOffsetY = shadowOffsetY || 0
//   }
// }

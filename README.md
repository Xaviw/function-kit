# 函数工具库

> 零依赖，支持 WEB、小程序、Node 三端条件编译

TypeScript、Vitest、Rollup

## 项目结构

```sh
├── src              # 函数入口文件（构建时只会以 src 目录下 ts 文件作为入口）
├── types            # 类型声明
├── test             # 函数单元测试
├── dist             # 构建输出目录
├── scripts          # 构建脚本
├── vitest.config.ts # vitest 配置
├── tsconfig.json    # typescript 配置
├── eslint.config.js # 代码格式化配置
└── xxx              # src 下的代码可以根据需要拆分到其他位置
```

## 常用命令

```sh
# 交互式手动选择构建范围
pnpm build

# 构建支持 web 环境的函数
pnpm build:web

# 构建支持小程序环境的函数
pnpm build:miniprogram

# 构建支持 node 环境的函数
pnpm build:node

# 执行测试
pnpm test

# 代码格式化检查及自动修复
pnpm lint

# 更快的删除 node_modules 文件夹
pnpm clean

# 交互式升级项目依赖
pnpm taze
```

## 贡献指南

新建 `src/example.ts` 文件，写入工具函数代码，并导出

```ts
/**
 * 示例
 * @web
 * @miniprogram
 * @node
 */
export function example(): string {
  if (PLATFORM === 'web') {
    // build:web 时仅会保留这一行
    return 'is web'
  }
  else if (PLATFORM === 'miniprogram') {
    // build:miniprogram 时仅会保留这一行
    return 'is miniprogram'
  }
  else if (PLATFORM === 'node') {
    // build:node 时仅会保留这一行
    return 'is node'
  }
  // 为了让函数满足显式定义的返回值类型
  return ''
}
```

对导出的函数添加 JSDoc 说明，`@web`、`@miniprogram`、`@node` 注解分别代表该函数支持 web 环境、小程序环境、node 环境，执行构建命令时，只有支持对应环境的函数会被构建，需要按实际情况添加注解。**（没有任何平台注解时，相当于支持所有平台）**

`PLATFORM` 为全局变量，值与注解一致，用于条件编译

**函数需要显式书写返回值类型**，可以提高类型解析速度，另外避免条件编译代码导致的类型自动推断不正确

在条件编译中为了让函数返回值符合显式书写的返回值类型，可以添加符合类型的默认返回值

函数在不同平台中的类型定义差别较大时，可以采用以下方法：

```ts
function webExample(): string {
  return 'is web'
}
function miniprogramExample(): string {
  return 'is miniprogram'
}
function nodeExample(): string {
  return 'is node'
}
/**
 * 示例
 * @web
 * @miniprogram
 * @node
 */
export const example = PLATFORM === 'web'
  ? webExample
  : PLATFORM === 'miniprogram'
    ? miniprogramExample
    : nodeExample
```

实用的类型定义可以在函数入口文件中进行导出，便于使用 ts 的用户从入口声明文件中导入使用：

```ts
export type * from '../types/xxx'
// 或者
export type { xxx } from '../types/xxx'
```

**编译时会默认导出 `types/common.d.ts` 文件中的全部内容，函数入口中无需重复导出**

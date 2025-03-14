# 函数工具库

> 零依赖，支持 WEB、小程序、Node 三端条件编译

TypeScript、Vitest、Rollup、Typedoc、Vitepress

## 项目结构

```sh
├── src              # 函数入口文件（构建时只会以 src 目录下 ts 文件作为入口）
├── types            # 类型声明
├── test             # 函数单元测试
├── dist             # 构建输出目录
├── docs             # 文档目录
|  └── dist          # 文档构建输出目录
├── scripts          # 构建脚本
├── vitest.config.ts # vitest 配置
├── tsconfig.json    # typescript 配置
├── typedoc.json     # typedoc 配置
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

# 生成文档（docs/src）
pnpm docs:generate

# 运行文档
pnpm docs:dev

# 构建文档
pnpm docs:build

# 预览文档构建产物
pnpm docs:preview

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

> **构建时会忽略默认导出，请全部使用具名导出**

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

对导出的函数添加 [TSDoc](https://tsdoc.org/) 说明，便于 typedoc 生成文档；`@web`、`@miniprogram`、`@node` 注解分别代表该函数支持 web 环境、小程序环境、node 环境，执行构建命令时，只有支持对应环境的函数会被构建，需要按实际情况添加注解。**（没有任何平台注解时，相当于支持所有平台）**

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

src 目录下文件中的类型导出也会在编译后被导出，同时**编译会默认导出 `types/common.d.ts` 文件中的全部内容**，实用的类型定义可以直接添加到该文件中，或从该文件中导出，便于使用 ts 的用户从入口声明文件中导入使用：

函数入口文件中导出类型：

```ts
// src/xxx.ts
export type X = 'x'

export interface Y {
  y: 'y'
}
```

common.d.ts 文件中导出类型：

```ts
// types/common.d.ts

// 直接写在文件中
export type X = 'X'
export interface Y {
  y: 'y'
}

// 或者在文件中导出
export type * from './xxx'
```

函数完成后，执行 `pnpm docs:generate` 重新生成文档

## 动态编译原理

构建时首先会读取 src 目录下全部 ts 文件中的导出声明，通过判断 TSDoc 注解进行过滤后，创建如下格式的构建入口文件：

```ts
// 假设 src/xxx 文件中还有不支持目标平台的导出`d`，构建时`d`会被过滤
export { a, b, c } from 'src/xxx'

export type * from 'types/common'
```

rollup 根据入口文件的依赖关系获取到全部需要构建的文件后，在这些文件开头注入 PLATFORM 常量，根据 PLATFORM 常量创建的分支会自动被 rollup 进行树摇优化

基于这样的原理，开发时需要注意：

- 假设 `src/a.ts` 文件中的函数 `a` 引入了，`noneSrc/b.ts` 文件中的函数 `b` 时，需要确保函数 `b` 支持的平台与函数 `a` 一致，非 src 目录下的代码不会进行 TSDoc 平台注解校验
- 假设 `src/a.ts` 文件中通过 `export * from 'noneSrc/b.ts'` 语句进行导出，构建结果不会包含 `noneSrc/b.ts` 文件中的任何导出（类型声明可以导出见后文）

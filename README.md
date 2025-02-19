# 函数工具库

> 零依赖，支持 WEB、小程序、Node 三端条件编译

## 贡献指南

### 开发设置

使用 VSCode 进行开发，并安装推荐的插件（ESLint、Code Spell Checker）

使用 Node18+、PNPM、TypeScript

### 项目结构

```sh
dist       # 构建输出目录
src        # 函数源代码
test       # 函数单元测试代码
types.d.ts # 全局类型声明
```

### 常用命令

```sh
# 构建支持 web 环境的函数
pnpm build:web

# 构建支持小程序环境的函数
pnpm build:miniprogram

# 构建支持 node 环境的函数
pnpm build:node

# 代码格式化检查及自动修复
pnpm lint

# 更快的删除 node_modules 文件夹
pnpm clean

# 交互式升级项目依赖
pnpm taze
```

### 示例

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

新建 `src/example.ts` 文件，写入工具函数代码，并**具名导出**（自定义插件实现的条件编译未处理默认导出和同时导出多个）

对导出的函数添加 JSDoc 说明，`@web`、`@miniprogram`、`@node` 注解分别代表该函数支持 web 环境、小程序环境、node 环境，按实际情况添加注解

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

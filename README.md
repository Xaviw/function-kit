# 前端工具库

[PNPM Monorepo](https://pnpm.io/zh/workspaces) + Typescript

工作空间下项目的详细说明请查看对应目录下 README

## 待办

- [ ] 图片压缩、修改尺寸方法

## 项目结构

```sh
├── functions        # 函数库
├── docs             # 函数库文档
├── eslint.config.js # 全局代码格式化配置
└── tsconfig.json    # 公共 TS 配置
```

## 常用命令

运行具体项目中的命令需要先 cd 到对应目录再执行，或使用 `pnpm -F 项目名 项目命令`

本工作空间包括项目：

- @function-kit/functions
- @function-kit/docs

全局命令包括：

```sh
# 全局代码格式化检查及自动修复
pnpm lint

# 更快的全局删除 node_modules、dist 文件夹
pnpm clean

# 交互式升级项目依赖
pnpm taze
```

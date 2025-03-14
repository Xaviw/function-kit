import { defineConfig } from 'vitepress'
import { description, name } from '../../package.json'
import typedocSidebar from '../src/typedoc-sidebar.json'

export default defineConfig({
  title: name,
  description,
  lang: 'zh-cn',
  srcDir: './src',
  outDir: './dist',
  lastUpdated: true,
  themeConfig: {
    sidebar: [
      {
        text: '目录',
        items: typedocSidebar,
      },
    ],
    outline: {
      level: 2,
      label: '大纲',
    },
    lastUpdated: {
      text: '上次更新',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
  },
})

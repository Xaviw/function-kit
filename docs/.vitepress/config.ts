import { defineConfig } from 'vitepress'
import typedocSidebar from '../src/typedoc-sidebar.json'

export default defineConfig({
  lang: 'zh-cn',
  srcDir: './src',
  outDir: './dist',
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: '全部函数', link: '/src' }],
    sidebar: [
      {
        text: '全部函数',
        items: typedocSidebar,
      },
    ],
    outline: {
      level: 'deep',
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

import { defineConfig } from 'vitepress'
import { description, name } from '../../package.json'
import typedocSidebar from '../typedoc/typedoc-sidebar.json'

export default defineConfig({
  title: name,
  description,
  lang: 'zh-cn',
  outDir: './dist',
  lastUpdated: true,
  themeConfig: {
    nav: [
      {
        text: 'API 文档',
        link: '/typedoc/',
        activeMatch: '/typedoc/',
      },
      {
        text: 'Canvas 海报',
        link: '/poster/',
        activeMatch: '/poster/',
      },
    ],
    sidebar: {
      '/typedoc/': [
        {
          text: 'API 文档',
          items: typedocSidebar,
          base: '/typedoc/',
        },
      ],
      '/poster/': [
        {
          text: 'Canvas 海报',
          link: '/poster',
        },
      ],
    },
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
  vite: {
    define: {
      PLATFORM: JSON.stringify('web'),
    },
  },
})

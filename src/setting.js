export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 是否默认开启页面切换动画
  transition: {
    active: false
  },
  // 侧边栏配置
  menu: {
    // 侧边栏默认折叠状态
    asideCollapse: false,
    // 侧边栏折叠动画
    asideTransition: false,
    // 访问历史收藏数
    historyCount: 15
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: '经典',
        name: 'careyshop',
        preview: 'image/theme/careyshop/preview@2x.png'
      },
      {
        title: '简洁',
        name: 'concise',
        preview: 'image/theme/concise/preview@2x.png'
      },
      {
        title: '线条',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      {
        title: '海岸',
        name: 'coastal',
        backgroundImage: 'image/theme/coastal/bg.jpg',
        preview: 'image/theme/coastal/preview@2x.png'
      },
      {
        title: '小镇',
        name: 'town',
        backgroundImage: 'image/theme/town/bg.jpg',
        preview: 'image/theme/town/preview@2x.png'
      },
      {
        title: '星空',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      }
    ],
    // 默认主题
    default: 'careyshop'
  }
}

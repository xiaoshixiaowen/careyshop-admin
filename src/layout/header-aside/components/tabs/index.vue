<template>
  <div class="cs-multiple-page-control-group" flex>
    <div class="cs-multiple-page-control-content" flex-box="1">
      <div class="cs-multiple-page-control-content-inner">
        <cs-contextmenu
          :visible.sync="contextmenuFlag"
          :x="contentmenuX"
          :y="contentmenuY">
          <cs-contextmenu-list
            :menulist="tagName === '/index' ? contextmenuListIndex : contextmenuList"
            @row-click="contextmenuClick"/>
        </cs-contextmenu>
        <el-tabs
          class="cs-multiple-page-control cs-multiple-page-sort"
          :value="current"
          type="card"
          @tab-click="handleClick"
          @tab-remove="handleTabRemove"
          @contextmenu.native="handleContextmenu">
          <el-tab-pane
            v-for="page in opened"
            :key="page.fullPath"
            :label="page.meta.title || '未命名'"
            :name="page.fullPath"
            :closable="isTabClosable(page)"/>
        </el-tabs>
      </div>
    </div>
    <div class="cs-multiple-page-control-btn" flex-box="0">
      <el-dropdown
        size="default"
        split-button
        :show-timeout="50"
        @click="closeAll"
        @command="command => handleControlItemClick(command)">
        <i class="el-icon-circle-close" style="font-size: 13px;"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="refresh" icon="el-icon-refresh">刷新页面</el-dropdown-item>
          <el-dropdown-item command="left" icon="el-icon-d-arrow-left">关闭左侧</el-dropdown-item>
          <el-dropdown-item command="right" icon="el-icon-d-arrow-right">关闭右侧</el-dropdown-item>
          <el-dropdown-item command="other" icon="el-icon-close">关闭其它</el-dropdown-item>
          <el-dropdown-item command="all" icon="el-icon-circle-close">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sortable from 'sortablejs'

export default {
  components: {
    CsContextmenu: () => import('../contextmenu'),
    CsContextmenuList: () => import('../contextmenu/components/contentmenuList')
  },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: 'el-icon-refresh', title: '刷新页面', value: 'refresh' },
        { icon: 'el-icon-circle-close', title: '关闭全部', value: 'all' }
      ],
      contextmenuList: [
        { icon: 'el-icon-refresh', title: '刷新页面', value: 'refresh' },
        { icon: 'el-icon-d-arrow-left', title: '关闭左侧', value: 'left' },
        { icon: 'el-icon-d-arrow-right', title: '关闭右侧', value: 'right' },
        { icon: 'el-icon-close', title: '关闭其它', value: 'other' },
        { icon: 'el-icon-circle-close', title: '关闭全部', value: 'all' }
      ],
      tagName: '/index'
    }
  },
  computed: {
    ...mapState('careyshop/page', [
      'opened',
      'current'
    ])
  },
  mounted() {
    const el = document.querySelectorAll('.cs-multiple-page-sort .el-tabs__nav')[0]
    Sortable.create(el, {
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        this.openedSort({ oldIndex, newIndex })
      }
    })
  },
  methods: {
    ...mapActions('careyshop/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll',
      'openedSort'
    ]),
    /**
     * @description 计算某个标签页是否可关闭
     * @param {Object} page 其中一个标签页
     */
    isTabClosable(page) {
      return page.name !== 'index'
    },
    /**
     * @description 右键菜单功能点击
     * @param {Object} event 事件
     */
    handleContextmenu(event) {
      let target = event.target
      let flag = false

      if (target.className.indexOf('el-tabs__item') > -1) {
        flag = true
      } else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }

      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的 row-click 事件
     * @param {String} command 事件类型
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     * @param {String} command 事件类型
     * @param {String} tagName tab 名称
     */
    handleControlItemClick(command, tagName = null) {
      if (tagName) {
        this.contextmenuFlag = false
      }

      const params = { pageSelect: tagName }
      switch (command) {
        case 'refresh':
          this.$router.push({ name: 'refresh' })
          break
        case 'left':
          this.closeLeft(params)
          break
        case 'right':
          this.closeRight(params)
          break
        case 'other':
          this.closeOther(params)
          break
        case 'all':
          this.closeAll()
          break
        default:
          this.$message.error('无效的操作')
          break
      }
    },
    /**
     * @description 接收点击 tab 标签的事件
     * @param {object} tab 标签
     * @param {object} event 事件
     */
    handleClick(tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里
     * @param {String} tagName tab 名称
     */
    handleTabRemove(tagName) {
      this.close({ tagName })
    }
  }
}
</script>

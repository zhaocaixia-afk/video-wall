<template>
  <el-container class="main">
    <el-header style="height:30px">
      <main-header></main-header>
    </el-header>
    <el-container class="inner-container">
      <el-aside width="260px">
        <el-input placeholder="输入车辆、公厕、中转站名称搜索" v-model="filterText"> </el-input>
        <el-tree
          class="filter-tree"
          ref="tree"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          node-key="id"
          :default-expanded-keys="[1, 2, 3, 6]"
        ></el-tree>
      </el-aside>
      <el-main>
        <li class="video-item" v-for="(item, index) in temList" :key="index" :class="{ active1: index === active1 }" @click="itemClick(item.id)">
          <header class="close">
            <p>{{ item.labelName }}-{{ item.type }}</p>
            <img class="closeImg" @click="close(index, item.id)" src="~assets/img/video_icon_close.png" alt="" />
          </header>
          <div class="red">
            <video autoplay src="~assets/video/a.mp4"></video>
            <div class="imgList">
              <img src="~assets/img/viwall_bt_screenshot.png" alt="" />
              <img src="~assets/img/viwall_bt_stop.png" alt="" />
              <img src="~assets/img/viwall_bt_voice.png" alt="" />
              <img src="~assets/img/viwall_bt_fullscreen.png" alt="" />
            </div>
          </div>
        </li>
        <li class="video-item" v-for="(noItem, noIndex) in noTemList" :key="'no2' + noIndex">
          <header>暂无数据</header>
          <div class="red">
            <img class="play" src="~assets/img/video_pic_default.png" alt="" />
          </div>
        </li>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from './child/MainHeader'
import { getMenu } from '../../api/main'

export default {
  name: 'Main',
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      temList: [],
      tihuan: 0,
      active: 0
    }
  },
  created() {
    this._getMenu()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    noTemList() {
      return 9 - this.temList.length
    },
    active1() {
      return this.temList.findIndex(item => item.id === this.active)
    }
  },
  methods: {
    async _getMenu() {
      const res = await getMenu()
      if (res.code === 0) {
        this.data = res.data
      }
    },
    // 点击侧边栏
    handleNodeClick(data, node) {
      // 判断点击的项,是否是要加入的项
      // if(倒数第二级)else(最后一级)
      if (data.children) {
        // 展开操作才执行添加到数组操作
        if (node.expanded) {
          // 第一个for循环,判断是不是倒数第二级菜单
          var list = data.children
          var num = 0
          for (let i = 0; i < list.length; i++) {
            if (list[i].children) {
              num = num + 1
            }
          }
          // num为0时,为二级菜单加入数组显示(判断数组中是否已经存在)
          if (!num) {
            // 第一个for是组织为一个个obj,添加到temList中
            const labelName = data.label
            for (let i = 0; i < data.children.length; i++) {
              var obj = {}
              obj['labelName'] = labelName
              obj['type'] = data.children[i].label
              obj['id'] = data.children[i].id
              obj['video'] = data.children[i].video
              // 如何数组中存在就不再添加
              this.unquie(obj)
            }
          }
        }
      } else {
        var obj2 = {}
        obj2['labelName'] = node.parent.data.label
        obj2['type'] = data.label
        obj2['id'] = data.id
        obj2['video'] = data.video
        this.unquie(obj2)
      }
    },
    // 数组中存在就不重复添加
    unquie(obj) {
      var flag = false
      this.temList.forEach(item => {
        if (obj['id'] === item.id) {
          flag = true
          this.active = item.id
        }
      })
      // 数组中没有
      if (!flag) {
        // 数组长度
        if (this.temList.length === 9) {
          this.temList.splice(this.tihuan, 1, obj)
          // 加入进来的为激活样式,同时插入的地方要后移
          this.tihuan = this.tihuan + 1
          this.active = obj.id
        } else {
          this.temList.push(obj)
          this.active = obj.id
        }
      }
    },
    // 点击关闭按钮
    close(index) {
      this.temList.splice(index, 1)
    },
    // 点击
    itemClick(id) {
      this.active = id
    },
    // 输入框过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  components: {
    MainHeader
  }
}
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
  .el-header {
    background-color: rgb(47, 57, 69);
    color: white;
    line-height: 30px;
  }
  .inner-container {
    height: calc(100vh - 30px);
    .el-aside {
      background-color: white;
      color: #333;
      padding: 10px 10px 0;
    }
    .el-main {
      background-color: rgb(47, 57, 69);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .video-item {
        width: 33.26%;
        height: calc((100vh - 30px) / 3);
        position: relative;
        header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(23, 36, 46, 0.7);
          font-size: 10px;
          color: white;
          padding: 5px 10px;
          &.close {
            display: flex;
            justify-content: space-between;
            z-index: 10;
            .closeImg {
              width: 12px;
              height: 12px;
              cursor: pointer;
            }
          }
        }
        .red {
          width: 100%;
          height: 100%;
          video {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
          .play {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .imgList {
            width: 100%;
            height: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: right;
            img {
              margin: 0 2px;
              width: 10px;
              height: 10px;
            }
          }
        }
        &.active1 {
          border: 1px solid red;
        }
      }
    }
  }
}
</style>

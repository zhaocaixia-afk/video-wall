<template>
  <div class="main-header">
    <div class="logo">
      <img src="~assets/img/logo.png" alt="" />
      <h1>视频监控中心</h1>
    </div>
    <div class="options">
      <p class="img">
        <i class="el-icon-s-operation"></i>
      </p>
      <p class="img">
        <i class="el-icon-bell"></i>
      </p>
      <div class="user">
        <i class="el-icon-s-custom"></i>
        <p class="address">南京南路</p>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>

<style scoped lang="scss">
.main-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  .logo {
    display: flex;
    align-content: center;
    img {
      width: 30px;
      height: 30px;
    }
    h1 {
      display: inline-block;
      font-size: 16px;
    }
  }
  .options {
    display: flex;
    .img {
      border-right: 1px solid #eee;
      padding: 0 10px;
    }
    .user {
      padding-left: 10px;
      display: flex;
      align-items: center;
      .address {
        font-size: 10px;
        width: 46px;
        margin: 0 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

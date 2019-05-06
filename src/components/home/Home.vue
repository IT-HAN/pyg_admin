<template>
  <el-container  class="home_container">
<!--  头部    -->
      <el-header  class="home_header">
          <el-button icon="iconfont icon-caidan" size="mini" circle @click="toggleMenu()"></el-button>
          <span class="title">品优购后台管理系统</span>
          <el-button class="logout" type="danger" size="mini" round  @click="logout()">退出</el-button>
      </el-header>
      <el-container>
<!--  侧边栏 -->
          <el-aside :width="collapse? '65px':'180px'" class="home_aside">
              <el-menu
                  :default-active="$router.name"
                  router
                  :unique-opened="true"
                  :collapse="collapse"
                  :collapse-transition="false"
                  style="border: none; margin-top: 5px"
                  background-color="#333744"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu :index="item.id.toString()" v-for = "(item, i) in menus" :key="item.id">
                      <template slot="title">
                          <i :class="['iconfont',iconArr[i]]"></i>
                          <span>{{item.authName}}</span>
                      </template>
                      <el-menu-item :index="'/'+lastItem.path" v-for="lastItem in item.children">
                          <i class="el-icon-menu"></i>
                          <span>{{lastItem.authName}}</span>
                      </el-menu-item>
                  </el-submenu>
              </el-menu>
          </el-aside>
<!--  主要内容部分      -->
          <el-main class="home_main">
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      menus: [],
      iconArr: ['icon-account-pin-box-line', 'icon-caidan-tianchong', 'icon-huabanfuben', 'icon-ico-', 'icon-caidan']
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    async getData () {
      // this.$http.get('menus').then(res => console.log(res))
      const {data: {data, meta}} = await this.$http.get('menus')
      // 如果失败
      if (meta.status !== 200) return this.$message.error('获取菜单失败')
      // 如果成功
      this.menus = data
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .home_container{
    height: 100%;
  }
  .home_header{
    line-height: 60px;
    background: #373D41;
  }
  .home_header span{
    margin-left: 20px;
  }
  .logout{
    float: right;
    margin-top: 20px;
  }
/*  头部样式 */
  .home_aside{
    background: #333744;;
  }
/* 侧边栏样式 */
  .home_main{
    background: #F5F5F5;
  }
/* 主体内容样式 */
</style>

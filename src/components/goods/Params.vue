<template>
   <div class="params_container">
<!--  面包屑   -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>商品管理</el-breadcrumb-item>
           <el-breadcrumb-item>分类参数</el-breadcrumb-item>
       </el-breadcrumb>
<!--   卡片  -->
      <el-card>
          <!--  文字提示      -->
          <el-alert
              title="警告提示的文案"
              type="warning"
              show-icon>
          </el-alert>
          <!--   表单     -->
          <el-form  style="margin: 15px 0px;">
              <el-form-item  label="活动名称">
                  <el-cascader
                      expand-trigger="hover"
                      :options="categoryList"
                      v-model="categoryValue"
                      @change="handleChange">
                  </el-cascader>
              </el-form-item>
          </el-form>
          <!--     tabs标签页     -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="动态参数" name="many">
                  <el-button  type="success"  plain  :disabled="disabled">添加动态参数</el-button>
              </el-tab-pane>
              <el-tab-pane label="静态参数" name="only">
                  <el-button  type="success"  plain  :disabled="disabled">添加静态参数</el-button>
              </el-tab-pane>
          </el-tabs>
      </el-card>
   </div>
</template>

<script>
import mixin from './Params-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

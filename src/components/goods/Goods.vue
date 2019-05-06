<template>
   <div class="Goods_container">
       <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>商品管理</el-breadcrumb-item>
           <el-breadcrumb-item>商品列表</el-breadcrumb-item>
       </el-breadcrumb>
       <el-card>
          <!--  搜索框       -->
           <el-row :gutter="20">
             <!--  搜索框  -->
               <el-col :span="6">
                   <el-input placeholder="请输入内容" v-model="reqParams.query">
                      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                   </el-input>
               </el-col>
               <!--   添加用户按钮    -->
               <el-col :span="18">
                  <el-button  type="primary"  plain @click="toadd()">添加用户</el-button>
               </el-col>
           </el-row>
          <!--   表格      -->
          <el-table :data="goodList">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="商品名称" prop="goods_name" width="400px"></el-table-column>
              <el-table-column label="价格" prop="goods_price"></el-table-column>
              <el-table-column label="重量" prop="goods_weight"></el-table-column>
              <el-table-column label="创建时间"  prop="add_time"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button  icon="el-icon-edit"  round></el-button>
                      <el-button  icon="el-icon-delete"  round  @click="delGoods(scope.row.goods_id)"></el-button>
                    </el-button-group>
                  </template>
              </el-table-column>
          </el-table>
         <div class="pager_container">
               <el-pagination
                   @current-change="changePager"
                   :page-size="reqParams.pagesize"
                   :current-page="reqParams.pagenum"
                   background
                   layout="prev, pager, next"
                   :total="total">
               </el-pagination>
           </div>
       </el-card>
   </div>
</template>

<script>
import mixin from './Good-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

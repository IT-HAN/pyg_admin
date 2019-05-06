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
                      :props="{value:'cat_id',label:'cat_name'}"
                      expand-trigger="hover"
                      :options="categoryList"
                      v-model="categoryValue"
                      @change="handleChange">
                  </el-cascader>
              </el-form-item>
          </el-form>
          <!--     tabs标签页     -->
          <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="动态参数" name="many" >
                  <el-button  type="success"  plain  :disabled="disabled"  @click="showAddDialog()">添加动态参数</el-button>
                  <!--      动态参数列表          -->
                  <el-table  :data="manyAttrs">
                      <el-table-column  type="expand"  width="100px">
                          <template  slot-scope="scope">
                              <el-tag  closable  size="normal"  v-for="(item, i) in scope.row.attr_vals" :key="i" @close="delTag(scope.row,i)">{{item}}</el-tag>
                              <el-tag  size="normal"
                                       v-show="!scope.row.inputShow"
                                       @click="showInput(scope.row)"
                                       :disable-transitions="true"
                                       class="wd">
                                  +添加tag
                              </el-tag>
                              <el-input
                                        class="wd"
                                        v-model="scope.row.inputValue"
                                        @blur="hideInput(scope.row)"
                                        @keyup.native.enter="hideInput(scope.row)"
                                        v-show="scope.row.inputShow"
                                        :ref="'input'+scope.row.attr_id">
                              </el-input>
                          </template>
                      </el-table-column>
                      <el-table-column  label="属性名称" prop="attr_name">
                      </el-table-column>
                      <el-table-column  label="操作"  width="180px">
                          <template  slot-scope="scope">
                              <el-button-group>
                                  <el-button  icon="el-icon-edit"  round></el-button>
                                  <el-button  icon="el-icon-delete"  round  @click="delParams(scope.row.attr_id)"></el-button>
                              </el-button-group>
                          </template>
                      </el-table-column>
                  </el-table>
              </el-tab-pane>
              <el-tab-pane label="静态参数" name="only">
                  <el-button  type="success"  plain  :disabled="disabled"  @click="showAddDialog()">添加静态参数</el-button>
                  <!--      静态参数列表         -->
                  <el-table  :data="onlyAttrs">
                      <el-table-column  type="index"  width="100px"></el-table-column>
                      <el-table-column  label="属性名称" prop="attr_name"></el-table-column>
                      <el-table-column  label="属性值"  prop="attr_vals">
                          <template  slot-scope="scope">
                              <el-tag  style="width: 300px;"  size="normal">{{scope.row.attr_vals}}</el-tag>
                          </template>
                      </el-table-column>
                      <el-table-column  label="操作" width="120px">
                          <template  slot-scope="scope">
                              <el-button-group>
                                  <el-button  icon="el-icon-edit"  round></el-button>
                                  <el-button  icon="el-icon-delete"  round  @click="delParams(scope.row.attr_id)"></el-button>
                              </el-button-group>
                          </template>
                      </el-table-column>
                  </el-table>
              </el-tab-pane>
          </el-tabs>
      </el-card>
<!--   添加参数的对话框   -->
       <el-dialog :title="activeName==='many'?'添加动态参数':'添加静态参数'" width="400px" :visible.sync="addDialogFormVisible">
           <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="100px" autocomplete="off">
               <el-form-item label="参数名称" prop="attr_name">
                  <el-input v-model="addForm.attr_name"></el-input>
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="addDialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="addSubmit()">确 定</el-button>
           </div>
       </el-dialog>
   </div>
</template>

<script>
import mixin from './Params-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
.el-tag{
  margin: 5px;
}
.wd{
  width: 100px;
}
.newInp{
  margin: 5px;
}
</style>

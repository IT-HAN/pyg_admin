<template>
    <div class="categories_container">
<!--  面包屑    -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
<!--  卡片    -->
        <el-card>
            <el-button  type="primary"  plain  @click="showAddDialog()">添加商品</el-button>
        </el-card>
<!--   树形表格   -->
        <el-table
            :indent="60"
            :data="categories"
            style="width: 100%;margin-bottom: 20px;"
            row-key="cat_id">
            <el-table-column
                prop="cat_name"
                label="分类名称"
                sortable>
            </el-table-column>
            <el-table-column
                prop="cat_deleted"
                label="是否有效"
                sortable>
                <template  slot-scope="scope">
                    <i  v-if="!scope.row.cat_deleted"  class="el-icon-success" style="color: green;"></i>
                    <i  v-else  class="el-icon-error"  style="color: red;"></i>
                </template>
            </el-table-column>
            <el-table-column
                prop="cat_level"
                label="等级">
                <template  slot-scope="scope">
                    <el-tag  v-if="scope.row.cat_level === 0">一级分类</el-tag>
                    <el-tag  type="success"  v-if="scope.row.cat_level === 1">二级分类</el-tag>
                    <el-tag  type="warning"  v-if="scope.row.cat_level === 2">三级分类</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template  slot-scope="scope">
                    <el-button-group>
                        <el-button  icon="el-icon-edit"  round  @click="showeidt(scope.row.cat_id)"></el-button>
                        <el-button  icon="el-icon-delete"  round  @click="delCategory(scope.row.cat_id)"></el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
<!--   分页     page-size当前页显示多少条   current-page显示当前是选中那个按钮 -->
        <el-pagination
            background
            @current-change="changePager"
            :page-size="reqParams.pagesize"
            :current-page="reqParams.pagenum"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
<!--    添加对话框的显示    -->
        <el-dialog width="400px" title="添加分类" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm" label-width="80px"  :rules="addRules"  ref="addForm">
                <el-form-item label="父级名称"  >
                    <!--       级联显示    expand-trigger经过会展开  options选项数据  -->
                    <!--     级联的选择结果为数组    @change选择事件指定了一个处理函数    -->
                    <el-cascader
                        style="width: 100%;"
                        :props="{value: 'cat_id',label:'cat_name'}"
                        :change-on-select="true"
                        expand-trigger="hover"
                        :options="categoryList"
                        v-model="categoryValue">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="分类名称"  prop="cat_name">
                  <el-input  v-model="addForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="addSubmit()">确 定</el-button>
            </div>
        </el-dialog>
<!--      编辑对话框-->
        <el-dialog width="400px" title="编辑表单" :visible.sync="editDialogFormVisible">
            <el-form :model="addForm" label-width="80px"  :rules="editRules">
                <el-form-item label="分类名称"  :model="editForm"  prop="cat_name">
                    <el-input  v-model="editForm.cat_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from './categories-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

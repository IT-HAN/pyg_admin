<template>
    <div class="roles_container">
        <!--  面包屑    -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--  卡片    -->
        <el-card>
            <el-button  type="primary" plain  @click="showAddDialog()">添加角色</el-button>
            <el-table :data="rolesList">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!--一级权限-->
                        <el-row  v-for="(item, i) in scope.row.child" :key="item.id" style="border-bottom: 1px solid #eeeeee" :style="{'border-top':i===0?'1px solid #eee':'none'}">
                            <el-col :span="4">
                                <el-tag  @close="delRights(scope.row,item.id)" closable>{{item.authName}}</el-tag>
                                <span class="el-icon-caret-right"></span>
                            </el-col>
                            <el-col :span="20">
                                <!--二级权限-->
                                <el-row  v-for="(secondItem,i) in item.child"  :key="secondItem.id"  :style="{'border-top':i===0?'none':'1px solid #eee'}">
                                    <el-col :span="8">
                                        <el-tag  @close="delRights(scope.row,secondItem.id)" closable type="success">{{secondItem.authName}}</el-tag>
                                        <span class="el-icon-caret-right"></span>
                                    </el-col>
                                    <el-col :span="16">
                                        <!--三级权限-->
                                        <el-tag  @close="delRights(scope.row,lastItem.id)" closable type="warning"  v-for="lastItem in secondItem.child"  :key="lastItem.id">{{lastItem.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column property="roleName" label="角色名称"></el-table-column>
                <el-table-column property="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button icon="el-icon-edit"  round  @click="showEditDialog(scope.row)"></el-button>
                            <el-button icon="el-icon-delete"  round  @click="delRoles(scope.row.id)"></el-button>
                            <el-button icon="el-icon-setting" round  @click="showRightDialog(scope.row)"></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
<!--   添加角色对话框   -->
        <el-dialog width="400px" title="添加角色" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm" label-width="80px"  :rules="addRules"  ref="addForm">
                <el-form-item label="角色名称"  prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述"  prop="roleDesc">
                    <el-input v-model="addForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit()">确 定</el-button>
            </div>
        </el-dialog>
<!--   编辑角色对话框   -->
        <el-dialog width="400px" title="编辑角色" :visible.sync="editDialogFormVisible">
            <el-form :model="editForm" label-width="80px"  :rules="editRules"  ref="editForm">
                <el-form-item label="角色名称"  prop="roleName">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述"  prop="roleDesc">
                    <el-input v-model="editForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit()">确 定</el-button>
            </div>
        </el-dialog>
<!--    权限分配对话框  -->
        <el-dialog width="400px" title="编辑角色" :visible.sync="rightDialogFormVisible">
            <h1>树型控件</h1>
        <!--  default-expand-all默认展开所以数据        -->
            <el-tree
                ref="tree"
                :default-checked-keys="rightsArr"
                :data="rightsTree"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rightDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="rightSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from './Roles-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
.el-row{
  display: flex;
  align-items: center;

}
.el-tag{
  margin: 5px;
}
</style>

<template>
    <div class="users_container">
    <!--   面包屑   -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
    <!--  卡片    -->
        <el-card>
            <!--    bootstrap栅格系统     -->
            <el-row :gutter="20">
              <!--  搜索框  -->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="reqParams.query">
                        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>
                </el-col>
                <!--   添加用户按钮    -->
                <el-col :span="18">
                    <el-button  type="primary"  plain  @click="showDialogForm">添加用户</el-button>
                </el-col>
            </el-row>
            <!--     用户列表       -->
            <el-table :data="userList" style="width: 100%">
                <el-table-column  prop="username"  label="用户名"  width="180"></el-table-column>
                <el-table-column  prop="email"  label="邮箱"  width="180"></el-table-column>
                <el-table-column  prop="mobile"  label="电话"  width="180"></el-table-column>
                <el-table-column  prop="role_name"  label="角色"  width="180"></el-table-column>
                <el-table-column  prop="mg_state"  label="状态"  width="180">
                    <template  slot-scope="scope">
                        <!--   使用当前行的数据 scope.row当前行数据   -->
                        <!--     默认为激活true为激活                 -->
                        <el-switch
                            @change="updatestate(scope.row.id, scope.row.mg_state)"
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column  prop="date"  label="操作"  width="180">
                    <template  slot-scope="scope">
                        <el-button-group>
                            <el-button  icon="el-icon-edit"  round  @click="showeditDialogFormVisible(scope.row.id)"></el-button>
                            <el-button  icon="el-icon-delete"  @click="delUsers(scope.row.id)"></el-button>
                            <el-button  icon="el-icon-setting"></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <!--    分页
              @current-change改变当前页事件 changePage事件触发函数不带()因为默认传参
              page-size指定现在每页多少条 结合total计算一共多少页
              :current-page让分页根据当前的页码选中按钮
             -->
            <div class="pager_container">
                <el-pagination
                    :current-page="reqParams.pagenum"
                    @current-change="changePager"
                    :page-size="reqParams.pagesize"
                    background
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>
        <!--  autocomplate自动填充   添加用户 -->
        <el-dialog width="400px" title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="addForm" label-width="80px" autocomplete="off" :rules="addRules" ref="addForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeRole()">确 定</el-button>
            </div>
        </el-dialog>
        <!--   编辑    -->
        <el-dialog width="400px" title="编辑用户" :visible.sync="editDialogFormVisible">
            <el-form :model="editForm" label-width="80px" autocomplete="off" :rules="editRules" ref="editForm">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
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
import mixin from './user_mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

<template>
    <div class="right_container">
<!--      面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
<!--      卡片-->
        <el-card>
            <el-table
                height="300px"
                :data="rightsList"
                style="width: 100%">
                <el-table-column
                  type="index">
                </el-table-column>
                <el-table-column
                  property="autnName"
                  label="权限名称">
                </el-table-column>
                <el-table-column
                    property="path"
                    label="路径">
                </el-table-column>
                <el-table-column
                    property="level"
                    label="权限等级">
                    <template slot-scope="scope">
                        <el-tag  v-if="scope.row.level==='0'">一级权限</el-tag>
                        <el-tag  v-if="scope.row.level==='1'"  type="success">二级权限</el-tag>
                        <el-tag  v-if="scope.row.level==='2'"  type="warning">三级权限</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import mixin from './Right-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

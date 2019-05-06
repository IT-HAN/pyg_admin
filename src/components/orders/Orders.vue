<template>
    <div class="orders_center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容"  v-model="reqParams.query">
                        <el-button  slot="append" icon="el-icon-search" @click="search()"></el-button>
                    </el-input>
                </el-col>
                <el-table :data="ordersList">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="订单编号"  prop="order_number"></el-table-column>
                    <el-table-column label="订单金额"  prop="order_price"></el-table-column>
                    <el-table-column label="是否付款">
                        <template slot-scope="scope">
                            {{scope.row.pay_status === '0' ? '未支付' : '已支付'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="是否发货" prop="is_send"></el-table-column>
                    <el-table-column label="下单时间">
                        <template slot-scope="scope">
                            {{scope.row.create_time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" circle @click="editDialogFormVisible = true"></el-button>
                            <el-button icon="el-icon-location" circle @click="wlDialogFormVisible = true"></el-button>
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
            </el-row>
        </el-card>
<!--    编辑订单相关数据    -->
        <el-dialog title="编辑订单" width="400px" :visible.sync="editDialogFormVisible">
            <el-form label-width="100px" autocomplete="off">
                <el-form-item label="省市区">
                    <el-cascader
                        clearable
                        style="width: 200px"
                        expand-trigger="hover"
                        :options="categoryList"
                        v-model="categoryValues">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
<!--   定位弹出框   -->
        <el-dialog title="查询物理" width="400px" :visible.sync="wlDialogFormVisible">
            <!--时间线-->
            <el-timeline>
                <el-timeline-item
                    v-for="(item, i) in wlList"
                    :key="i"
                    :timestamp="item.time">
                  {{item.context}}
                </el-timeline-item>
            </el-timeline>
            <div slot="footer" class="dialog-footer">
                <el-button @click="wlDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="wlDialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixin from './Orders-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>

</style>

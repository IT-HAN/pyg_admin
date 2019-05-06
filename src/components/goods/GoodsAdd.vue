<template>
    <div class="GoodsAdd">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
<!--    提示信息      -->
            <el-alert
                title="请按照步骤录入商品信息"
                type="warning"
                center
                show-icon>
            </el-alert>
<!--    步骤条      -->
            <el-steps :space="200" :active="active" finish-status="success" style="margin: 15px 0;" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品照片"></el-step>
                <el-step title="商品内容"></el-step>
            </el-steps>
<!--    tab侧边栏      -->
            <el-tabs tab-position="left" :before-leave="changeTabBefore">
                <el-tab-pane label="基本信息">
                <!--       步骤一中的表单     -->
                    <el-form label-width="200px" autocomplete="off" :model="form" :rules="rules" ref="form">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input style="width: 400px;" v-model="form.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="所属分类" prop="goods_cat">
                          <el-cascader
                              :props="{value:'cat_id',label:'cat_name'}"
                              expand-trigger="hover"
                              :options="categoryList"
                              v-model="categoryValue"
                              @change="handleChange">
                          </el-cascader>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input style="width: 200px" v-model="form.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input style="width: 200px" v-model="form.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input style="width: 200px" v-model="form.goods_weight"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品参数">
                    <el-form label-width="200px">
                        <el-form-item v-if="item.attr_vals" v-for="(item, i) in manyAttrs" :key="i" :label="item.attr_name">
                            <el-tag v-for="(tag, i) in item.attr_vals.split(',')" :key="i">{{tag}}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品属性">
                    <el-form label-width="200px">
                        <el-form-item v-if="item.attr_vals" v-for="(item, i) in onlyAttrs" :key="i" :label="item.attr_name">
                            <el-tag style="width: 300px">{{item.attr_vals}}</el-tag>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品照片">
<!--    action  图片提交的地址            -->
                    <el-upload
                        :action="action"
                        :headers="headers"
                        :on-success="headersSuccess"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="商品内容">
                    <quill-editor v-model="form.goods_introduce"></quill-editor>
                    <el-button type="success" @click="addSubmit">保存商品</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import mixin from './GoodsAdd-mixin'
export default {
  mixins: [mixin]
}
</script>

<style scoped>
.el-tag{
  margin: 5px;
}
</style>

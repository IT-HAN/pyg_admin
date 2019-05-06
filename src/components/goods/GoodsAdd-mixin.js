export default {
  name: 'GoodsAdd',
  data () {
    return {
      // 当前激活步骤
      active: 0,
      // 表单相关信息
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        goods_name: [
          {required: true, message: '商品名称必填', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '商品分类必填', trigger: 'change'}
        ],
        goods_price: [
          {required: true, message: '商品价格必填', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '商品数量必填', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '商品重量必填', trigger: 'blur'}
        ]
      },
      // 级联相关数据
      categoryList: [],
      categoryValue: [],
      // 参数列表数据
      manyAttrs: [],
      onlyAttrs: [],
      // 照片墙相关数据
      dialogImageUrl: '',
      dialogVisible: false,
      action: this.$http.defaults.baseURL + '/upload',
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    categoryValue (now, old) {
      if (now.length === 3) {
        this.form.goods_cat = now.join(',')
      } else {
        this.form.goods_cat = ''
      }
    }
  },
  methods: {
    handleChange () {},
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.categoryList = data
    },
    // 选择tab前对整个表单进行校验,要是校验失败阻止切换
    changeTabBefore (activeName, oldActiveName) {
      // return false 可以阻止必须在当前函数的作用域下有效
      // return promise 对象执行reject阻止
      if (oldActiveName === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              this.active = +activeName
              // 获取第二个和第三个选项卡的数据
              this.getParams('many')
              this.getParams('only')
              resolve()
            } else {
              reject(new Error('校验表单失败'))
            }
          })
        })
      } else {
        this.active = +activeName
      }
    },
    async getParams (type) {
      const id = this.categoryValue[2]
      const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {
        params: {sel: type}
      })
      if (meta.status !== 200) return this.$message.error('获取参数失败')
      this[type + 'Attrs'] = data
    },
    // 照片墙
    handleRemove (file, fileList) {
      console.log(file, fileList)
      // 移除form.pics中对应的图片对象
      const temPath = file.response.data.tem_path
      const index = this.form.pics.findIndex(item => item.pics === temPath)
      this.form.pics.splice(index, 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传成功后
    headersSuccess (res) {
      // 上传成功后获取图片地址
      this.form.pics.push({pic: res.data.tmp_path})
    },
    async addSubmit () {
      // 合并动态参数和静态参数
      const attrs = [...this.manyAttrs, ...this.onlyAttrs]
      this.form.attrs = attrs
      // 发请求
      const {data:{meta}} = await this.$http.post('goods', this.form)
      if (meta.status !== 201) return this.$message.error('商品录入失败')
      this.$message.success('商品录入成功')
      this.$router.push('/goods')
    }
  }
}

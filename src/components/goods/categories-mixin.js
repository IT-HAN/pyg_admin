export default {
  name: 'Categories',
  data () {
    return {
      reqParams: {
        pagenum: 1,
        pagesize: 5
      },
      // 接受数据
      categories: [],
      total: 0,
      // 添加分类对话框相关数据
      addDialogFormVisible: false,
      addForm: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      addRules: {
        cat_name: [
          {required: true, message: '分类名称必填', trigger: 'blur'}
        ]
      },
      // 级联相关数据
      categoryList: [],
      // 选择了级联控件的值
      categoryValue: [],
      // 编辑相关数据
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        cat_name: [
          {required: true, message: '分类名称必填', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      // 获取树状表格的依赖数据
      const {data: {data, meta}} = await this.$http.get('categories', {
        params: this.reqParams
      })
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      this.categories = data.result
      this.total = data.total
      console.log(data)
    },
    // 分页中按钮点击切换
    changePager (newPage) {
      // 改变页码 把新的页码给了reqParams
      this.reqParams.pagenum = newPage
      // 获取数据
      this.getData()
    },
    // 添加对话框的显示
    async showAddDialog () {
      this.addDialogFormVisible = true
      // 重置表单级联的值
      this.categoryValues = []
      // 重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
      // 获取级联数据
      const {data: {data, meta}} = await this.$http.get('categories', {
        params: {type: 2}
      })
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      this.categoryList = data
    },
    // 级联的触发函数
    // 添加提交
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // cat_level 和categoryValue是一致的
          const len = this.categoryValue.length
          if (len) {
            this.cat_pid = this.categoryValue[len - 1]
          } else {
            this.cat_pid = 0
          }
          this.addForm.cat_level = len
          const {data: {meta}} = await this.$http.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('获取失败')
          this.$message.success('获取成功')
          this.getData()
          this.addDialogFormVisible = false
        }
      })
    },
    // 编辑
    async showeidt (id) {
      this.editDialogFormVisible = true
      this.$nextTick(async () => {
        const {data: {data, meta}} = await this.$http.get(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('获取失败')
        this.editForm = data
      })
    },
    // 编辑的提交功能
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`categories/${this.editForm.cat_id}`, {
            cat_name: this.editForm.cat_name
          })
          if (meta.status !== 200) return this.$message.error('编辑失败')
          this.$message.success('编辑成功')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    // 删除
    delCategory (id) {
      this.$confirm('是否删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发请求去删除
        const {data: {meta}} = await this.$http.delete(`categories/${id}`)
        if (meta.status !== 200) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        this.getData()
      }).catch(() => {})
    }
  }
}

export default {
  name: 'Params',
  data () {
    return {
      // 级联相关数据
      categoryList: [],
      categoryValue: [],
      activeName: 'many',
      disabled: true,
      manyAttrs: [],
      onlyAttrs: [],
      // 添加对话框相关数据
      addDialogFormVisible: false,
      addRules: {
        attr_name: [
          {required: true, message: '添加参数必填', trigger: 'blur'}
        ]
      },
      addForm: {
        attr_name: ''
      },
      inputShow: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    id () {
      if (this.categoryValue.length === 3) {
        return this.categoryValue[2]
      } else {
        return null
      }
    }
  },
  methods: {
    // 页面加载时获取级联中的数据
    async getData () {
      const {data: {data, meta}} = await this.$http.get('categories')
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      this.categoryList = data
    },
    // 分类参数 为参数列表准备
    async getParams () {
      // 传递的数据需要准备 三级的ID 当前选中的是静态参数还是动态参数
      const len = this.categoryValue.length
      if (len === 3) {
        const id = this.categoryValue[len - 1]
        this.disabled = false
        const {data: {data, meta}} = await this.$http.get(`categories/${id}/attributes`, {
          params: {sel: this.activeName}
        })
        if (meta.status !== 200) return this.$message.error('获取失败')
        if (this.activeName === 'many') {
          // 判断activeName是不是动态参数 如果是动态参数就他其中的attr_vals变成数组
          data.forEach(item => {
            // 如果有内容就让他变成数组如果没有内容就变成一个空数组
            item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
            item.inputShow = false
            item.inputValue = ''
          })
        }
        this[`${this.activeName}Attrs`] = data
      } else {
        // 没选三级 清空当前输入框的值
        this.categoryValue = []
        this.disabled = true
      }
    },
    // tabs标签页切换相关函数
    handleChange () {
      // 选择了分类调用getparams这个函数
      this.getParams()
    },
    handleClick () {
      // tags切换的时候调用函数
      this.getParams()
    },
    // 添加参数相关函数
    showAddDialog () {
      this.addDialogFormVisible = true
      // 重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 点击添加按钮提交
    addSubmit () {
      // 先校验表单
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const id = this.categoryValue[2]
          const {data: {meta}} = await this.$http.post(`categories/${id}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          })
          if (meta.status !== 201) return this.$message.error('添加参数失败')
          this.$message.success('添加参数成功')
          // 更新列表
          this.getParams()
          // 关闭对话框
          this.addDialogFormVisible = false
        }
      })
    },
    // 删除按钮相关函数
    delParams (attrId) {
      this.$confirm('是否删除该参数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 分类的id
        const id = this.categoryValue[2]
        // 发请求去删除
        const {data: {meta}} = await this.$http.delete(`categories/${id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        this.getParams()
      }).catch(() => {})
    },
    // tag的关闭事件
    async delTag (row, i) {
      // 有两个参 一个是数组一个是索引
      row.attr_vals.splice(i, 1)
      this.editAttr(row)
    },
    // 添加tag
    showInput (row) {
      row.inputShow = true
      // 获取焦点使用dom
      this.$nextTick(() => {
        this.$refs['input' + row.attr_id].focus()
      })
    },
    // 点击enter键相关事件
    hideInput (row) {
      row.inputShow = false
      // 当前input输入的内容追加到attr_vals数组中
      if (row.inputValue) {
        row.attr_vals.push(row.inputValue)
        // 发送请求
        this.editAttr(row)
        row.inputValue = ''
      }
    },
    // 公共的函数
    async editAttr (row) {
      const {data: {meta}} = await this.$http.put(`categories/${this.id}/attributes/${row.attr_id}`, {
        attr_name: row.attr_name,
        attr_sel: this.activeName,
        attr_vals: row.attr_vals.join(',')
      })
      if (meta.status !== 200) return this.$message.error('修改参数失败')
      this.$message.success('修改参数成功')
    }
  }
}

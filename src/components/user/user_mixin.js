export default {
  name: 'Users',
  data () {
    // 定义校验函数
    const checkMobile = (rule, value, callback) => {
      // rule规则信息 value验证的输入框的值 callback回调函数(成功不传任何东西   失败传错误信息)
      if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('手机号不对'))
      callback()
    }
    return {
      // 用户列表
      userList: [],
      // 传参
      reqParams: {
        // 搜索关键字
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示多少条
        pagesize: 5
      },
      // 总条数
      total: 0,
      // 标识当前弹出框是否显示
      dialogFormVisible: false,
      // 添加用户表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '必须是邮箱格式', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 一下数据和编辑有关
      editDialogFormVisible: false,
      editForm: {},
      editRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '必须是邮箱格式', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  mounted (id) {
    // 用户列表数据获取
    this.getData()
  },
  methods: {
    async showeditDialogFormVisible (id) {
      // 显示编辑的对话框
      this.editDialogFormVisible = true
      // 填充数据
      const {data: {data, meta}} = await this.$http.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取失败')
      // 成功之后渲染到页面
      this.editForm = data
    },
    // 编辑的提交
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('修改失败')
          this.getData()
          this.editDialogFormVisible = false
        }
      })
    },
    async getData () {
      const {data: {data, meta}} = await this.$http.get('users', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取失败')
      // 这个是列表数据
      this.userList = data.users
      // 这个是总条数
      this.total = data.total
    },
    // 分页查询 需要当前页码
    changePager (newPage) {
      // 获取数据前要是有当前的页码
      this.reqParams.pagenum = newPage
      this.getData()
    },
    search () {
      // 根据当前搜索关键字去查询第一页的数据
      this.reqParams.pagenum = 1
      this.getData()
    },
    addSubmit () {
      // 添加成功后关闭
      // 输入的时候进行数据的验证
      // 点击提交的时候还要验证一次
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加失败')
          // 添加成功
          this.dialogFormVisible = false
          this.getData()
        }
      })
    },
    showDialogForm () {
      this.dialogFormVisible = true
      // 重置表单  内容  验证
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 按钮删除操作
    delUsers (id) {
      // 删除用户 ID
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {meta}} = await this.$http.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {})
    },
    // 修改状态
    async updatestate (id, newState) {
      const {data: {meta}} = await this.$http.put(`users/${id}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改状态失败')
      this.$message.success('修改状态成功')
      this.getData()
    }
  }
}

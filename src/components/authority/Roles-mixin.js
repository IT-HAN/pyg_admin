export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      // 添加相关的数据
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          {required: true, message: '角色名称必填', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述必填', trigger: 'blur'}
        ]
      },
      // 编辑相关数据
      editDialogFormVisible: false,
      editRules: {
        roleName: [
          {required: true, message: '角色名称必填', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述必填', trigger: 'blur'}
        ]
      },
      editForm: {},
      // 权限相关数据
      rightDialogFormVisible: false,
      // 树形控件相关数据
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightsArr: [],
      // 存一下当前树状控件的id
      rowId: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const {data: {data, meta}} = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error('获取数据失败')
      data.forEach(item => {
        item.child = item.children
        delete item.children
        item.child.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
      })
      this.rolesList = data
      console.log(data)
    },
    // 添加操作
    addSubmit () {
      // 整个表单的验证
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 提交添加请求
          const {data: {meta}} = await this.$http.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加角色失败')
          this.$message.success('添加角色成功')
          // 关闭对话框  更新列表数据
          this.addDialogFormVisible = false
          this.getData()
        }
      })
    },
    showAddDialog () {
      this.addDialogFormVisible = true
    },
    // 删除
    delRoles (id) {
      this.$confirm('是否删除该数据?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {meta}} = await this.$http.delete(`roles/${id}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        this.getData()
      }).catch(() => {})
    },
    // 编辑
    showEditDialog (role) {
      this.editDialogFormVisible = true
      // 填充默认数据
      this.editForm = role
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {data: {data, meta}} = await this.$http.get(`roles/${role.id}`)
        if (meta.status !== 200) return this.$message.error('获取失败')
        this.editForm = data
      })
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$http.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑失败')
          this.$message.success('编辑角色成功')
          this.editDialogFormVisible = false
          this.getData()
        }
      })
    },
    // 权限删除
    delRights (row, rightId) {
      this.$confirm('是否删除该权限?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认  发请求
        const {data: {data, meta}} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除失败')
        this.$message.success('删除成功')
        // this.getData()
        // 局部更新 当前行数据child
        // 当前行返回后的诗句就是child数据
        data.forEach(item => {
          item.child = item.children
          delete item.children
          item.child.forEach(item => {
            item.child = item.children
            delete item.children
          })
        })
        row.child = data
      }).catch(() => {})
    },
    async showRightDialog (row) {
      this.rightDialogFormVisible = true
      // 获取数据
      const {data: {data, meta}} = await this.$http.get('rights/tree')
      if (meta.status !== 200) return this.$message.error('获取权限失败')
      this.rightsTree = data
      // 获取已经选中的权限
      const arr = []
      row.child.forEach(item => {
        item.child.forEach(item => {
          item.child.forEach(item => {
            arr.push(item.id)
          })
        })
      })
      this.rightsArr = arr
      this.rowId = row.id
    },
    // 树形控件点击提交
    async rightSubmit () {
      // 先准备当前选中的权限
      const dom = this.$refs.tree
      const treeArr = dom.getCheckedKeys()
      const hrefArr = dom.getHalfCheckedNodes()
      const arr = [...treeArr, ...hrefArr]
      // 提交
      const {data: {meta}} = await this.$http.post(`roles/${this.rowId}/rights`, {
        rids: arr.join(',')
      })
      if (meta.status !== 200) return this.$message.error('修改权限失败')
      this.$message.success('修改权限成功')
      this.rightDialogFormVisible = false
      this.getData()
    }
  }
}

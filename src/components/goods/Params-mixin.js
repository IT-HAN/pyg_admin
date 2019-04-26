export default {
  name: 'Params',
  data () {
    return {
      // 级联相关数据
      categoryList: [],
      categoryValue: [],
      activeName: 'many',
      disabled: 'false'
    }
  },
  mounted () {},
  methods: {
    getParams () {
      const {data: {data, meta}} = this.$http.get()
    },
    // tabs标签页切换相关函数
    handleChange () {},
    handleClick () {}
  }
}

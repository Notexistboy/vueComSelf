<!--
* Element-UI-Table
* Seong Han
* 2019.07.30
-->
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column 
      v-for="(item, index) in this.tableHead" 
      :key="index"  
      :prop="item.prop" 
      :label="item.label" 
      :width="item.width"
      :fixed=fixed
    >
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'eleTable',
    props: {
      tableHead:Array,//表格头部样式
      tableData:Array,//
      fixed:Boolean,
    },
    data () {
      return {
        
      }
    },

    methods: {}
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>

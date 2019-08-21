<!--
* Element-UI-Table
* Seong Han
* 2019.07.30
-->
<template>
  <div  ref="tableContainer" :style="{width: width, height: height}">
    <div style="margin-bottom: 1vh; position:absolute; left:0; top:0" v-if=selbut>
      <el-button @click="toggleSelection()">{{buttonTxt}}</el-button>
    </div>
    <el-table
      ref="multipleTable"
      @sort-change = "sortChange"
      @selection-change="handleSelectionChange"
      :default-sort = "defaultSort"
      :data="tableData"
      :style="{width: width}"
      :height='height'
    ><!--tableData填充表格数据-->
      <el-table-column
        v-if=selbut
        type="selection"
        width="55" /><!--选择标签-->
      <el-table-column 
        v-for="(item, index) in tableHead" 
        :key="index"  
        :prop="item.prop" 
        :label="item.label" 
        :width="item.width"
        :fixed="item.fixed" />
      <el-table-column
        v-if="tableOption"
        :fixed="tableOption.fixed"
        align="center"
        header-align="center"
        :label="tableOption.label"
        :width="tableOption.width">
        <template slot-scope="scope">
          <el-button v-for="(btn, index) in tableOption.buttons" :key="index"
                    @click="handleButton(scope.row,btn.methods)" type="text" size="small">
            {{ (btn.label) }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pages.pageSizes"
        layout="total, sizes, prev, pager, next"
        :total="pages.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'eleTable',
    props: {
      tableData: Array,// 表格数据
      tableHead: Array,// 表头数据
      height: String,//固定表头的表格传高度字符串，即可实现固定表头的表格，
      width: String,//指定表格宽度字符串，如果需要实现左右固定  需tableHead宽度和大于width
      height: String,//表格高度
      tableOption: Object,//需要执行的方法
      pages: Object,//总数，分页器用
      defaultSort: Object,//默认排序方式
      getTable: Object,//请求参数
      buttonTxt: String,//按钮文本
      selbut: Boolean,//是否需要左侧选择栏和上方按钮
    },
    data () {
      return {

      }
    },
    methods: {
      handleSelectionChange(value) {//点击操作
        this.$emit('selectOper', value)
      },
      toggleSelection(rows) {
        this.$emit('buttonOper', rows )
      },
      sortChange(obj){
        let orderBy = {};
        if(obj.order) {
          if (obj.order.substr(0, 1) === 'a') {
            orderBy = obj.prop + " asc"
          }
          if (obj.order.substr(0, 1) === 'd') {
            orderBy = obj.prop + " desc"
          }
        }
        this.$emit('search',{ pageNo:this.getTable.pageNo,pageSize:this.getTable.pageSize,orderBy: orderBy });
      },
      handleButton(row,methods) {
        this.$emit('action',{ row, methods });
      },
      handleSizeChange(val) {
        this.$emit('search',{ pageNo:this.getTable.pageNo,pageSize: val ,orderBy: this.getTable.orderBy });
      },
      handleCurrentChange(val) {
        this.$emit('search',{ pageNo:val,pageSize: this.getTable.pageSize,orderBy: this.getTable.orderBy });
      },
    },
  }
</script>

<style>

</style>

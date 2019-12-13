<!--
* Element-UI-Table
* Seong Han
* 2019.07.30
-->
<template>
  <div ref="tableContainer" class="contable">
    <div style="margin-bottom: 0.6rem; position:absolute; left:0; top:0" v-if="false">
      <el-button @click="toggleSelection()">{{buttonTxt}}</el-button>
    </div>
    <el-table
      :header-cell-style="headerRowStyle"
      ref="multipleTable"
      @cell-click="cellClick"
      @row-click="rowClick"
      @sort-change="sortChange"
      @select="handleSelect"
      @selection-change="handleSelectionChange"
      :default-sort="defaultSort"
      :data="tableData"
      :style="{width: width}"
      :height="height"
      :max-height="maxHeight"
      size="medium"
      stripe
      :border="border"
    >
      <!--tableData填充表格数据-->
      <el-table-column v-if="selbut" type="selection" width="60" align="center">
        <!--选择标签-->
      </el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
      <el-table-column
        v-for="(item, index) in tableHead"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center"
        :fixed="item.fixed"
        :formatter="item.formatter"
      >
        <span v-if="item.html" v-html="item.html"></span>
      </el-table-column>
      <el-table-column
        v-if="tableOption"
        align="center"
        :fixed="tableOption.fixed"
        :label="tableOption.label"
        :width="tableOption.width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in tableOption.buttons"
            :key="index"
            v-if="calcState(scope.row, btn)"
            @click="handleButton(scope.row,btn.methods)"
            type="text"
            size="small"
            v-html="btn.label"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-if="!pageState">
      <el-col :span="24" style="padding-top: 0.05rem;">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="pages.pageSizes"
          layout="total, sizes, prev, pager, next"
          :total="pages.total"
        ></el-pagination>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  name: "cTable",
  props: {
    tableData: Array, // 表格数据
    tableHead: Array, // 表头数据
    height: [String, Boolean], //固定表头的表格传高度字符串，即可实现固定表头的表格，
    maxHeight: Number,
    width: String, //指定表格宽度字符串，如果需要实现左右固定  需tableHead宽度和大于width
    tableOption: [Object, Boolean], //需要执行的方法
    pages: Object, //总数，分页器用
    defaultSort: Object, //默认排序方式
    getTable: Object, //请求参数
    buttonTxt: String, //按钮文本
    selbut: Boolean, //是否需要左侧选择栏和上方按钮
    stripe: Boolean,
    headerRowStyle: Object,
    border: Boolean,
    pageState: Boolean,
  },
  data() {
    return {};
  },
  created() {

  },
  mounted() {
    //this.$forceUpdate();
  },
  methods: {
    cellClick(row, column, cell, event) {
      this.$emit("cellClick", { row, column, cell, event });
    },
    rowClick(row, column, cell, event) {
      this.$emit("rowClick", { row, column, cell, event });
    },
    handleSelectionChange(value) {
      //点击操作
      this.$emit("selectOper", value);
    },
    judgeSelectable(row, index) {},
    handleSelect(value) {
      //当用户手动勾选数据行的 Checkbox 时触发的事件
      this.$emit("selectItem", value);
    },
    toggleSelection(rows) {
      this.$emit("buttonOper", rows);
    },
    sortChange(obj) {
      let orderBy = {};
      if (obj.order) {
        if (obj.order.substr(0, 1) === "a") {
          orderBy = obj.prop + " asc";
        }
        if (obj.order.substr(0, 1) === "d") {
          orderBy = obj.prop + " desc";
        }
      }
      this.$emit("search", {
        pageNo: this.getTable.page,
        pageSize: this.getTable.limit,
        orderBy: orderBy
      });
    },
    handleButton(row, methods) {
      this.$emit("action", { row, methods });
    },
    handleSizeChange(val) {
      this.$emit("search", {
        pageNo: this.getTable.page,
        pageSize: val,
        orderBy: this.getTable.orderBy
      });
    },
    handleCurrentChange(val) {
      this.$emit("search", {
        pageNo: val,
        pageSize: this.getTable.limit,
        orderBy: this.getTable.orderBy
      });
    },
    calcState(row, btn) {
      let state = 1
      if(btn.root != undefined){
        if(btn.root == 1){
          if(btn.justify){
            if(row[btn.justify].indexOf(btn.value) != -1 ){
              if(btn.justifyDuo){
                if(parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo2)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo3) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo4)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo5) || row[btn.justifyDuo] == null  ){
                  state = 1
                }else{
                  state = 0
                }
              }else{
                state = 1
              }
            }else if( btn.value2 && row[btn.justify].indexOf(btn.value2) != -1 ){
              if(btn.justifyDuo){
                if(parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo2)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo3) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo4)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo5) || row[btn.justifyDuo] == null ){
                  state = 1
                }else{
                  state = 0
                }
              }else{
                state = 0
              }
            }else if(btn.value3 && row[btn.justify].indexOf(btn.value3) != -1 ){
              if(btn.justifyDuo){
                if(parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo2)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo3) || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo4)  || parseInt(row[btn.justifyDuo]) == parseInt(btn.valueDuo5) || row[btn.justifyDuo] == null ){
                  state = 1
                }else{
                  state = 0
                }
              }else{
                state = 0
              }
			      }else{
				      state = 0
            }
          }else{
            state = 0
          }
        }else{
          state = 0
        }
      }
      if(state == 1){
          return true
        }else{
          return false
        }
    },
  }
};
</script>

<style>
/* .el-table__header .el-table-column--selection .cell .el-checkbox:after {
  content: "全选";//选择框加文字
} */
/*隐藏滚动条*/
.el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: scroll;
  -ms-overflow-style: none; /*Chrome Safari*/
  overflow: -moz-scrollbars-none; /*火狐*/
}
/*IE10*/
.el-table--scrollable-y ::-webkit-scrollbar {
  width: 0 !important;
}
.el-table__body-wrapper ::-webkit-scrollbar {
  width: 0 !important;
}
</style>

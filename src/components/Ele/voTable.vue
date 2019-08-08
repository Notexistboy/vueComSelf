<template>
<div>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  <el-table
    :data="table.tableData"
    @sort-change = "sortChange"
    @selection-change="handleSelectionChange"
    :default-sort = "table.defaultSort"
    style="width: 100%">
    <el-table-column
      v-for="(col, index) in table.tableLabel"
      :key="index"
      :type="col.type"
      :fixed="col.fixed"
      :prop="col.prop"
      :label="col.title"
      :min-width="col.width"
      :sortable="col.sort"
      :formatter="col.formatter"
      :show-overflow-tooltip="col.ellipsis">
    </el-table-column>
    <el-table-column
      v-if="table.tableOption"
      fixed="right"
      align="center"
      header-align="center"
      label="行为"
      :width="table.tableOption.width">
      <template slot-scope="scope">
        <el-button v-for="(btn, index) in table.tableOption.buttons" :key="index"
                   @click="handleButton(scope.row,btn.methods)" type="text" size="small">
          {{ (btn.label) }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10,25,50]"
      layout="total, sizes, prev, pager, next"
      :total="table.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "voTable",
  props:{ table:Object,pageParam:Object},
  methods: {
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
      this.$emit('search',{pageNo:this.pageParam.pageNo,pageSize:this.pageParam.pageSize,orderBy: orderBy});
    },
    handleButton(row,methods) {
      this.$emit('action',{'row':row,'methods':methods});
    },
    handleSizeChange(val) {
      this.$emit('search',{pageNo:this.pageParam.pageNo,pageSize: val ,orderBy: this.pageParam.orderBy});
    },
    handleCurrentChange(val) {
      this.$emit('search',{pageNo:val,pageSize: this.pageParam.pageSize,orderBy: this.pageParam.orderBy });
    }
  }
}
</script>
<template>
  <div>      
    <!-- 添加按钮 -->   
    <el-row
      :gutter="20" >
      <el-col :span="3">
        <div
          class="item-title"
          @click = "addShareLink"><i class="el-icon-circle-plus"/></div>
      </el-col>
    </el-row> 
    <!-- 动态添加input输入框 -->
    <el-row
      v-for="(todo,index) in inputParams"
      :key="index">
      <el-row :gutter="20">
        <!--删除按钮-->
        <el-col :span="3">
          <div
            class="item-title"
            @click = "removeParam(index)"><i class="el-icon-remove"/>
          </div>
        </el-col>
        <el-col
          :span="1"
          style="margin-top:10px;margin-right:20px;">
          参数名:
        </el-col>
        <el-col
          :span="3"
          style="margin-left: -38px;">
          <!-- todoObj.$link... -->
          <el-input
            v-model.trim="todoObj[todo.value]"
            placeholder="输入内容"
            size="mini"
            @blur="test"
            clearable/>
        </el-col>
        <el-col
          :span="1"
          style="margin-top:10px;margin-right:20px;">
          参数值:
        </el-col>
        <el-col
          :span="3"
          style="margin-left: -38px;">
          <!-- todoObj.$link... -->
          <el-input
            v-model.trim="todoObj[todo.value]"
            placeholder="输入内容"
            size="mini"
            @blur="test"
            clearable/>
        </el-col>
      </el-row>
    </el-row>
    <!-- 动态添加select输入框 -->
    <el-row
      :gutter="20" >
      <el-col :span="3">
        <div
          class="item-title"
          @click = "addShareLink"><i class="el-icon-circle-plus"/></div>
      </el-col>
    </el-row> 
    <el-row
      v-for="(todo,index) in selectParams"
      :key="index">
      <el-row :gutter="20">
        <el-col :span="3">
          <div
            class="item-title"
            @click = "removeParam(index)"><i class="el-icon-remove"/>
          </div>
        </el-col>
        <el-col
          :span="1"
          style="margin-top:10px;margin-right:20px;">
          参数名:
        </el-col>
        <el-col
          :span="3"
          style="margin-left: -38px;">
          <!-- todoObj.$link... -->
          <el-select
            v-model="todoObj[todo.type]"
            placeholder="请选择类型">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>  
      </el-row>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        index: 1,
        ListParams: [{
          id: 1,
          type: `type1`,
	        value: `link1`,
        }],
        selectParams: [],
        todoObj: {},
        data: {
          link: ""
        },
        choose: []
      }
    },
    methods: {
      // 添加分享链接参数
	    addShareLink() {
        this.index += 1;
        debugger
	      this.inputParams.push({
	        id: this.index,
	        value: `link${this.index}`,
	        type: `type${this.index}`
	      });
	    },
	    // 删除分享参数
	    removeParam(index) {
        this.inputParams.splice(index, 1);
      },
      test() {
        console.log(this.todoObj)
        debugger
      }
	},

  }
</script>

<style>

</style>

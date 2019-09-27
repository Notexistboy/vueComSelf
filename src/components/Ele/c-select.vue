<template>
  <div ref="dropdown" style="display:inline-block">
    <el-select v-model="value" :multiple="multiple" :placeholder="placeholder" @change="handleChange">
      <el-option
        v-for="item in itemList"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
  </el-select>
  </div>
</template>

<script>
  export default {
    name: 'cDropdown',
    props: {
      itemList: Array,
      originData: String,
      multiple: Boolean,
      placeholder: String,
    },
    data () {
      return {
        value: "",
        commandNum: 0,
      }
    },
    mounted() {
    },
    methods: {
      handleChange(index) {
        //调用计算属性
        this.$emit('changeOper', index)
      },
    },
    computed: {
      //读取默认显示值
      originState() {
        if(this.$props.originData){
          this.value =  this.$props.originData
        }
      }
    },
    mounted() {
      this.originState
    }
  }
</script>

<style>

</style>
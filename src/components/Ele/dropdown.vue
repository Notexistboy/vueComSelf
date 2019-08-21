<template>
  <div ref="dropdown">
    <el-dropdown  @command="handleCommand">
      <span class="el-dropdown-link" v-model="defaultValue">
        {{defaultValue}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in itemList" :key="index" :command="index">
          <span>{{item}}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      itemList: Array,
    },
    data () {
      return {
        defaultValue: '下拉菜单',
        commandNum: 0,
      }
    },
    methods: {
      handleCommand(command) {
        this.handleCommandCalc = command
        this.$emit('commandOper', command)
      },
    },
    computed: {
      handleCommandCalc: {
        get(){
          debugger
          return this.defaultValue
        },
        set (command) {
          debugger
          this.defaultValue = this.itemList[command]
          debugger
        }
      },
    },
  }
</script>

<style>

</style>

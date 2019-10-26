<template>
  <div>      
    <!-- 添加按钮 -->   
    <!-- 动态添加input输入框 -->
    <!-- 动态添加select输入框 -->
    <newTree :data="dataTree"/>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        dataTree:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 101,
            label: '二级 1-1',
            children: [{
              id: 10101,
              label: '三级 1-1-1'
            }, {
              id: 10102,
              label: '三级 1-1-2'
            }]
          }]
        }]
      }
    },
    methods: {
      // 添加分享链接参数
	  },

  }
</script>

<style>

</style>

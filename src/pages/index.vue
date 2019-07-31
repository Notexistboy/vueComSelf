<template>
  <div>
    <upload :accept="acceptFileType" :limitNum="limitNum" :limitSize="limitSize" :action="action"/>
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        acceptFileType: ['jpg','png'],//指定文件类型
        limitNum: 5, //限制文件个数
        limitSize: '5M',//限制文件大小
        action: '',//上传地址
      }
    },

    methods: {}
  }
</script>

<style>

</style>

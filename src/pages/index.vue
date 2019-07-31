<template>
  <div>
    <upload :acceptFileType="acceptFileType" :limitNum="limitNum" :limitSize="limitSize" :acceptApi="acceptApi"/>
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        acceptFileType: "png",//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
        limitNum: 5, //限制文件个数
        limitSize: '5M',//限制文件大小,最小为1M，并以M为单位
        acceptApi: '/api/uploader/'//接口地址
      }
    },

    methods: {}
  }
</script>

<style>

</style>

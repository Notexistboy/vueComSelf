<template>
  <div>
    <!-- <upload :acceptFileType="acceptFileType" :limitNum="limitNum" :limitSize="limitSize" :acceptApi="acceptApi"/> -->
    <uploader :maxCount="maxCount" :accept="accept" :acceptApi="acceptApi" :maxSize="maxSize" :multiple="multiple" :preview="preview" :request="request"/>
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        //Element-UI
        acceptFileType: "png",//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
        limitNum: 5, //限制文件个数，数值型
        limitSize: '5M',//限制文件大小,最小为1M，并以M为单位
        acceptApi: '/api/uploader/',//接口地址
        //Vant
        maxCount: 10,//限制文件最大个数，数值型
        accept: "application/*",//限制文件上传类型，照片类型为image/*，文本文档为text/*，pdf、word为application/*
        acceptApi:'/api/uploader/',//接口地址,不是在提交时立即发送请求写空串
        maxSize: 5,//限制文件大小,最小为1M，不需要写单位，数值型
        multiple:true,//多图上传，部分安卓不支持
        request:false,//是否在提交时立即发送请求
        preview:true,//是否是显示缩略图的形式
      }
    },
    methods: {},
    components:{
      //upload
      //uploader
    },
  }
</script>

<style>

</style>

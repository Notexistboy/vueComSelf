<template>
  <div>
    <!-- <upload :acceptFileType="acceptFileType" :limitNum="limitNum" :limitSize="limitSize" :acceptApi="acceptApi" :showLileList="showLileList" :preview="preview" :request="request"/> -->
    <uploader :maxCount="maxCount" :acceptFileType="acceptFileType" :acceptApi="acceptApi" :maxSize="maxSize" :multiple="multiple" :preview="preview" :request="request" :previewSize="previewSize" :slide="slide"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //Element-UI
        acceptFileType: "ico,png,jpg",//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
        limitNum: 5, //限制文件个数，数值型
        limitSize: '5M',//限制文件大小,最小为1M，并以M为单位
        acceptApi: '/api/uploader/',//接口地址
        showLileList:true,//是否显示上传列表
        preview:true,//是否是显示缩略图的形式
        request:false,//是否在提交时立即发送请求
        //Vant
        maxCount: 5,//限制文件最大个数，数值型
        acceptFileType: "application/*",//限制文件上传类型，照片类型为image/*，文本文档为text/*，pdf、word为application/*
        acceptApi:'/api/uploader/',//接口地址,不是在提交时立即发送请求写空串
        maxSize: 5,//限制文件大小,最小为1M，不需要写单位，数值型
        multiple:true,//多图上传，部分安卓不支持
        request:false,//是否在提交时立即发送请求
        preview:false,//是否是显示缩略图的形式
        slide:false,//是否使用滑动删除,在文件最大个数为1时,可以不使用,其他情况需要使用
        previewSize:80,	//预览图和上传区域的尺寸，默认单位为px
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

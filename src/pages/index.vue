<template>
  <div>
    <!-- <upload :acceptFileType="acceptFileType" :limitNum="limitNum" :limitSize="limitSize" :acceptApi="acceptApi" :showLileList="showLileList" :preview="preview" :request="request"/> -->
    <!-- <uploader :maxCount="maxCount" :acceptFileType="acceptFileType" :acceptApi="acceptApi" :maxSize="maxSize" :multiple="multiple" :preview="preview" :request="request" :previewSize="previewSize" :slide="slide" :buttonTxt="buttonTxt" /> -->
    <eleTable ref="eleTable" :tableHead="tableHead" :tableData="tableData" :tableOption="tableOption" :pages="pages" :defaultSort="defaultSort" :height="height" :width="width" 
              @action="action" @search="search" @buttonOper="buttonOper" @selectOper="selectOper" :getTable="getTable" :buttonTxt="buttonTxt" :selbut="selbut"/>
  </div>
</template>

<script>
  import {EventBus} from '../components/eventbus'
  export default {
    data () {
      return {
        //Element-UI-Upload
        /* acceptFileType: "ico,png,jpg",//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
          limitNum: 5, //限制文件个数，数值型
          limitSize: '5M',//限制文件大小,最小为1M，并以M为单位
          acceptApi: '/api/uploader/',//接口地址
          showLileList:true,//是否显示上传列表
          preview:true,//是否是显示缩略图的形式
          request:false,//是否在提交时立即发送请求 */
        //Element-UI-Table

        tableHead: [{prop:'date', label:"日期", width:"180", fixed: 'left' }, 
                    {prop:'name', label:"姓名", width:"180", fixed: false }, 
                    {prop:'address', label:"地址", width:"180", fixed: false }],//表格头部样式，props对应每一列属性，label为显示文字，width为每一列宽度
        tableData: [{date: '2016-05-02', name: '王小虎', address: '上海市',}, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市',}, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市',}, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市',}],//表格内部数据,fixed固定指定列传left或right，即可实现表格的左右固定，不固定表格传false
        height: '300px',//固定表头传高度字符串，即可实现固定表头的表格，不固定表格传布尔值false
        width: '1000px',//指定表格宽度字符串，如果需要实现左右固定  需tableHead宽度和大于width
        tableOption:{
          width:'100',
          buttons:[
            {label:'细节',methods:'detail'},
            {label:'删除',methods:'delete'}
          ],
          label:'行为',
          fixed: false,
        },//需要执行的方法
        pages:{
          pageSizes:[10,25,50],
          total:0,
        },//总数，分页器用
        defaultSort:{prop:'name',order:'descending'},//默认排序方式
        getTable:{
          pageSize: 10,
          pageNo: 1,
          username: '',
          roleId: null,
          orderBy:''
        },//请求参数
        buttonTxt:"按钮文本",
        selbut: true,//是否需要左侧选择栏和上方按钮
        //Vant
        /* buttonTxt: "ok",
        maxCount: 1,//限制文件最大个数，数值型
        acceptFileType: "image/*",//限制文件上传类型，照片类型为image/*，文本文档为text/*，pdf、word为application/*
        acceptApi:'/api/uploader/',//接口地址,不是在提交时立即发送请求写空串
        maxSize: 5,//限制文件大小,最小为1M，不需要写单位，数值型
        multiple:true,//多图上传，部分安卓不支持
        request:false,//是否在提交时立即发送请求
        preview:true,//是否是显示缩略图的形式
        slide:false,//是否使用滑动删除,在文件最大个数为1时,可以不使用,其他情况需要使用
        previewSize:80,	//预览图和上传区域的尺寸，默认单位为px */
      }
    },
    
    mounted() {
      EventBus.$on('itemList', (itemList) => {
        debugger
        console.log(itemList)
      })
      /* axios.post(‘你的后台API地址’,this.getTable).then((res) => {
        this.tableData = res.data.result;
        this.total = res.data.total
      }) */
    },
    methods: {
      selectOper(value){
        console.log(this.$refs)
        debugger
        this.multipleSelection = value;
      },
      buttonOper(rows){
        if (rows) {
          debugger
          rows.forEach(row => {
            this.$refs.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          console.log(this.$refs)
          debugger
          this.$refs.$refs.multipleTable.clearSelection();
        }
      },
      search(obj){
        this.getTable.pageSize = obj.pageSize;
        this.getTable.pageNo = obj.pageNo;
        this.getTable.orderBy = obj.orderBy;
        /* this.$post(‘你的后台API地址’,this.getTable).then((res) => {
          this.tableData = res.data.result;
          this.total = res.data.total
        }) */
      },
      action(obj){
        if(obj.methods === 'detail'){
            console.log('这里添加详情函数')
        }
          if(obj.methods === 'delete'){
          console.log('这里添加删除函数')
        }
      },
    },
  }
</script>

<style>

</style>

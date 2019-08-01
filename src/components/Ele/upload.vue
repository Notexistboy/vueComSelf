<!--
* Element-UI-Upload
* Seong Han
* 2019.07.30
-->
<template>
  <div>
  <!--上传-->
    <el-row>
      <el-col :span="22">
        <el-upload
            class="upload-demo"
            action="action"
            :header="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handeleSuccess"	
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :accept=acceptFileType
            multiple
            :limit="limitNum"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传{{acceptFileType}}文件，大小不超过{{limitSize}}</div>
        </el-upload>

      </el-col>
    </el-row>
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading">确定上传</el-button>
        <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
    </span> -->
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props:{
      acceptFileType: String,//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
      limitNum: Number,//限制文件个数
      limitSize: String,//限制文件大小,最小为1M，并以M为单位
      acceptApi:String,//接口地址
    },
    data() {
      return {
        fileList: [],//存放文件列表[{name: '', url: ''}]
        uploadTemplateDialog:false,
        downLoadLoading:'',
      };
    },
    methods: {
      //打开上传模态框 ok
      /* uploadFile(){
        //var that = this
        this.fileList=[];
        this.uploadTemplateDialog=true;
        setTimeout(function(){
            //清空已上传的文件列表
            //this.$refs.upload.clearFiles();
        },100);
      }, */
      //确认上传 按钮
      /* submitUpload(){
        this.uploadLoading=true;
        //var that = this
        setTimeout(function () {
          if(this.$refs.upload.$children[0].fileList.length==1){
            debugger
            this.$refs.upload.submit();//手动触发提交上传
          }else{           
            this.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:'请选择文件!'
            });
          };
        },100);
      }, */
      //文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //点击已上传的文件链接时的钩子, 可以通过 
      handlePreview(file) {
        console.log(file);
      },
      //文件超出个数限制时的钩子
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择${this.limitNum}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //文件上传成功
      handeleSuccess(files, fileList) {
        
      },
      //删除文件之前的钩子，参数为上传的文件和文件列表，
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      //上传文件之前的钩子，参数为上传的文件
      beforeUpload(file){
        const { acceptFileType,acceptApi } = this
        //判断大小,取出页面传递指定大小
        let limitSize = this.limitSize.split('M')[0]
        //取出页面指定文件类型
        let acceptFile = acceptFileType.split(",")
        //判断文件类型
        let fileName=file.name.substring(file.name.lastIndexOf('.')+1);
        //判断文件类型是否相符
        acceptFile.map(item => { 
          if(fileName != item){
            debugger
            this.uploadTemplateDialog=false;
            this.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:`文件类型不是${item}文件!`
            });
          return ;
          }
        })
        //读取文件大小
        let fileSize=file.size;
        limitSize = parseFloat(limitSize)*1024*1024
        if( fileSize > limitSize ){
          debugger
          this.uploadTemplateDialog=false;
          this.$message({
            type:'error',
            showClose:true,
            duration:3000,
            message:`文件大于${this.limitSize}!`
          });
          return ;
        }

        this.downloadLoading=this.$loading({
          lock:true,
          text:'数据导入中...',
          spinner:'el-icon-loading',
          background:'rgba(0,0,0,0.7)'
        })
        let fd = new FormData()// 将数据包装成form
        fd.append('file',file)
        fd.append('_t1',new Date())
        debugger
        console.log(fd)
        debugger
        axios({
            method:'post',//请求类型
            url:acceptApi+new Date().getTime(),//请求地址,端口号
            data:fd, //request body
            headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}//自定义请求头
          }).then( rsp => {//请求成功，发送成功
            this.downloadLoading.close();
            let resp=rsp.data
            if(resp.resultCode==200){
              this.uploadTemplateDialog=false;
              this.$message.success(resp.resultMsg);
              //this.queryData();//更新数据
            }else{//发送失败
              this.uploadTemplateDialog=false;
              this.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:resp.resultMsg
              })
            }
            this.$refs.upload.submit();
          }).catch( error => {//请求失败
          this.$refs.upload.clearFiles();
            this.downloadLoading.close();
            this.uploadTemplateDialog=false;
            this.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:'请求失败! error:'+error
            })
        })
        return false;//屏蔽 action
      }
    },
    computed: {
      headers(){
          return {
              "authToken":window.sessionStorage.getItem('authToken')
          }
      },
      /* Data(){
          return {
              "businessId":this.form.fileId,
              "businessType":"sys_file"
          }
      } */
    },
  }
</script>

<style rel='stylesheet/stylus'>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

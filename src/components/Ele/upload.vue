<template>
  <div>
  <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
  <!--上传-->
  <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
    <el-row>
      <el-col :span="22">
        <el-upload
            class="upload-demo"
            :action="action"
            :header="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handeleSuccess"	
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :accept="acceptFileType"
            multiple
            :limit="limitNum"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传{{acceptFileType}}文件，大小不超过{{limitSize}}</div>
        </el-upload>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading">确定上传</el-button>
        <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
    </span>
</el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props:{
      acceptFileType: Array,//指定文件类型
      limitNum: Number,//限制文件个数
      limitSize: String,//限制文件大小
      action: String,//上传地址
    },
    data() {
      return {
        fileList: [],//存放文件列表[{name: '', url: ''}]
        uploadTemplateDialog:false,
        uploadLoading:false,
        downLoadLoading:'',
      };
    },
    methods: {
      //打开上传模态框 ok
      uploadFile(){
        this.uploadLoading=false;
        //var that = this
        this.fileList=[];
        this.uploadTemplateDialog=true;
        setTimeout(function(){
            //清空已上传的文件列表
            debugger
            //this.$refs.upload.clearFiles();
        },100);
      },
      //确认上传 按钮
      submitUpload(){
        this.uploadLoading=true;
        //var that = this
        setTimeout(function () {
          if(this.$refs.upload.$children[0].fileList.length==1){
            debugger
            this.$refs.upload.submit();//手动触发提交上传
          }else{
            this.uploadLoading=false;
            this.$message({
              type:'error',
              showClose:true,
              duration:3000,
              message:'请选择文件!'
            });
          };
        },100);
      },
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
        this.$message.warning(`当前限制选择${limitNum}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handeleSuccess(files, fileList) {
        
      },
      //删除文件之前的钩子，参数为上传的文件和文件列表，
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      //上传文件之前的钩子，参数为上传的文件
      beforeUpload(file){
        const limitSize = this.limitSize.split('M')[0]
        debugger
        //var this=this;
        //判断文件类型
        var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
        //判断文件类型是否相符
        debugger
        if(fileName!='xls'){
          this.uploadTemplateDialog=false;
          this.$message({
            type:'error',
            showClose:true,
            duration:3000,
            message:`文件类型不是${this.acceptFileType}文件!`
          });
          return false;
        }
        //读取文件大小
        var fileSize=file.size;
        debugger
        console.log(fileSize);
        if(fileSize>limitSize){
          this.uploadTemplateDialog=false;
          this.$message({
            type:'error',
            showClose:true,
            duration:3000,
            message:`文件大于${this.limitSize}!`
          });
          return false;
        }
        this.downloadLoading=this.$loading({
          lock:true,
          text:'数据导入中...',
          spinner:'el-icon-loading',
          background:'rgba(0,0,0,0.7)'
        });
        let fd = new FormData();
        fd.append('file',file);
        fd.append('_t1',new Date());
        debugger
        axios({
          method:'post',//请求类型
          url:'/upload/'+new Date().getTime(),//请求地址
          data:fd, //request body
          headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}//自定义请求头
        }).then(rsp=>{
            this.downloadLoading.close();
            this.uploadLoading=false;
            let resp=rsp.data
            if(resp.resultCode==200){
              this.uploadTemplateDialog=false;
              this.$message.success(resp.resultMsg);
              //this.queryData();//更新数据
            }else{
              this.uploadTemplateDialog=false;
              this.$message({
                type:'error',
                showClose:true,
                duration:60000,
                message:resp.resultMsg
              });
            }
          }).catch(error=> {
            this.downloadLoading.close();
            this.uploadLoading=false;
            this.uploadTemplateDialog=false;
            this.$message({
              type:'error',
              showClose:true,
              duration:60000,
              message:'请求失败! error:'+error
            });
          })
        return false;
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

<style lang='stylus' rel='stylesheet/stylus'>

</style>

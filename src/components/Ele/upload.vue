<template>
  <div>
  <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
  <!--上传-->
  <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
    <el-row>
      <el-col :span="22">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :accept="acceptFileType"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传文件，且大小不超过1M</div>
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
  export default {
    props:{
      tips:String,//按钮下方提示
      acceptFileType:String,//指定文件类型
    },
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        uploadTemplateDialog:false,
        //fileList:[],
        uploadLoading:false,
        downLoadLoading:'',
      };
    },
    methods: {
      uploadFile(){
        this.uploadLoading=false;
        var that=this;
        this.fileList=[];
        this.uploadTemplateDialog=true;
        setTimeout(function(){
            that.$refs.upload.clearFiles();
        },100);
      },
      submitUpload(){
        this.uploadLoading=true;
        var that=this;
        setTimeout(function () {
            if(that.$refs.upload.$children[0].fileList.length==1){
                that.$refs.upload.submit();
            }else{
                that.uploadLoading=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:3000,
                    message:'请选择文件!'
                });
            };
        },100);
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /* handleExceed(files,fileList){
          this.$message.warning('只能选择1个文件!');
      }, */
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      beforeUpload(file){

        var that=this;
        //判断文件类型
        var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
        if(fileName!='xls'){
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:'文件类型不是.xls文件!'
            });
            return false;
        }
        //读取文件大小
        var fileSize=file.size;
        console.log(fileSize);
        if(fileSize>1048576){
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:'文件大于1M!'
            });
            return false;
        }
        that.downloadLoading=that.$loading({
            lock:true,
            text:'数据导入中...',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,0.7)'
        });
        let fd=new FormData();
        fd.append('file',file);
        fd.append('_t1',new Date());
        axios({
            method:'post',
            url:'/upload/'+new Date().getTime(),
            data:fd,
            headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}
        }).then(rsp=>{
            that.downloadLoading.close();
            that.uploadLoading=false;
            let resp=rsp.data
            if(resp.resultCode==200){
                that.uploadTemplateDialog=false;
                that.$message.success(resp.resultMsg);
                //that.queryData();//更新数据
            }else{
                that.uploadTemplateDialog=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:60000,
                    message:resp.resultMsg
                });
            }
        }).catch(error=> {
            that.downloadLoading.close();
            that.uploadLoading=false;
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:60000,
                message:'请求失败! error:'+error
            });
        })
        return false;
      }
    },
    computed(){

    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>

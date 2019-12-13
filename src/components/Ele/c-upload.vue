<!--
* Element-UI-Upload
* Seong Han
* 2019.07.30
-->
<template>
  <div>
  <!--上传-->
    <el-row ref="uploadContainer" >
      <el-col :span="22">
        <div v-if="preview"><!-- :header="headers" -->
          <el-upload
            class="upload-demo"
            :action="action"
            :on-success="handeleSuccess"
            :on-error="handeleError"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :accept=acceptFileType
            :auto-upload="false"
            :show-file-list=showLileList
            multiple
            :limit="limitNum"
            :on-exceed="handleExceed"
            :file-list="fileList"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
              <span class="el-upload-list__item-actions">
                <span 
                  class="el-upload-list__item-preview" 
                  @click="handlePreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(files)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div v-else>
          <el-upload
              class="upload-demo"
              action="false"
              :auto-upload="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handeleSuccess"	
              :on-error="handeleError"
              :before-upload="beforeUpload"
              :accept=acceptFileType
              :show-file-list=showLileList
              multiple
              :limit="limitNum"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary" >点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传{{acceptFileType}}文件，大小不超过{{limitSize}}</div>
          </el-upload>
        </div>
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
    name: 'upload',
    props:{
      acceptFileType: String,//指定文件类型，保存成字符串格式，不同格式中间以英文逗号隔开,例"png,png,doc,docx"
      limitNum: Number,//限制文件个数
      limitSize: String,//限制文件大小,最小为1M，并以M为单位
      acceptApi: String,//接口地址
      showLileList: Boolean,//是否显示上传列表
      preview: Boolean,//是否是显示缩略图的形式
      request:Boolean,//
    },
    data() {
      return {
        fileList: [],//存放文件列表[{name: '', url: ''}]
        itemList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      };
    },
    methods: {
      //删除文件之前的钩子，参数为上传的文件和文件列表，
      //:before-remove="beforeRemove"
      beforeRemove(file, fileList) {
        return this.$confirm(`是否移除 ${file.name}？`);
      },
      //文件列表移除文件时的钩子
      handleRemove(file) {
        console.log(file.name);
        let removeIndex = 0
        let removeUrl = ''
        let removeData = {}
        this.itemList.map((item,index) => {
          if(item.name === file.name){
            removeIndex = index
            removeUrl = item.postUrl
            removeData = item.fd
            return{ removeIndex, removeUrl, removeData}
          }
        })
        debugger
        this.itemList.splice(removeIndex,1)
        if(this.request){
          axios({
          method: "delete", //请求类型
          url: removeUrl, //请求地址,端口号
          data: removeData, //request body
          headers: {
            "Content-Type": "multipart/form-data;"} //自定义请求头
          }).then(rsp => {
            //请求成功，发送成功
            if (rsp.status == 200) {
              this.$notify(res.statusText);
              //this.queryData();//更新数据
            } else {
              //发送失败
              this.$notify({
                background: "#f44",
                showClose: true,
                duration: 3000,
                message: res.statusText
              });
            }
          }).catch(error => {
            //请求失败
            this.$notify({
              background: "#f44",
              showClose: true,
              duration: 3000,
              message: "请求失败! error:" + error
            });
          })
        }else{
          this.$emit('change', this.itemList)
        }
      },
      //点击已上传的文件链接时的钩子
      handlePreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      //文件超出个数限制时的钩子
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择${this.limitNum}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //上传文件之前的钩子，参数为上传的文件
      beforeUpload(file){
        const { acceptFileType,acceptApi } = this
        //判断大小,取出页面传递指定大小
        let limitSize = this.limitSize.split('M')[0]
        //取出页面指定文件类型
        //let acceptFile = acceptFileType.split(",")
        //判断文件类型是否相符
        const name = file.name ? file.name : '';//file.name为true 赋值给a，否则赋值空串
        //let fileName=name.substring(name.lastIndexOf('.')+1);
        const fileName = name.substr(name.lastIndexOf('.') + 1, name.length) //上传文件类型截取，截取(最右侧出现第一个()的位置，截取末端的位置)
        const ext = fileName ? fileName : true;//filename为true 赋值给ext，否则赋值true
        const isExt = this.acceptFileType.indexOf(ext) < 0;//判断文件类型在索引值中的位置,如果存在为否,不存在为真
        if (isExt) {//存在不执行
          this.$message.error('请上传正确的格式类型');
          return !isExt;
        }
        //读取文件大小
        let fileSize=file.size;
        limitSize = parseFloat(limitSize)*1024*1024
        if( fileSize > limitSize ){
          this.$message({
            type:'error',
            showClose:true,
            duration:3000,
            message:`文件大于${this.limitSize}!`
          });
          return false;
        }
        let fd = new FormData()// 将数据包装成form
        fd.append('file',file)//后端读取formdata时需要匹配 'file'属性名
        //fd.append('_t1',new Date())
        let postUrl = this.acceptApi //+new Date().getTime()
        this.itemList.push({fileName:file.name,postUrl,fd,})
        debugger
        if(this.request){
          axios({
              method:'post',//请求类型
              url:postUrl,//请求地址,端口号
              data:fd, //request body
              headers:{"Content-Type":"multipart/form-data;"}//自定义请求头
            }).then( rsp => {//请求成功，发送成功
              if(rsp.status == 200) {
                debugger
                  this.$message.success(rsp.statusText);
                  //this.queryData();//更新数据
                }else{//发送失败
                  this.$message({
                    type:'error',
                    showClose:true,
                    duration:3000,
                    message:rsp.statusText
                  })
                }
            }).catch( error => {//请求失败
              debugger
              this.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:'请求失败! error:'+error
              })
          })
          return false;//屏蔽 action
        }else{
          debugger
          this.$emit("action",fd)
          return false;
        }
      },
      //文件上传成功
      handeleSuccess(files, fileList) {
        console.log(this.fileList,'fileList')
      },
      //文件上传失败
      handeleError(file) {
        //此时更新itemList数组
        this.$refs.upload.clearFiles()
      },
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

<style>
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

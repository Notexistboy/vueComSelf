<!--
* Vant-Uploader
* Seong Han
* 2019.08.01
-->
<template>
  <div ref="uploaderContainer" >
    <div v-if=preview>
      <van-uploader
        :after-read="afterRead"
        :before-read="beforeRead"
        v-model="fileList"
        :max-count="maxCount"
        :max-size="maxSize*1024*1024"
        :multiple=multiple
        :preview-size="previewSize" 
        @delete="deleteItem"
      />
      <ul>
        <li v-for="(item, index) in itemList" :key="index" >
          {{item.fileName}}
        </li>
      </ul>
    </div>
    <div v-else>
      <van-uploader
        :accept="acceptFileType"
        :after-read="afterRead"
        :before-read="beforeRead"
        :max-count="maxCount"
        :max-size="maxSize*1024*1024"
        :multiple=multiple
      >
        <van-button type="primary">{{buttonTxt}}</van-button>
      </van-uploader>

      <van-swipe-cell v-for="(item, index) in itemList" :key="index" :name="index" :on-close="onClose">
        <van-cell :border="false" :title="item.fileName" />
        <template slot="right" v-if=slide>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>

    </div>
  </div>
</template>

<script>
/* import { Button,Uploader,Notify,SwipeCell,Cell,CellGroup,Dialog } from 'vant'; 需要的组件
.van-uploader__input-wrapper{
  width: 30px;
  height: 30px;
} 修改样式类名
*/
import {EventBus} from '../eventbus'
import axios from "axios";
export default {
  props: {
    maxCount: Number, //最大上传个数，数值型
    acceptFileType: String, //限制文件上传类型，照片类型为image/*，文本文档为text/*，pdf、word为application/*
    acceptApi: String, //接口地址,不是在提交时立即发送请求写空串
    maxSize: Number, //限制文件大小,最小为1M，不需要写单位，数值型
    multiple: Boolean,//多图上传，部分安卓不支持
    request: Boolean,//是否在提交时立即发送请求
    preview: Boolean,//是否是显示缩略图的形式
    previewSize: Number,//预览图和上传区域的尺寸，默认单位为px
    slide:Boolean,//是否使用滑动删除,在文件最大个数为1时,可以不使用,其他情况需要使用
    buttonTxt:String,
  },
  data() {
    return {
      itemList: [],
      fileList: [],
    };
  },
  mounted() {
    this.maxSizeCalc
    debugger
  },
  methods: {
    //文件读取前的回调函数
    beforeRead(file) {
      debugger
      //进行类型的判断和大小的判断
      //判断最大情况
      let numState = true
      if(file.length){
        if(this.fileList.legnth+file.legnth > this.maxSize){
          numState  = false
          this.$notify({
            background: "#f44",
            showClose: true,
            duration: 3000,
            message: "数量超过最大限制"
          });
          return false
        }        
        if(!numState){
          return numState
        }
      }else{        
        if(this.fileList.length + 1 > this.maxSize){
          numState  = false
          this.$notify({
            background: "#f44",
            showClose: true,
            duration: 3000,
            message: "数量超过最大限制"
          });
          return false
        }
        if(!numState){
          return numState
        }
      }
      //判断大小,取出页面传递指定大小
      let accept = this.acceptFileType.split("/")[0]//取出页面指定文件类型
      let limitSize = this.maxSize //取出页面指定文件大小
      //判断文件类型是否相符
      if(file.length){
        let typeStatus = 1
        file.map(item => {
          if(item.type.split("/")[0] !== accept || item.size > this.maxSizeCalc){
            typeStatus = 0
            this.$notify({
              background: "#f44",
              showClose: true,
              duration: 3000,
              message: `请上传指定类型或小于${this.maxSize}M文件`
            });
            return false
          }
        })
        if(typeStatus == 0){
          return false
        }
      }else{
        const type = file.type//file.type为true 赋值给a，否则赋值空串
        //let fileName=name.substring(name.lastIndexOf('.')+1);
        const fileSize = file.size
        const fileType = type.substr(0,type.indexOf('/'))//拿到具体某个类型
        const ext = fileType ? fileType : true;//filename为true 赋值给ext，否则赋值true       
        const isExt = this.acceptFileType.indexOf(ext) < 0;//判断文件类型在索引值中的位置,如果存在为否,不存在为真      
        if (isExt || fileSize > this.maxSizeCalc) {//存在不执行
          this.$notify({
            background: "#f44",
            showClose: true,
            duration: 3000,
            message: `请上传指定类型或小于${this.maxSize}M文件`
          });
          return !isExt;
        }
      }
      return true;
    },
    //文件读取完成后的回调函数,maxCount限制file此时个数,发送请求,实现增，改的操作
    afterRead(file,detail) {
      let maxCount=this.maxCount
      let length = this.itemList.length
      let fileDetail =[]
      if(!file.length){
        fileDetail.push(file)//返回值是数组长度
      }else{
        fileDetail = file
      }
      const { acceptApi } = this
      // 此时可以自行将文件上传至服务器,axios
      console.log(file)
      fileDetail.map(item => {
        let postMethod = "post"
        let fd = new FormData()
        fd.append('file',file.content)
        fd.append('_t1',new Date())
        let postUrl = acceptApi + new Date().getTime() //请求地址,端口号
        console.log(fd)
        if( maxCount == 1 && length == 1 ){//如果要求最大值是1且数组有长度
        
          postMethod = "patch"
          //Vue.set(this.itemList, 0, {fileName:item.file.name,postUrl,fd,});
          this.$set(this.itemList, 0, {fileName:item.file.name,postUrl,fd,});
          this.itemList[0]={fileName:item.file.name,postUrl,fd,}
        }else{
          
          this.itemList.push({fileName:item.file.name,postUrl,fd,})
        }
        //调用事件车
        this.postItemList()
        if(this.request){
          axios({
            method: postMethod, //请求类型
            url: "https://jsonplaceholder.typicode.com/posts/", //请求地址,端口号postUrl
            data: fd, //request body
            headers: {
              "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
            } //自定义请求头
            }).then(rsp => {
              //请求成功，发送成功
              let resp = rsp.data;
              if (resp.resultCode == 200) {
                this.$notify(resp.resultMsg);
                //this.queryData();//更新数据
              } else {
                //发送失败
                this.$notify({
                  background: "#f44",
                  showClose: true,
                  duration: 3000,
                  message: resp.resultMsg
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
        }
      })
      console.log(this.fileList,'fileList')//文件模式，没有数据
      console.log(this.itemList,'itemList')//文件模式只存在这一个对象
      debugger

    },
    //滑动单元格方法
    onClose(clickPosition, instance, detail) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();//关闭当前窗口
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？',
          }).then(() => {
            instance.close();//关闭当前窗口
            this.deleteItem(detail.name)
          });
          break;
      }
    },
    //发送请求,实现增，改的操作
    deleteItem(index){
      let item = this.itemList[index]
      this.itemList.splice(index,1)
      //调用事件车
      this.postItemList()
      if(this.request){
        axios({
          method: "delete", //请求类型
          url: item.postUrl, //请求地址,端口号
          data: item.fd, //request body
          headers: {
            "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
          } //自定义请求头
          }).then(rsp => {
            //请求成功，发送成功
            let resp = rsp.data;
            if (resp.resultCode == 200) {
              this.$notify(resp.resultMsg);
              //this.queryData();//更新数据
            } else {
              //发送失败
              this.$notify({
                background: "#f44",
                showClose: true,
                duration: 3000,
                message: resp.resultMsg
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
      }
    },
    //事件车,如何更新
    postItemList(){
      const itemList = this.itemList
      debugger
      EventBus.$emit('itemList',itemList)
    }
  },
  computed: {
    maxSizeCalc() {
      // getter: 初始显示/ 相关的状态数据发生变化时自动调用
      return this.maxSize * 1024 * 1024;
      // setter: 当属性值发生了改变时自动调用
      // set(){}
    }
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.van-cell{
  margin: 0 auto;
  text-align: center;
  width: 10em;
}
.van-cell__title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 10em;
}
</style>

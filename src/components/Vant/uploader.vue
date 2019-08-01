<!--
* Vant-Uploader
* Seong Han
* 2019.08.01
-->
<template>
  <div>
    <van-uploader
      v-if=preview
      :after-read="afterRead"
      :before-read="beforeRead"
      v-model="fileList"
      :max-count="maxCount"
      :max-size="maxSize*1024*1024"
      :multiple=multiple
    />
    <div v-else>
      <van-uploader
        :accept="accept"
        :after-read="afterRead"
        :before-read="beforeRead"
        :max-count="maxCount"
        :max-size="maxSize*1024*1024"
        :multiple=multiple
      >
        <van-button type="primary">点击上传</van-button>
      </van-uploader>
      <van-swipe-cell v-for="(item, index) in itemList" :key="index" :name="index" :on-close="onClose">
        <van-cell :border="false" :title="item.fileName" />
        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    maxCount: Number, //最大上传个数
    accept: String, //接收文件类型
    acceptApi: String, //接口地址,不是在提交时立即发送请求写空串
    maxSize: Number, //限制文件大小,最小为1M，不需要写单位，数值型
    multiple: Boolean,//多图上传，部分安卓不支持
    request: Boolean,//是否在提交时立即发送请求
    preview: Boolean,//是否是显示缩略图的形式
  },
  data() {
    return {
      itemList: [],
      fileList:[],
    };
  },
  mounted() {
    this.calcMaxSize
  },
  methods: {
    //文件读取前的回调函数
    beforeRead(file) {
      //进行类型的判断和大小的判断
      let accept = this.accept.split("/")[0];
      if(file.length){
        let accpetType = file.map(item => {
          if(item.type.split("/")[0] !== accept && item.fileSize > this.maxSizeCalc){
            this.$notify({
              background: "#f44",
              showClose: true,
              duration: 60000,
              message: `请上传指定类型或小于${this.maxSize}M文件`
            });
          return false;
          }
        })
      }else{
        let accpetType = file.type.split("/")[0];
        let fileSize = file.size
        if (accpetType !== accept && fileSize > this.maxSizeCalc) {
          this.$notify({
            background: "#f44",
            showClose: true,
            duration: 60000,
            message: `请上传指定类型或小于${this.maxSize}M文件`
          });
        return false;
        } 
      }
      return true;
    },
    //文件读取完成后的回调函数
    afterRead(file,detail) {
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
        let fd = new FormData()
        fd.append('file',file.content)
        fd.append('_t1',new Date())
        let postUrl = acceptApi + new Date().getTime() //请求地址,端口号
        console.log(fd)
        if(this.request){
          axios({
            method: "post", //请求类型
            url: postUrl, //请求地址,端口号
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
        this.itemList.push({fileName:item.file.name,postUrl,fd,})
        //this.fileList.push({url:postUrl})
      })
      console.log(this.fileList,'fileList')
      console.log(this.itemList,'itemList')
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
            debugger
            this.deleteItem(detail.name)
          });
          break;
      }
    },
    deleteItem(index){
      debugger
      let item = this.itemList[index]
      this.itemList.splice(index,1)
      debugger
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
    }
  },
  computed: {
    calcMaxSize() {
      let maxSizeCalc = this.maxSize * 1024 * 1024;
      return maxSizeCalc;
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'></style>

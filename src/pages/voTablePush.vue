<template>
     <div class="tableBox">
       <voTable @search="search" :table="tableAll" :pageParam="getTable" 
       @action="action"></voTable>
     </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "user-list",
  data:()=>({
    tableAll:{
      defaultSort:{prop:'name',order:'descending'},
      status:{disabled:true},
      tableLabel:[
        {prop:'name',title:'用户名',width:'150',fixed:true},
        {prop:'address',title:'地址',width:'200'},
        {prop:'date',title:'日期',width:'200'},
      ],
      tableData: [{date: '2016-05-02', name: '王小虎', address: '上海市', fixed: 'left' }, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市', fixed: false }, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市', fixed: false }, 
                    {date: '2016-05-02', name: '王小虎', address: '上海市', fixed: 'right' }],
      tableOption:{
        width:'100',
        buttons:[
          {label:'BTN_DETAIL',methods:'detail'},
          {label:'BTN_DELETE',methods:'delete'}
        ]
      },
      total:0
    },
    /*你的请求参数*/
    getTable:{
      pageSize: 10,
      pageNo: 1,
      username: '',
      roleId: null,
      orderBy:''
    }
  }),
  methods:{
      action(obj){
          if(obj.methods === 'detail'){
              console.log('这里添加详情函数')
          }
           if(obj.methods === 'delete'){
            console.log('这里添加删除函数')
          }
      },
    search(obj){
      this.getTable.pageSize = obj.pageSize;
      this.getTable.pageNo = obj.pageNo;
      this.getTable.orderBy = obj.orderBy;
      /* this.$post(‘你的后台API地址’,this.getTable).then((res) => {
        this.tableAll.tableData = res.data.result;
        this.tableAll.total = res.data.total
      }) */
    }
  },
  mounted:function(){
      /* axios.post(‘你的后台API地址’,this.getTable).then((res) => {
        this.tableAll.tableData = res.data.result;
        this.tableAll.total = res.data.total
      }) */
  }
}
</script>

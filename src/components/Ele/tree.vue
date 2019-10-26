<template>
  <div>
    <el-tree
      :data="data"
      lazy
      show-checkbox
      @check="chooseItem"
      :highlight-current="true"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      >
    </el-tree>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      chooseItem() {

      },
      renderContent(h, { node, data, store }) {
        let icon;
        let platForm;
        let isShow = false;
        if(platForm == 0){
            icon = (<icon-svg icon-style="icon-style" icon-class="el-icon-pc"></icon-svg>) ;
    　　　　　isShow = true;　
        }else{
            icon = (<icon-svg icon-style="icon-style" icon-class="el-icon-wx"></icon-svg>) ;
    　　　　　isShow = false;
    　　　}
        return (
          <span style="font-size: 14px; padding-right: 8px">
              <span class="normalText">
                  {icon}
                  <span style="color: #333;"> {node.label} </span>
              </span>
              {isshow ? '' :
                  <span class="pos-a" style="right:20px; top:0;">
                      <span style="font-size: 12px;line-height: 30px;"
                          on-click={() => this.operation(node, data, event)}>
                          <icon-svg icon-style="icon-style" icon-class="el-icon-ifcn-gengduo"></icon-svg>
                      </span>
                  </span>
              }

          </span>
        );
      }                
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

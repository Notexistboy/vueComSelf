<template>
  <div>
    <annularChart :annularData="obj1Data" :title="title" />
    <barChart :barData="objData" :descript="descript" :title="title" :legend="legend"/>
    <barChart :barData="objData1" :descript="descript1" :title="title" :legend="legend"/>
    <curveChart :curveData="objData1" :descript="descript1" :title="title" :legend="legend"/>
    <curveChart :curveData="objData" :descript="descript" :title="title" :legend="legend"/>
    
    <pieChart :pieData="obj1Data" :title="title" />
    <fanChart :fanData="data" :title="title" />
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        objData1: { '充装车次':{'洪茂达':100,'中海油':45,'大鹏':65,'光汇石油':85,'华安':25},
                   '充装量':{'洪茂达':50,'中海油':55,'大鹏':60,'光汇石油':70,'华安':60},
                   '充装':{'洪茂达':50,'中海油':75,'大鹏':60,'光汇石油':50,'华安':25}
                  },
        objData: { '东城区':{'周一':100,'周二':45,'周三':65,'周四':85,'周五':25},
          '西城区':{'周一':50,'周二':55,'周三':60,'周四':70,'周五':60},
          '海淀区':{'周一':50,'周二':75,'周三':60,'周四':50,'周五':25}
        },
        obj1Data: {'洪茂达':100,'中海油':50,'大鹏':20,'光汇石油':30,'华安':20},
        data: [{name:'现代材料', value:25, common:100},{name:'现代材料', value:25, common:50},{name:'现代材料', value:75, common:75}],
        descript: true,
        descript1: false,
        legend: '降雨量(ml)',
        title: '北京城市降雨',
      }
    },

    methods: {}
  }
</script>

<style>

</style>

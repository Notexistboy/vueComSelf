<template>
  <div>
    <annularChart :annularData="obj1Data" />
    <!-- <barChart :barData="objData" />
    <curveChart :curveData="objData" /> -->
    <pieChart :pieData="obj1Data" />
    <fanChart :fanData="data" />
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        objData: { '充装车次':{'洪茂达':100,'中海油':20,'大鹏':20,'光汇石油':20,'华安':20},
                  '充装量':{'洪茂达':60,'中海油':60,'大鹏':60,'光汇石油':60,'华安':60}
                  },
        obj1Data: {'洪茂达':100,'中海油':50,'大鹏':20,'光汇石油':30,'华安':20},
        data: [{name:'现代材料', value:25, common:100},{name:'现代材料', value:25, common:50},{name:'现代材料', value:75, common:75}]
      }
    },

    methods: {}
  }
</script>

<style>

</style>

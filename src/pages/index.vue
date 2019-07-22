<template>
  <div>
    <annularChart :arrData="arrData"/>
    <barChart :objData="objData"/>
    <curveChart :objData="objData"/>
    <pieChart :arrData="arrData"/>
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        objData:{ '充装量':{'洪茂达':60,'中海油':60,'大鹏':60,'光汇石油':60,'华安':60},
                  '充装车次':{'洪茂达':20,'中海油':20,'大鹏':20,'光汇石油':20,'华安':20}
                },
        arrData:[335,310,234,135,1548],
      }
    },

    methods: {}
  }
</script>

<style>

</style>

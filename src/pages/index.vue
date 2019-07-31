<template>
  <div>
    <upload :accept="acceptFileType"/>
  </div>
</template>

<script>
  export default {
    
    data () {
      return {
        acceptFileType:'jpeg',//
      }
    },

    methods: {}
  }
</script>

<style>

</style>

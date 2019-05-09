<template>
  <div id="searchHistory">
    <span>{{searchedText}}</span>
  </div>
</template>

<script>
  export default {
    name: "searchHistory",
    props:[
      "searchedText"
    ]
  }
</script>

<style scoped>

</style>

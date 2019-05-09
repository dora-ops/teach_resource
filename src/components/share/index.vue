<template>
  <div>
    <div class="second-nav-head-wrap">
      <router-link to="/share/homework">homework</router-link>
      <router-link to="/share/hello">hello</router-link>
      <router-view></router-view>
    </div>
    <comment></comment>
  </div>

</template>

<script>
  import comment from '@/components/share/comment'

  export default {
    name: "share",
    components: {
      comment
    }
  }
</script>

<style scoped>

</style>

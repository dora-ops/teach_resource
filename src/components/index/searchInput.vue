<template>
  <div id="searchInput">
    <form @submit.prevent="formSubmit">
      <input type="text" name="search" autocomplete="off" v-model="textToSearch" @keyUp.enter.stop="search">
      <select v-model="lang">
        <option value="en">English</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
      </select>
    </form>
  </div>

</template>

<script>
  export default {
    name: "searchInput",
    data: function () {
      return {
        textToSearch: "",
        lang: "en"
      }
    },
    methods: {
      search: function () {
        this.formSubmit();
      },
      formSubmit: function () {
        this.$emit("formSubmit", this.textToSearch,this.lang);
      }
    }
  }
</script>

<style scoped>
  input {
    width: 1000px;
    height: 48px;
    display: block;
    position: absolute;
    top: 100px;
    left: 80px;
    font-size: 18px;
    text-align: center;
    background: #fff;
  }
</style>

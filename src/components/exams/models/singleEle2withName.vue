<template>
  <div class="wrap">
    <span>姓名：</span>
    <el-input
      class="inputA"
      placeholder="请输入真实姓名"
      v-model="input10"
      clearable>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "singleEle2withName",
    data() {
      return {
        input10: ''
      }
    }
  }
</script>

<style scoped>
  .wrap{
    width: 100%;
    float: left;
    margin: 16px;
    border-bottom: 1px dashed #eee;
    padding-bottom: 8px;
  }
  span{
    float: left;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 16px;
    font-weight: bold;
  }
  .inputA{
    float: left;
    width: 220px;
    height: 40px;
  }

</style>

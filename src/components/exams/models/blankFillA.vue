<template>
  <div class="wrap">
    <el-input
      v-show="!hasItemName"
      @keyup.enter.native="editItemName"
      @change.native="editItemName"
      class="inputA"
      placeholder="请输入题目"
      v-model="input10"
      clearable>
    </el-input>
    <span class="itemName" v-show="hasItemName" @click="editItemName">{{input10}}</span>

    <div class="answer-wrap">
      <el-input
        class="answer"
        placeholder="请填入正确答案"
        v-model="answer"
        clearable>
      </el-input>
    </div>

  </div>
</template>

<script>
  export default {
    name: "blankFillA",
    data() {
      return {
        input10: '',
        answer:'',
        hasItemName: false,
      }
    },
    methods: {
      editItemName: function () {
        this.hasItemName = !this.hasItemName;
      },
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
    width: 620px;
    height: 40px;
  }
  .answer-wrap{
    float: left;
    width: 100%;
    height: 40px;
    margin-top: 8px;
  }
  .answer-wrap .answer{
    width: 620px;
  }
  .itemName{
    width: auto;
    height: auto;
    max-width: 1104px;
    float: left;
    text-align: left;
  }
</style>

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
      <el-radio v-model="radio" label="1" style="margin-left: 16px;line-height: 40px">对</el-radio>
      <el-radio v-model="radio" label="2" style="line-height: 40px">错</el-radio>
    </div>
</template>

<script>
    export default {
      name: "judge",
      data() {
        return {
          radio: '1',
          input10: '',
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
  .itemName{
    width: auto;
    height: auto;
    max-width: 1104px;
    float: left;
    text-align: left;
  }
</style>

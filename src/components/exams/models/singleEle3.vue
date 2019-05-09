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
    <br>
    <div class="wrap" style="margin-left: 0;border: none;">
      <el-radio v-model="radio" label="1">
        <el-input
          v-show="!ele1"
          @keyup.enter.native="editEleName(ele1)"
          @change.native="editEleName(ele1)"
          placeholder="请输入单选名称"
          v-model="ele1T"
          clearable>
        </el-input>
        <span v-show="ele1">{{ele1T}}</span>
      </el-radio>
      <el-radio v-model="radio" label="2">
        <el-input
          v-show="!ele2"
          @keyup.enter.native="editEleName(ele2)"
          @change.native="editEleName(ele2)"
          placeholder="请输入单选名称"
          v-model="ele2T"
          clearable>
        </el-input>
        <span v-show="ele2">{{ele2T}}</span>
      </el-radio>
      <el-radio v-model="radio" label="3">
        <el-input
          v-show="!ele3"
          @keyup.enter.native="editEleName(ele3)"
          @change.native="editEleName(ele3)"
          placeholder="请输入单选名称"
          v-model="ele3T"
          clearable>
        </el-input>
        <span v-show="ele3">{{ele3T}}</span>
      </el-radio>
    </div>

  </div>
</template>

<script>
  export default {
    name: "singleEle3",
    data() {
      return {
        radio: '1',
        input10: '',
        ele1:false,
        ele2:false,
        ele3:false,
        ele1T:'',
        ele2T:'',
        ele3T:'',
        hasItemName: false,
      }
    },
    methods: {
      editItemName: function () {
        this.hasItemName = !this.hasItemName;
      },
      editEleName:function (show) {

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


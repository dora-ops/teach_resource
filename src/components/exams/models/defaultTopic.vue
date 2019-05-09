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
      <span v-show="hasItemName" @click="editItemName">{{input10}}</span>
    </div>
</template>

<script>
    export default {
        name: "defaultTopic",
      data(){
          return {
            input10:'',
            hasItemName:false,
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

</style>

<template>
  <div class="wrap">
    <el-input
      v-show="!hasItemName"
      @keyup.enter.native="editItemName"
      @change.native="editItemName"
      class="inputA"
      placeholder="请输入简答题目"
      v-model="input10"
      clearable>
    </el-input>
    <span class="itemName" v-show="hasItemName" @click="editItemName">{{input10}}</span>

    <div class="editor-wrap" >
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>

  </div>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    name: "blankFillA",
    data() {
      return {
        input10: '',
        answer:'',
        hasItemName: false,
        editor: ClassicEditor,
        editorData: '<p>请简答</p>',
        editorConfig: {
          // The configuration of the editor.
        }
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
  .editor-wrap{
    float: left;
    width: 620px;
    margin: 8px 0;
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

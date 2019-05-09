<template>
  <div id="examModel">

    <div class="exam-title">
      <label style="margin-left: 16px;margin-right: 16px"><i class="red">*</i>试卷名称：</label>
      <el-input
        class="inputA"
        v-show="!hasExamName"
        placeholder="请输入试卷名称"
        maxLength="25"
        v-model="examName"
        clearable
        @keyup.enter.native="editExamName"
        @change.native="editExamName"
      >
      </el-input>
      <h2 v-show="hasExamName" @click="editExamName">{{examName}}</h2>

      <div class="block" style="margin-top: 8px;">
        <span class="demonstration" style="margin-left:16px;margin-right: 16px;"><i class="red">*</i>作答时间：</span>
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <label style="margin-left: 16px;margin-right: 8px">设置合格分</label>
        <el-input-number v-model="score_ok" @change="handleChange" :min="0" label="合格分"></el-input-number>
      </div>


      <div id="itemTypeSelect" class="block" style="margin-top: 8px">
        <span class="demonstration" style="margin-left: 32px;margin-right: 56px">题型</span>
        <el-cascader
          placeholder="试试搜索：完形填空"
          :options="options"
          :clearable="true"
          filterable
        ></el-cascader>
        <el-button type="primary" @click.prevent="addItem" style="margin-left: 16px;">增加题目</el-button>
      </div>
    </div>



    <div id="examList">
      <component :is="item.component" v-for="item in items"  ></component>
    </div>



    <div class="btn-wrap">
      <el-button type="primary">完成试卷</el-button>
      <el-button @click.prevent="print" style="margin-left: 16px">打印预览</el-button>
      <el-button>取消试卷</el-button>
    </div>
  </div>
</template>



<script>
  import defaultTopic from '@/components/exams/models/defaultTopic.vue'
  import judge from '@/components/exams/models/judge.vue'
  import singleEle2withName from '@/components/exams/models/singleEle2withName.vue'
  import singleEle2withGrade from '@/components/exams/models/singleEle2withGrade.vue'
  import singleEle2withNumber from '@/components/exams/models/singleEle2withNumber.vue'
  import singleEle2withPhone from '@/components/exams/models/singleEle2withPhone.vue'
  import singleEle2 from '@/components/exams/models/singleEle2.vue'
  import singleEle3 from '@/components/exams/models/singleEle3.vue'
  import singleEle4 from '@/components/exams/models/singleEle4.vue'
  import blankFillA from '@/components/exams/models/blankFillA.vue'
  import shortAnswer from '@/components/exams/models/shortAnswer.vue'

  export default {
    name: "examModel",
    data() {
      return {
        score_ok:0,
        dateTime:'',
        hasExamName:false,
        examName: '',
        options: [
          {
            value:'defaultTopic',label:'无答案题目'
          },
            {
              value: 'gerenxinxi', label: '个人信息',
              children: [
                {value: 'xingming', label: '姓名'},
                {value: 'nianji', label: '年级'},
                {value: 'xuehao', label: '学号'},
                {value: 'shoujihao', label: '手机号'}
              ]
            },
            {value: 'panduan', label: '判断'},
            {
              value: 'danxuan', label: '单选',
              children: [
                {value: '2', label: '2'},
                {value: '3', label: '3'},
                {value: '4', label: '4'}
              ]
            }, {
            value: 'duoxuan',
            label: '多选',
            children: [{
              value: '2',
              label: '2'
            }, {
              value: '3',
              label: '3'
            }, {
              value: '4',
              label: '4'
            }]
          }, {
            value: 'tiankong',
            label: '填空',
            children: [{
              value: 'danxian',
              label: '单项'
            }, {
              value: 'duoxian',
              label: '多项'
            }, {
              value: 'wanxingtiankong',
              label: '完形填空'
            }, {
              value: 'juzhentiankong',
              label: '矩阵填空'
            }]
          }, {
            value: 'jianda',
            label: '简答'
          }, {
            value: 'wenjian',
            label: '文件'
          }, {
            value:'shuoming',
            label:'说明'
          }],
        items:[]
      };
    },
    methods:{
      handleChange(value) {
        console.log(value);
      },
      editExamName:function(){
        this.hasExamName=!this.hasExamName;
      },
      print:function () {
        window.print();
      },
      addItem:function () {
        //获得下拉框选项
        var itemName=document.getElementById('itemTypeSelect').getElementsByTagName('input')[0].getAttribute('value');
        //加载对应的组件
        let itemArray=[
          {name:'无答案',component:'defaultTopic'},
          {name:'个人信息/姓名',component:'singleEle2withName'},
          {name:'个人信息/年级',component:'singleEle2withGrade'},
          {name:'个人信息/学号',component:'singleEle2withNumber'},
          {name:'个人信息/手机号',component:'singleEle2withPhone'},
          {name:'判断',component:'judge'},
          {name:'单选/2',component:'singleEle2'},
          {name:'单选/3',component:'singleEle3'},
          {name:'单选/4',component:'singleEle4'},
          {name:'多选/2',component:'multipleEle2'},
          {name:'多选/3',component:'multipleEle3'},
          {name:'多选/4',component:'multipleEle4'},
          {name:'填空/单项',component:'blankFillA'},
          {name:'填空/多项',component:'blankFillB'},
          {name:'填空/完形填空',component:'blankFillAA'},
          {name:'填空/矩阵填空',component:'blankFillBB'},
          {name:'简答',component:'shortAnswer'},
          {name:'文件',component:'file'},
          {name:'说明',component:'explain'}];

        for(var i=0;i<itemArray.length;i++){
          if(itemName===itemArray[i].name){

            this.items.push({
              component:itemArray[i].component
            });
            console.log(this.items);
            return false;
          }
        }

      }
    },
    /*
    * 判断 judge
    * 单选{2,3,4} singleEle
    * 多选 multipleEle
    * 填空{} blankFill
    * 简答  shortAnswer
    * 文件 file
    * 说明 explain
    *
    * 题目功能：删除、调整位置，题目解析，答案设置
    * 试卷功能：打印预览，导出为word，发布，删除，成绩单设置
    *
    *
    *
    * */
    components:{
      defaultTopic,
      judge,
      singleEle2withName,
      singleEle2withGrade,
      singleEle2withNumber,
      singleEle2withPhone,
      singleEle2,
      singleEle3,
      singleEle4,
      blankFillA,
      shortAnswer

    }
  }
</script>


<style scoped>
  .exam-title{
    margin: 0 16px 0 16px;
    padding: 8px 0;
    border: 1px dashed #c2ccd0;
  }
  #examList{
    margin: 32px 16px 0 16px;
    padding: 16px 0;
    min-height: 300px;
    border: 1px dashed #c2ccd0;
    overflow: hidden;
  }
  i.red{
    margin-right: 8px;
    color: #ff3333;
  }
  .btn-wrap{
    width: 400px;
    height: 40px;
    margin: 32px auto 16px auto;
  }
  h2{
    width: 30%;
    display: contents;
  }
.inputA{
  width: 30%;
}
  .inputA{
    width: 50%;
  }
</style>

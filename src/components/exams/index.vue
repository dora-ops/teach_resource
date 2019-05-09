<template>
  <div id="exam">
    <template>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="共享">共享</el-tab-pane>
        <el-tab-pane label="新建"></el-tab-pane>
        <el-tab-pane label="我的">我的试卷</el-tab-pane>
      </el-tabs>
    </template>

    <div class="goals">
      <div class="left-class">
        <div class="item"><span class="item-name">试卷名称：</span><span>2015级网络工程一班计算机原理第一章课前测试</span></div>
        <div class="item"> <span class="item-name">出卷人：</span><span>柳一博教师</span></div>
        <div class="item"><span class="item-name">试卷合格分：</span><span>50%</span></div>
        <div class="item"><span class="item-name">本人答对率：</span><span style="color: #4cbd74">50%</span></div>
        <div class="item"><span class="item-name">试卷作答时间：</span><span>2019-05-05 00:00:00~2019-05-05 22:00:00</span></div>
        <div class="item"><span class="item-name">本人作答时间：</span><span style="color: #4cbd74">219-05-05 11:08:31</span></div>
      </div>

      <div class="chart">
        <el-progress type="circle" :percentage="50" color="#4cbd74"></el-progress>
      </div>
    </div>
    <div class="detail-content">
      <div class="wrap">
        <span class="topic">姓名：</span>
        <p class="answer">徐洋</p>
      </div>
      <div class="wrap">
        <span class="topic">学号：</span>
        <p class="answer">15131142</p>
      </div>
      <div class="wrap">
        <span class="topic">1-运算器和控制器合称为：</span>
        <div class="answer">
          <el-radio v-model="one_answer" label="1" disabled>主机</el-radio>
          <el-radio v-model="one_answer" label="2" disabled>外设</el-radio>
          <el-radio v-model="one_answer" label="3" disabled>ALU</el-radio>
          <el-radio v-model="one_answer" label="4" disabled class="answer_ok">CPU</el-radio>
        </div>

      </div>
      <div class="wrap">
        <span class="topic">如指令中的地址码就是操作数的有效地址,那么这种寻址方式成为操作数的寻址方式。</span>
        <div class="answer">
          <el-radio v-model="two_answer" label="1" disabled class="answer_ok">对</el-radio>
          <el-radio v-model="two_answer" label="2" disabled>错</el-radio>
        </div>
      </div>
      <div class="wrap">
        <span class="topic">现有一个64K*2位的存储器芯片，欲设计具有同样存储容量的芯片，应如何安排地址线和数据线引脚数目，使两者之和最小。并说明有几种解答。</span>
         <div class="answer">
           <p>解:设地址线x根,数据线y根,则</p>
           <p>2x·y=64K×2</p>
           <p>若 y=1  x=17</p>
           <p>y=2  x=16</p>
           <p>y=4  x=15</p>
           <p>y=8  x=14</p>
           <p>因此,当数据线为1或2时,引脚之和为18</p>
         </div>
      </div>

    </div>

    <router-link to="/exam/new">新建试卷</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "exam",
      data () {
        return {
          one_answer: '1',
          two_answer:'1'
        };
      }
    }
</script>

<style scoped>
  .wrap{
    padding-bottom: 16px;
    border-bottom: 1px dashed #eee;
  }
  .answer_ok .el-radio__label{
    color: #4cbd74 !important;
  }

  .detail-content{
    width: 1136px;
    margin: 16px;
    border:1px dashed #666;

  }
  .detail-content .topic{
    width: 100%;
    height: 32px;
    float: left;
    font-weight: bold;
    font-size: 16px;
    margin-left: 16px;

  }
  .detail-content .answer{
    margin-top: 8px;
    margin-left: 16px;
  }


  .goals{
    width: 1104px;
    height: 190px;
    margin: 16px;
    padding: 16px;
    background: #fafafa;
    border:1px dashed #666;
    overflow: hidden;
  }
  .goals .left-class{
    width: 70%;
    height: 100%;
    float: left;
  }
  .goals .left-class .item{
    width: 100%;
    font-size: 14px;
    line-height: 32px;
    color: #666;
    float: left;
  }
  .goals .left-class .item .item-name{
    float: left;
    width: 120px;
    margin-right: 8px;
    text-align: right;
    display: block;
    font-weight: bold;
  }
  .goals .chart{
    margin-left: 496px;
    height: 100%;

  }
  .is-selected {
    color: #1989FA;
  }
</style>

<template>
  <div>
    <div class="left-menu">
      <el-tabs v-model="partId" :tab-position="tabPosition">
        <el-tab-pane label="所有" name=0>
          <listColumn :total="total"></listColumn>
        </el-tab-pane>
        <el-tab-pane label="信工" name=1>
          <listColumn :total="total"></listColumn>
        </el-tab-pane>
        <el-tab-pane label="美术" name=2>
          <listColumn :total="total"></listColumn>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  import '../assets/css/modelList.css'
  import axios from 'axios'
  import listColumn from '@/components/list-column'
    export default {
        name: "list",
      data(){
          return {
            partId:0,
            tabPosition: 'left',
            total:[],
          }
      },
      components:{
        listColumn
      },
      watch:{
          'partId':function (id) {
            let url='http://localhost:3000/resource?partId='+id;
            if(id==="0")
              url='http://localhost:3000/resource';
            var _this = this;
            axios
              .get(url)
              .then((response) => {
                _this.total = response.data;
              }, () => {
                alert('网络异常，请重新刷新页面');
              });
          }
      },
      methods:{
      },
      created() {
        var _this = this;
        axios
          .get('http://localhost:3000/resource')
          .then((response) => {
            _this.total = response.data;
          }, () => {
            alert('网络异常，请重新刷新页面');
          });
      }
    }
</script>

<style scoped>
  .wrap{
    width: 886px;
    overflow: hidden;
    float: right;
  }
  .wrap .totalNum{
    width: 886px;
    height: 32px;
    font-size: 14px;
    color: #eee;
  }
</style>

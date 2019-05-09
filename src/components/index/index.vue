<template>
  <div>
    <div class="search-input-wrap">
      <div class="search-wrap"></div>
      <searchInput v-on:formSubmit="searchText"></searchInput>
      <searchHistory v-text="searchedText"></searchHistory>
    </div>
    <div class="authority-box">
      <h3>权威发布<span class="tip">已有<b>15284</b>家机构入驻精品文库，分享权威资料</span></h3>
      <authorityBox></authorityBox>
    </div>
    <div class="splice-bar">
      <div><span></span></div>
      <div><span></span></div>
    </div>
    <div class="resourceList">
      <!--上传教案-->
      <el-button type="primary" @click="uploadVisiable = true" style="float: right">上传教案</el-button>
      <el-dialog title="新增教案" :visible.sync="uploadVisiable" width="400px">
          <el-form
          :model="addDate"
          :rules="addRules"
          ref="addForm">
          <el-form-item label="教案名称"  prop="name">
            <el-input v-model="addDate.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="教案简介"  prop="intro">
            <el-input v-model="addDate.intro" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院"  prop="sort">
            <el-select v-model="addDate.sort" placeholder="请选择学院">
              <el-option v-for="major in majorList" :label="major.name" :value="major.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件">
            <el-upload
              class="upload-demo"
              action="http://localhost:3000/resouceFiles"
              :http-request="upLoad"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不能超过100M</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="uploadVisiable = false">取 消</el-button>
          <el-button type="primary" @click="uploadFile(addDate)">确 定</el-button>
        </div>
      </el-dialog>
      <!--资源列表-->
      <ModelList></ModelList>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import '../../assets/css/style.css'
  import '../../assets/css/index/authority-box.css'
  import authorityBox from '@/components/index/authorityBox'
  import searchInput from '@/components/index/searchInput'
  import searchHistory from '@/components/index/searchHistory'
  import ModelList from '@/components/list'

  export default {
    name: 'HelloWorld',
    data:function(){
      return {
        searchedText:"",
        fileList: [{name:'',url:''}],
        uploadVisiable:false,
        addDate:{
          name:'',
          type:'rar',
          intro:'',
          author:'徐洋',
          authorId:8825,
          partName:'',
          partId:'',
          time:'',
          score:0,
          commentNum:0
        },
        majorList:[
          {name:'信工院'},
          {name:'美术院'}
        ],
        addRules:{
          name:[
            {required:true,message:'请输入教案名称',trigger:'blur'}
          ],
          major_name:[
            {required:true,message:'请选择学院分类',trigger:'change'},
          ],
          file:[
            {required:true,message:'请上传文件',trigger:'change'},
          ]
        }
      }
    },
    components:{
      searchInput,
      searchHistory,
      authorityBox,
      ModelList
    },
    methods:{
      //上传文件
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      upLoad(file){
        const formData = new FormData();
        formData.append('file',file.file);
        axios.post('http://localhost:3000/resouceFiles',formData);
      },
      uploadFile(addDate){
        this.uploadVisiable=false;
        addDate.file=this.fileList.url;
        if(addDate.intro==="")
          addDate.intro="无";
        addDate.time=this.formDate();
        if(addDate.partName==="信工")
          addDate.partId=1;
        else addDate.partId=2;

        axios
          .post('http://localhost:3000/resource',addDate)
          .then((response)=>{
            alert(response.statusText);
            window.location.reload();
          },() => {
            alert('网络异常，请重试');
            window.location.reload();
          })
      },
      //搜索资源
      searchText:function (text,lang) {
        axios
          .get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190220T024135Z.d5275f0d13a3243a.ab4eabf2c2ddb1d7fc63bf4c1a1dde4837aabed0&lang='+lang+'&text='+text)
          .then((response)=>{
            this.searchedText=response.data.text[0];
          },function (data) {
            console.log(data);
            alert(data.message);
          });
        return false;
      },
      getNow:function(s){
        return s < 10 ? '0' + s: s;
      },
      //获得当前格式化时间
      formDate:function () {
        var myDate = new Date();
      //获取当前年
        var year=myDate.getFullYear();
      //获取当前月
        var month=myDate.getMonth()+1;
      //获取当前日
        var date=myDate.getDate();
        var h=myDate.getHours();       //获取当前小时数(0-23)
        var m=myDate.getMinutes();     //获取当前分钟数(0-59)
        var s=myDate.getSeconds();

        var now=year+'-'+this.getNow(month)+"-"+this.getNow(date);
        return now;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*搜索框*/
  .search-input-wrap{
    position: relative;
  }
  .search-wrap {
    width: 100%;
    height: 272px;
    background: url("../../assets/images/bg.jpg") no-repeat;
    background-size: 100% 100%;
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
  /*资源列表*/
  .resourceList{
    width: 100%;
    min-height: 120px;
    margin-top: 16px;

  }
</style>

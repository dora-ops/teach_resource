<template>
  <div>

    <el-tabs :tab-position="tabPosition">

      <el-tab-pane label="用户">
        <!---->
        <div class="searchWrap">
          <el-input
            class="searchInput"
            placeholder="请输入用户名称"
            v-model="searchName"
            clearable>
          </el-input>
          <el-select
            clearable
            class="searchSelect"
            v-model="searchClassValue"
            placeholder="请选择班级">
            <el-option
              v-for="item in classes"
              :key="item.classId"
              :label="item.className"
              :value="item.classId">
            </el-option>
          </el-select>
          <el-button @click.prevent="searchItem(searchClassValue,searchName,'users')">查询用户</el-button>
          <el-button @click.prevent="needUser" type="primary">添加新用户</el-button>
        </div>
        <!---->
        <div v-show="needEditUser">
          <el-dialog title="编辑用户信息" type="text" :visible.sync="needEditUser" width="400px">
            <label>头像:</label>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/userPics"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <div class="inputBar">
              <label>角色:</label>
              <el-radio v-model="user.type" label="1">教师</el-radio>
              <el-radio v-model="user.type" label="2">学生</el-radio>
            </div>

            <div class="inputBar">
              <label>所属班级:</label>
              <el-select v-model="user.classId" filterable placeholder="请选择">
                <el-option
                  v-for="item in classes"
                  :key="item.classId"
                  :label="item.className"
                  :value="item.classId">
                </el-option>
              </el-select>
            </div>

            <div class="inputBar">
              <label>真实姓名:</label>
              <input type="text" v-model="user.realName" maxlength="10">
            </div>

            <div class="inputBar">
              <label>账号:</label>
              <input type="text" v-model="user.name" maxlength="10">
            </div>

            <div class="inputBar">
              <label>密码</label>
              <input type="password" v-model="user.password" maxlength="6">
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="needEditUser=false">取消</el-button>
              <el-button @click="newUser" type="primary">确认</el-button>
            </div>
          </el-dialog>
        </div>
        <!---->
        <el-table
          class="userList"
          :data="users"
          height="520"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="imageUrl"
            label="头像"
            width="100">
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" v-on:error.once="moveErrorImg($event)" alt="" class="hasImage">
            </template>
          </el-table-column>
          <el-table-column
            prop="realName"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="账号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="160">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="角色"
            width="80">
          </el-table-column>
          <el-table-column
            prop="teacherName"
            label="绑定老师"
            width="100">
          </el-table-column>
          <el-table-column
            prop="className"
            label="所在班级"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-button
                @click.prevent="editUser(scope.row.id,scope.row.name,scope.row.password,scope.row.type,scope.row.classId,scope.row.realName,scope.row.imageUrl)"
                type="text" size="small">编辑
              </el-button>
              <el-button @click.prevent="deleItem(scope.row.id,'user')" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="教案">
        <!---->
        <div class="searchWrap">
          <el-input
            class="searchInput"
            placeholder="请输入资源名称"
            v-model="searchResourceName"
            clearable>
          </el-input>
          <el-select
            class="searchSelect"
            v-model="searchMajorValue"
            placeholder="请选择专业">
            <el-option
              v-for="item in searchMajorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button @click.prevent="searchItem(searchMajorValue,searchResourceName,'resources')">查询资源</el-button>
          <el-button @click.prevent="deleteItems()" type="primary">批量删除</el-button>
        </div>
        <!---->
        <el-table
          class="resourceTable"
          :data="resources"
          height="520"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            width="55"
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            width="340"
            prop="name"
            label="名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            width="140"
            prop="partName"
            label="分类">
          </el-table-column>
          <el-table-column
            width="140"
            prop="author"
            label="作者">
          </el-table-column>
          <el-table-column
            width="160"
            prop="time"
            label="时间">
          </el-table-column>
          <el-table-column
            width="100"
            prop="score"
            label="评分">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button type="text" @click.prevent="deleItem(scope.row.id,'resource')">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "back",
    data() {
      return {
        tabPosition: 'left',
        users: [],
        resources: [],
        classes:[],
        itemSelection: [],
        user: {
          name: '',
          password: '',
          type:'',
          teacher:'',
          classId:'',
          realName: '',
          imageUrl: '',
        },
        needEditUser: false,
        searchName: '',
        searchResourceName: '',
        searchMajorOptions: [{
          value: '0',
          label: '所有'
        }, {
          value: '1',
          label: '信工院'
        }, {
          value: '2',
          label: '美术院'
        }, {
          value: '3',
          label: '电子院'
        }, {
          value: '4',
          label: '商学院'
        }],
        searchClassValue:'',
        searchMajorValue: '0',
      }
    },
    created() {
      this.getData('http://localhost:3000/users', 'users');
      this.getData('http://localhost:3000/resource', 'resources');
      this.getData('http://localhost:3000/classes','classes');
    },
    methods: {
      //需要新增或编辑
      needUser: function () {
        this.user ={};
        this.needEditUser = true;

      },
      //执行新增或编辑
      newUser: function () {
        var _this = this, url = "http://localhost:3000/users";
        if (_this.user.id) {
          url = url + '/' + _this.user.id;
          axios
            .put(url, _this.user)
            .then((response) => {
              alert('编辑成功'+response.statusText);
              // window.location.reload();
            }, () => {
              alert('网络异常');
              // window.location.reload();
            });
        } else {
          axios
            .post(url, _this.user)
            .then((response) => {
              alert('添加成功'+response.statusText);
              // window.location.reload();
            }, () => {
              alert('网络异常');
              // window.location.reload();
            });
        }
      },
     //搜索
      searchItem: function (id, name, type) {
        var url = '';

        if (type === "users") {
          if (name === ""){
            if(id === "")
              url = 'http://localhost:3000/users';
            else url = 'http://localhost:3000/users?classId='+id;
          }
          else{
            if(id === "")
              url = 'http://localhost:3000/users?name=' + name;
            else url = 'http://localhost:3000/users?name=' + name+"&classId="+id;
          }
        }

        if (type === "resources") {
          if (id === "0") {
            if (name === "")
              url = 'http://localhost:3000/resource';
            else
              url='http://localhost:3000/resource?name='+name;
          }else{
            if(name==="")
              url='http://localhost:3000/resource?partId='+id;
            else
              url='http://localhost:3000/resource?partId='+id+'&name='+name;
          }
        }

        this.getData(url, type);
      },
      handleSelectionChange(val) {
        this.itemSelection = val;
      },
      moveErrorImg: function (event) {
        event.currentTarget.src = "../../assets/images/img-empty.png";
      },
      //上传头像
      handleAvatarSuccess(res, file) {
        this.user.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //删除
      deleItem: function (id, ItemType) {
        var txt = "您确定删除该用户吗？";

        if (ItemType === "resource")
          txt = "您确定删除该资源吗？";
        if (confirm(txt))
          this.deleAxios(id, ItemType);
      },
      //批量删除
      deleteItems:function(){

        for(var i=0;i<this.itemSelection.length;i++){
          var url="http://localhost:3000/resource?id="+this.itemSelection[i].id;
          axios
            .delete(url)
            .then((response) => {
              alert(response.statusText);
              window.location.reload();
            }, () => {
              alert('网络异常，请重试');
            });
        }
      },
      //编辑
      editUser: function (id, name, password,type,classId, realName, imageUrl) {
        this.needEditUser = true;
        this.user.id = id;
        this.user.name = name;
        this.user.realName = realName;
        this.user.password = password;
        this.user.type = type;
        this.user.classId = classId;
        this.user.imageUrl = imageUrl;
      },
      //axios删除
      deleAxios: function (id, ItemType) {
        var url = 'http://localhost:3000/users/' + id;
        if (ItemType === "resource")
          url = 'http://localhost:3000/resource/' + id;
        axios
          .delete(url)
          .then((response) => {
            alert('删除成功'+response.statusText);
            // window.location.reload();
          }, () => {
            alert('网络异常，请重试');
          });
      },
      //获取数据
      getData: function (url, type) {
        axios
          .get(url)
          .then((response) => {
            if (type === "users")
              this.users = response.data;
            else if(type === 'resources')
              this.resources = response.data;
            else this.classes = response.data;
          }, () => {
            console.log('网络异常，请重新刷新页面');
          })
      }
    }
  }
</script>

<style scoped>
  table {
    margin: 0 auto;
    text-align: center;
    border: 1px solid #eee;
    width: 886px;
  }

  tr {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }

  .userList td {
    width: 60px;
  }

  .resourceList td {
    width: 80px;
  }


  tr:nth-child(2n+1) {
    background: #F2F2F2;
  }

  /*编辑弹窗中有label和input的div*/
  .inputBar {
    width: 100%;
    height: auto;
    margin-bottom: 8px;
    float: left;
  }

  .inputBar label {
    float: left;
    margin-right: 8px;
    width: 17%;
    text-align: right;
    line-height: 36px;
  }

  .inputBar input {
    float: left;
    width: calc(80% - 8px);
  }

  /*查询的输入框*/
  .searchWrap {
    width: 100%;
    margin: 16px 0;
  }

  .searchWrap .searchInput {
    width: 160px;
    margin-right: 16px;
  }

  .searchWrap .searchSelect {
    margin-right: 16px;
  }

  /*表格中的头像显示*/
  td .hasImage {
    width: 24px;
    height: 24px;
    border: none;
  }

  /*上传头像*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

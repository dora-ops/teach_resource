<template>
  <div>

    <div class="left-menu">
      <div class="title-wrap">
        <img src="../../assets/images/12.jpg" alt="">
        <span>洋洋洋</span>
      </div>
      <el-button @click.prevent="dialogVisible = true" style="width:117px;margin:16px auto 0 24px;">背景设置<i
        class="el-icon-edit el-icon--right"></i></el-button>

      <el-button  style="width:117px;margin:16px auto 0 24px;">我的试卷<i
        class="el-icon-document el-icon--right"></i></el-button>
    </div>
    <!--    -->
    <div class="right-menu">

      <el-calendar :range="['2019-04-01', '2019-04-30']"></el-calendar>

      <div>
        <h2 style="color: #666;">您所在班级为 15网络工程1班，该班教师有
          <el-button type="text" style="font-size: 22px">柳一博教师</el-button>
          <el-button type="text" style="font-size: 22px">王艺苑教师</el-button>
          。
        </h2>
        <h3 style="color: #666;">您完成的试卷共
          <el-button type="text" style="font-size: 22px">2</el-button>
          份。
        </h3>
      </div>


      <div class="block">

        <el-card shadow="hover">
          <h4>创建 <span>2015级网络工程一班计算机原理第一章课前测试</span> 试卷</h4>
          <p>柳一博教师 提交于 2019/05/03 13:40</p>
        </el-card>

        <el-card >
          <h4>创建 <span>15网工1班大一英语作文1</span> 试卷</h4>
          <p>王艺苑教师 提交于 2019/05/02 13:40</p>
        </el-card>

        <el-card shadow="hover">
          <h4>创建 <span>15网工1班大一英语一期</span> 教案</h4>
          <p>王艺苑教师 提交于 2019/05/02 17:51</p>
        </el-card>

        <el-card shadow="hover">
          <h4>创建 <span>英语四六级作文项提高</span> 教案</h4>
          <p>王艺苑教师 提交于 2019/05/02 17:32</p>
        </el-card>

        <el-card shadow="hover">
          <h4>创建 <span>15网工1班大一英语一期</span> 教案</h4>
          <p>王艺苑教师 提交于 2019/05/02 17:08</p>
        </el-card>

        <el-card shadow="hover">
          <h4>创建 <span>大学英语与信息化建设</span> 教案</h4>
          <p>王艺苑教师 提交于 2019/05/02 16:41</p>
        </el-card>
      </div>

    </div>


    <el-dialog
      title="风格设置"
      :visible.sync="dialogVisible"
      width="30%">
      <span>选择您喜欢的风格吧~</span>
      <el-row>
        <el-button @click.prevent="setStyle(1)" style="background: #aacf53;color: #fff;border: none">抹茶</el-button>
        <el-button @click.prevent="setStyle(2)" style="background: #F8D800;color: #fff;border: none">晴朗</el-button>
        <el-button @click.prevent="setStyle(3)" style="background: #47885e;color: #fff;border: none">森林</el-button>
        <el-button @click.prevent="setStyle(4)" style="background: #ae7c58;color: #fff;border: none">焦糖</el-button>
        <el-button @click.prevent="setStyle(5)" style="background: #2b2b2b;color: #fff;border: none">暗黑</el-button>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <!--    <el-button type="primary" @click.prevent="dialogLogin = true">登录/注册</el-button>-->

    <el-dialog title="注册" :visible.sync="dialogLogin" width="320px">
      <form @submit="login">

        <label v-show="needSign"><i>*</i>头像:</label>
        <el-upload
          v-show="needSign"
          class="avatar-uploader"
          action="http://localhost:3000/users"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <label v-show="needSign"><i>*</i>真实姓名:</label>
        <input type="text" v-model="realName" v-show="needSign" maxlength="10" autocomplete="off">

        <label><i>*</i>账号:</label>
        <input type="text" v-model="username" maxlength="10" autocomplete="off">

        <label><i>*</i>密码</label>
        <input type="password" v-model="password" maxlength="6" autocomplete="off">

        <label><i>*</i>班级</label>
        <el-select v-model="classId" placeholder="请选择所在班级" style="margin-top: 8px">
          <el-option
            v-for="item in classes"
            :key="item.value"
            :label="item.className"
            :value="item.classId">
          </el-option>
        </el-select>

        <div class="btn-wrap">

          <el-button @click.prevent="singup" v-if="canSign" style="margin-left: 8px">注册</el-button>
          <el-button @click.prevent="singup" v-else disabled style="margin-left: 8px">注册</el-button>

          <el-button @click.prevent="login" v-if="canLogin">登录</el-button>
          <el-button @click.prevent="login" v-else disabled>登录</el-button>
        </div>


        <p v-show="showLoginError" style="color: red">{{errorTxt}}</p>
      </form>
    </el-dialog>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "self",
    data() {
      return {
        dialogLogin: false,
        dialogVisible: false,
        backgroundColor: '',
        imageUrl: '',
        username: "",
        password: "",
        realName: "",
        needSign: false,
        showLoginError: false,
        errorTxt: "用户名或密码错误，请重新输入。",
        canLogin: false,
        canSign: true,
        logined: false,
        classId: null,
        classes: [
          {classId: 1, className: '15级网络工程1班'},
          {classId: 2, className: '15级网络工程2班'}
        ]
      }
    },
    watch: {
      newVal(newVal) {

      }
    },
    computed: {
      newVal() {

        if (this.username !== "" && this.password !== "" && !this.needSign)
          this.canLogin = true;
        else this.canLogin = false;

        if (this.needSign) {
          if (this.username !== "" && this.password !== "" && this.realName !== "")
            this.canSign = true;
          else this.canSign = false;
        }


      }
    },
    methods: {
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // },
      //换背景

      singup: function () {
        var _this = this;
        if (!_this.needSign) {
          _this.needSign = true;
        } else {
          if (!_this.checkName(_this)) {
            _this.signAxiox(_this);
            _this.canSign = false;
          } else {
            _this.errorTxt = "账号含特殊字符，请重新输入";
            _this.showLoginError = true;
          }
        }
      },
      login: function () {
        var _this = this;

        _this.canLogin = false;
        _this.loginAxios(_this);
      },
      checkName: function (_this) {
        var pattern = new RegExp("[`~·!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
        if (pattern.test(_this.username)) {
          return true;
        }
        return false;
      },
      loginAxios: function (_this) {
        axios
          .get('http://localhost:3000/users')
          .then((response) => {
            var data = response.data;

            for (var i = 0; i < data.length; i++) {
              if (data[i].name === _this.username && data[i].password === _this.password) {
                i = data.length;
                _this.logined = true;
              }
            }
            if (_this.logined) {
              alert('登陆成功');
              _this.username = "";
              _this.password = "";
              _this.canLogin = false;
              window.location.reload();
            } else {
              _this.username = "";
              _this.password = "";
              _this.showLoginError = true;
            }

          }, () => {
            alert('网络异常，请重试。')
          });
      },
      signAxiox: function (_this) {
        axios
          .post('http://localhost:3000/users', {
            name: _this.username,
            password: _this.password,
            realName: _this.realName,
            imageUrl: _this.imageUrl
          })
          .then((response) => {
            var data = response.data;

            alert("您好" + data.realName + ",您的账号已经注册成功。账号为" + data.name + "，密码为" + data.password);
            window.location.reload();

          }, () => {
            alert('网络异常，请重试');
          });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
      }
    }
  }
</script>

<style scoped>
  h4{
    font-weight: normal;
  }
  h4 span{
    font-weight: bold;
  }
  .el-card {
    margin-bottom: 8px;
  }

  .left-menu {
    float: left;
    width: 160px;
    height: 100%;
    background: #fafafa;
    overflow: hidden;
    border-right: 1px dashed #eee;
  }

  .right-menu {
    float: left;
    width: 976px;
    height: 100%;
    overflow: hidden;
    padding: 32px 16px;

  }

  .title-wrap {
    width: 128px;
    height: 48px;
    float: left;
    padding: 32px 16px;
  }

  .title-wrap img {
    float: left;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    vertical-align: middle;

  }

  .title-wrap span {
    float: left;
    height: 64px;
    margin-left: 8px;
    line-height: 64px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }

  label {
    margin-bottom: 8px;
  }

  label i {
    color: #ff3333;
    margin-right: 4px;
  }

  .el-dialog {
    overflow: hidden;
  }

  .btn-wrap {
    width: 100%;
    height: 40px;
    margin-top: 16px;
    margin-bottom: 16px;
    float: left;
  }

  .btn-wrap button {
    float: right;
  }

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

<template>
  <div>
    <div class="wrap">
      <!--头部标题-->
      <div class="top-info">
        <div class="top-info-wrap">
          <div class="part-nav">{{detail.partName}}</div>
          <h1>{{detail.name}}</h1>{{detail.author}}
          <div class="second-info">
            <span></span></div>
          {{detail.time}}
        </div>
        <el-rate
          v-model="detail.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        评论数:{{detail.commentNum}}
      </div>
      <!--内容栏-->
      <div class="content-wrap">
        <div class="file-img">
          {{detail.file}}
        </div>
        <div class="right-intro"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "detail",
    data() {
      return {
        detail: [],
        id: this.$route.params.id
      }
    },
    created() {
      axios
        .get('http://localhost:3000/resource?id=' + this.id)
        .then((response) => {
            this.detail = response.data[0];
          },
          () => {
            alert('网络异常');
          })
    }
  }
</script>

<style scoped>
  .top-info {
    width: 100%;
    margin-bottom: 16px;
  }

  .top-info-wrap {
    padding: 24px 16px;
  }

  .top-info-wrap .part-nav {
    width: 68px;
    height: 32px;
    line-height: 32px;
    background: #ff9800;
    color: #fff;
    border-radius: 4px;
    margin-right: 16px;
    text-align: center;
    float: left;
  }
  .top-info-wrap h1{
    float: left;
    display: contents;
    line-height: 32px;
  }
</style>

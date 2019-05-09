<template>
    <div class="wrap-wrap">
      <div class="wrap" v-if="total.length">
        <div class="totalNum">共有{{total.length}}个资源</div>
        <div class="file-column ng-scope" v-for="i in total">
          <div class="file-portal res-lg-zip">
          </div>
          <div class="file-title">
            <a :title="i.name" @click="clickDetail(i.id)" class="file-tit ng-binding" target="_blank">{{i.name}}</a>
            <el-rate
              v-model="i.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <div class="file-info">
            <div class="one">
              <span>分享人：</span>
              <a :href="'/self/'+i.authorId" class="file-author">{{i.author}}</a>
              <a href="javascript:void(0)" :data-partId="i.partId" class="">{{i.partName}}</a>
            </div>
            <div class="two">
              {{i.intro}}
            </div>
            <div class="three">
              <span><i class="icon icon-time"></i><span>{{i.time}}</span></span>
              <span><i class="icon icon-comment"></i><span>{{i.commentNum}}</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="nodata" v-else>
        <img src="" alt="">
        <p>Opps,这里没东西给你看啦</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "list-column",
      props:{
          total:{
            type:Array,
            required:true
          }
      },
      methods:{
        clickDetail:function (id) {
          this.$router.push({name:'detail',params:{id:id}});
        }
      }
    }
</script>

<style scoped>
.wrap-wrap{
  margin-left: 64px;
}
</style>

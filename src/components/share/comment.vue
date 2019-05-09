<template>
  <div id="comment">
    <textarea cols="30" rows="10" v-model="commentText" maxlength="100">{{commentText}}</textarea>
    <button type="button" v-on:click.prevent="submitMyComment">评论</button>
    <hr>
    <div id="comment-area">
      <h2>评论区</h2>
      <p>总评论数：{{totalCommentedNum}}</p>
      <div v-for="i in commentedList">
        <span>{{i.id}}</span>
        <span>{{i.body}}</span>
        <button v-on:click.prevent="deleComment(i.id)">删除</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "comment",
    data() {
      return {
        commentText: "",
        totalCommentedNum: "",
        commentedList: []
      }
    },
    methods: {
      submitMyComment: function () {

        var id = this.totalCommentedNum + 1;
        axios.post('http://localhost:3000/comments', {id: id, body: this.commentText, postId: id})
          .then(data=>{
            var data=data.data;
            this.commentedList.push(data);
            this.totalCommentedNum++;
          }, function () {
            alert("网络异常");
          });
      },
      deleComment: function (id) {
        axios.delete('http://localhost:3000/comments/' + id).then(function () {
            window.location.reload();
          },
          function () {
            alert("网络异常");
          }
        )
      }
    },
    created() {

      axios
        .get("http://localhost:3000/comments")
        .then(data=>{
          var data=data.data;
          this.totalCommentedNum = data.length;
          this.commentedList = data;
        }, function () {
          alert("网络异常");
        })
    }
  }
</script>

<style scoped>

</style>

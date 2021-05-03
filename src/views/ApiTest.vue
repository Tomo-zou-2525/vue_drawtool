<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <td>ID</td>
          <td>Title</td>
          <td>Contets</td>
        </tr>
      </thead>
      <tbody>
        <!-- 登録情報を表示 -->
        <tr v-for="content in contents" :key="content.id">
          <td>{{ content.id }}</td>
          <td>{{ content.title }}</td>
          <td>{{ content.body }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <h4>こんにちは 投稿内容を入力してください</h4>
      <form class="form-contents">
        <!-- 投稿タイトルをバインド -->
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="posts.title"
          type="text"
          placeholder="Enter Title"
        ></b-form-input>
        <br />
        <!-- 投稿内容をバインド -->
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="posts.body"
          type="text"
          placeholder="Enter Content"
        ></b-form-input>
      </form>
      <br />
      <button type="button" @click="postPosts()">投稿</button>
    </div>
  </div>
</template>
<script>
//axiosをインポート
import axios from "axios";

export default {
  data() {
    return {
      //jsonファイルが持つcontentを表示させる空の配列を作る
      contents: [],
      //title,authorを保存させる空のデータを作る
      posts: {
        title: "",
        body: "",
      },
    };
  },
  mounted() {
    this.getContents();
  },
  methods: {
    //コンテンツを取得
    getContents() {
      const url = "http://localhost:3000/contents";
      //Promiseで記述
      axios
        .get(url)
        .then((res) => {
          this.contents = res.data;
        })
        .catch(() => {
          console.error("Error!!!!!!");
        });
    },
    //async-awaitで記述
    async postPosts() {
      //urlを定数に代入
      const url = "http://localhost:3000/posts";
      //awaitでpost リクエストを先に流す
      await axios.post(url, this.posts);
      //連続してawaitでgetメソッドを流す
      const response = await axios.get(url);
      // 再取得した結果を代入
      this.contents = response.data;
      this.$swal("保存に成功しました", "クリックしてください", "success");
    },
  },
};
</script>

<style>
.form-contents {
  width: 28.6remx;
  margin: 0 auto;
}

.table {
  width: 100%;
}

.thead-dark {
  background-color: #333;
  height: 4.3rem;
  width: 100%;
  color: #fff;
  font-size: 1.42rem;
}
</style>

<template>
  <div>
    <div id="nav-bar">
      <!-- 各種ツールをボタンタグで配置 -->
      <div id="tool-area" style="inline">
        <span>{{ drawtool }}</span>
        <v-swatches v-model="color" />
        <button id="select-pen_black" class="button-style" @click="drawLine()">
          Pen
        </button>
        <button id="select-eraser" class="button-style" @click="doEraser">
          Eraser
        </button>
        <button id="all-delete" class="button-style" @click="clearCanvas">
          Delete
        </button>
        <button id="download" class="button-style" @click="download">
          Download
        </button>
      </div>
    </div>
    <div id="canvas-area" class="canvas-map">
      <!-- 9行目＝canvasタグ内にeraserクラスをバインドする処理 -->
      <!-- 10行目〜＝canvas要素に範囲の指定とイベント毎v-onディレクティブの設定 -->
      <canvas
        id="draw-area"
        v-bind:class="{ doEraser: drawtool === 'doEraser' }"
        @mousedown="paintStart"
        @mouseout="paintEnd"
        @mouseup="paintEnd"
        @mousemove="draw"
        height="1000px"
        width="1409px"
      ></canvas>
    </div>
  </div>
</template>

<script>
import VSwatches from "vue-swatches";
import "vue-swatches/dist/vue-swatches.css";

// グローバルコンポーネントの設定
export default {
  // コンポーネントの指定
  name: "Home",
  // コンポーネントの挿入
  components: { VSwatches },
  // 使用するデータの定義
  data() {
    // 空のcanvas,contextを用意
    return {
      canvas: null,
      context: null,
      // ドラッグ状態かを判定するフラグ
      isDrag: false,
      // 現在の状態を表すパラメータ・drawtoolを追加
      drawtool: "drawing",
      color: this.COLOR_BLACK,
    };
  },
  // マウント要素を指定
  mounted() {
    //描画色のパラメータを定数化
    const COLOR_BLACK = "#000";

    //描画状態のパラメータを定数化
    const DRAW_MODE_PEN = "drawing";
    console.log(DRAW_MODE_PEN);

    //描画状態のパラメータを定数化
    const DRAW_MODE_ERASER = "doEraser";
    console.log(DRAW_MODE_ERASER);

    // canvas要素の取得（マウント）
    this.canvas = document.querySelector("#draw-area");
    // canvasの画像要素指定
    this.context = this.canvas.getContext("2d");
    // 線の端に丸みを帯びさせる・canvasの要素
    this.context.lineCap = "round";
    // 線の結合箇所を指定→round(丸みを帯びる)
    this.context.lineJoin = "round";
    // 線の太さを指定
    this.context.lineWidth = 5;
    // 線のスタイルに色を指定
    this.context.strokeStyle = COLOR_BLACK;
  },
  methods: {
    //描画
    draw: function(e) {
      // layerX or layerY （現在の座標を取得）
      let x = e.layerX;
      let y = e.layerY;

      // ドラッグ中かを判定するif文
      if (!this.isDrag) {
        return;
      }
      // 直前の座標から現在までに線を引く
      this.context.lineTo(x, y);
      // 線を描画する
      this.context.stroke();
    },
    //描画開始(mousedown)
    paintStart: function(e) {
      let x = e.layerX;
      let y = e.layerY;

      // 描画の開始点
      this.context.beginPath();
      // 開始点からの座標を出し、現在地まで線を引っ張る
      this.context.lineTo(x, y);
      // 線を描画する
      this.context.stroke();

      // ドラッグ中かどうかの判定
      this.isDrag = true;
    },
    // 描画終了
    paintEnd: function() {
      this.context.closePath();
      this.isDrag = false;
    },
    clearCanvas: function() {
      // cleaRect:四角形の形にクリアにするメソッド
      // cleaRect(x, y, w, h) x,yは座標原点、w,hは四角形の幅
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawLine: function() {
      this.drawtool = this.DRAW_MODE_PEN;

      // 描画スタイルの設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = this.color;
    },
    doEraser: function() {
      this.drawtool = this.DRAW_MODE_ERASER;

      // 描画スタイルの設定
      this.context.lineCap = "square";
      this.context.lineJoin = "square";
      this.context.lineWidth = 30;
      this.context.strokeStyle = "#fff";
    },
    // download属性を使用してダウンロードファイルを生成
    download: function() {
      let link = document.createElement("a");
      link.href = this.canvas.toDataURL("image/png");
      link.download =
        "お絵かき記録-" +
        new Intl.DateTimeFormat("ja-JP-u-ca-japanese", { era: "long" }).format(
          new Date()
        ) +
        ".png";
      link.click();
    },
  },
};
</script>

<style scoped>
#nav-bar {
  background-color: #333;
  height: 4.28rem;
  width: 100%;
}

.canvas-map {
  background-image: linear-gradient(0deg, transparent 31px, #333 2.28rem),
    linear-gradient(90deg, transparent 2.21rem, #333 0.2rem);
  background-color: #e6e3ad;
  background-size: 2.28rem 2.28rem;
  height: 100%;
  width: 100%;
}

/* 消しゴム要素の画像指定 */
.doEraser {
  cursor: url(../assets/image/eraser.png) 50 50, auto;
}

.button-style {
  margin-left: 0.8rem;
  background-color: #ddd;
  font-size: 1.4em;
  font-weight: bold;
  padding: 0.8rem 2.4rem;
  display: inline;
}
</style>

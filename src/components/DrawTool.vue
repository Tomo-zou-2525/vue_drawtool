<template>
  <div>
    <div id="nav-bar">
      <!-- 各種ツールをボタンタグで配置 -->
      <div id="tool-alea" style="inline">
        <button id="select-pen_black" class="button-style" @click="penBlack">
          Pen(Black)
        </button>
        <button id="select-pen_blue" class="button-style" @click="penBlue">
          Pen(Blue)
        </button>
        <button id="select-pen_red" class="button-style" @click="penRed">
          Pen(Red)
        </button>
        <button id="select-eraser" class="button-style" @click="doEraser">
          Eraser
        </button>
        <button id="all-delete" class="button-style" @click="doDelete">
          Delete
        </button>
        <button id="download" class="button-style" @click="download">
          Download
        </button>
      </div>
    </div>
    <div id="canvas-area">
      <!-- 9行目＝canvasタグ内にeraserクラスをバインドする処理 -->
      <!-- 10行目〜＝canvas要素に範囲の指定とイベント毎v-onディレクティブの設定 -->
      <canvas
        id="draw-area"
        v-bind:class="{ doEraser: canvasMode === 'doEraser' }"
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
// グローバルコンポーネントの設定
export default {
  // コンポーネントの指定
  name: "DrawTool",
  // 使用するデータの定義
  data() {
    // 空のcanvas,contextを用意
    return {
      canvas: null,
      context: null,
      // ドラッグ状態かを判定するフラグ
      isDrag: false,
      // 現在の状態を表すパラメータ・canvasModeを追加
      canvasMode: "penBlack"
    };
  },
  // マウント要素を指定
  mounted() {
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
    this.context.strokeStyle = "#000";
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
    doDelete: function() {
      // cleaRect:四角形の形にクリアにするメソッド
      // cleaRect(x, y, w, h) x,yは座標原点、w,hは四角形の幅
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    penBlack: function() {
      // カーソル：描画モード(黒色のペン)
      this.canvasMode = "penBlack";

      // 描画スタイルの設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#000";
    },
    penBlue: function() {
      // カーソル：描画モード(青色のペン)
      this.canvasMode = "penBlack";

      // 描画スタイルの設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#00ff";
    },
    penRed: function() {
      // カーソル：描画モード(赤色のペン)
      this.canvasMode = "penRed";

      // 描画スタイルの設定
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.strokeStyle = "#ff0000";
    },
    doEraser: function() {
      this.canvasMode = "doEraser";

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
      link.download = "canvas-" + new Date().getTime() + ".png";
      link.click();
    }
  }
};
</script>

<style scoped>
#nav-bar {
  background-color: #333;
  height: 60px;
  width: 100%;
}

/* canvas要素内の枠組み */
#draw-area {
}
/* 消しゴム要素の画像指定 */
.doEraser {
  cursor: url(../assets/image/eraser.png) 50 50, auto;
}

.button-style {
  margin-left: 10px;
  background-color: #ddd;
  font-size: 1.4em;
  font-weight: bold;
  padding: 10px 30px;
  display: inline;
}
</style>

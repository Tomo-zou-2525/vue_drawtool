<template>
  <div>
    <h1>DrawTool</h1>
    <div id="canvas-area">
      <!-- canvas要素に範囲とv-onディレクティブの設定 -->
      <canvas
        id="draw-area"
        v-bind:class="{ eraser: canvasMode === 'eraser' }"
        width="500px"
        height="500px"
        @mousedown="paintS"
        @mouseup="paintE"
        @mouseout="paintE"
        @mousemove="draw"
      ></canvas>
    </div>
    <div id="tool-alea">
      <button id="all-delete" @click="doDelete">Delete</button>
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
    // なぜリターン？→data()が関数となっているので、戻り値を返す必要があるため
    return {
      canvas: null,
      context: null,
      isDrag: false
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
    paintS: function(e) {
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
    paintE: function() {
      this.context.closePath();
      this.isDrag = false;
    },
    doDelete: function() {
      // cleaRect:四角形の形にクリアにするメソッド
      // cleaRect(x, y, w, h) x,yは座標原点、w,hは四角形の幅
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
};
</script>


<style scoped>
#draw-area {
  border: 1px solid #000;
}
</style>>



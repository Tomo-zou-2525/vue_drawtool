<template>
  <div>
    <h1>DrawTool</h1>
    <div id="canvas-area">
      <canvas
        id="draw-area"
        width="500px"
        height="500px"
        @mousedown="paintS"
        @mouseup="paintE"
        @mouseout="paintE"
        @mousemove="draw"
      ></canvas>
    </div>
  </div>
</template>

<script>
// scriptの構文
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
  mounted() {
    // canvas要素の取得（マウント）
    this.canvas = document.querySelector("#draw-area");
    // canvasの画像要素指定
    this.context = this.canvas.getContext("2d");
    // 線の端に丸みを帯びさせる・canvasの要素
    this.context.lineCap = "round";
    this.context.lineCap = "round";
    this.context.lineCap = "round";
    this.context.lineCap = "round";
  }
};
</script>

<style scoped>
#drew-area {
  border: 1px, solid, #000;
}
</style>>

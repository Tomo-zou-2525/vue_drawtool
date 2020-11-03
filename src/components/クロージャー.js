'use strict'

function hello() {
  function child() {
    console.log("わいはhelloの子供やで")
  }
  return child;
}

function receive(v) {
  console.log("引数で受け取ったVを実行するよ")
  v();
}

//hello関数をxに代入
const x = hello();

console.log(x);

x();

//receive関数の第一引数にxを渡す
receive(x)
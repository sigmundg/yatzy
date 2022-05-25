
var knappEl = document.querySelector("button");
knappEl.addEventListener("click", terning);

function kast() {
  return Math.floor(Math.random()*6 + 1);
}

function terning() {
  for (let i = 1; i <= 5; i++) {
    var ter = document.getElementById("terning"+i);
    ter.src = "terning"+kast()+".png"
  }
}

let enere = []





// 8 juft hayvon — 16 karta
const animals = ["🐶","🐱","🦊","🐼","🐵","🦁","🐸","🐨"];

const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let deck = [];          
let first = null;      
let lock = false;      
let score = 0;      

init();

restartBtn.addEventListener("click", init);

function init() {
  // Holatni tozalash
  board.innerHTML = "";
  score = 0;
  scoreEl.textContent = "0";
  first = null;
  lock = false;

  
  deck = shuffle([...animals, ...animals]);

  deck.forEach((emoji, idx) => {
    const card = document.createElement("button");
    card.className = "card";
    card.setAttribute("aria-label", "Karta");
    card.dataset.value = emoji;
    card.dataset.index = idx;

    card.innerHTML = `
      <div class="inner">
        <div class="face front">M</div>
        <div class="face back">${emoji}</div>
      </div>
    `;

    card.addEventListener("click", onFlip);
    board.appendChild(card);
  });
}

function onFlip(e) {
  if (lock) return;

  const card = e.currentTarget;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!first) {
    first = card;
    return;
  }

  
  const second = card;
  const isMatch = first.dataset.value === second.dataset.value;

  if (isMatch) {
    
    first.classList.add("matched", "disabled");
    second.classList.add("matched", "disabled");
    first = null;
    score += 1;
    scoreEl.textContent = String(score);

    
    if (score === animals.length) {
      setTimeout(() => {
        alert("Tabriklayman! 8 juftning hammasini topdingiz! 🎉");
      }, 300);
    }
  } else {
    
    lock = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first = null;
      lock = false;
    }, 700);
  }
}


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

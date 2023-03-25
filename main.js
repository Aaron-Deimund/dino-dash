let gameState = "stopped";
const character = document.querySelector("#character");
const block = document.querySelector("#block");

let score = 1;
const scoreDevisor = 20;
const properties = window.getComputedStyle(document.body);

let jumpDuration = properties.getPropertyValue("--character-jump-duration");
jumpDuration = Number(jumpDuration.replace('ms', '')) + 5;

document.querySelector("#begin-overlay").showModal();

document.body.onkeydown = function (e) {
  if (e.code == "Space") {
    if (gameState == "stopped") {
      document.querySelector("#begin-overlay").close();
      block.classList.add("block-advancing");
      gameState = "running";
    } else if (!character.classList.contains("jumping")) {
      character.classList.add("jumping");
      setTimeout(() => {
        character.classList.remove("jumping");
      }, jumpDuration);
    }
  }
}

function gameLoop() {
  if (gameState != "running")
    return;
  const blockHeight = parseFloat(window.getComputedStyle(block).getPropertyValue("height"));
  const blockWidth = parseFloat(window.getComputedStyle(block).getPropertyValue("width"));
  const blockLeft = parseFloat(window.getComputedStyle(block).getPropertyValue("left"));

  const characterWidth = parseFloat(window.getComputedStyle(character).getPropertyValue("width"));
  const characterBottom = parseFloat(window.getComputedStyle(character).getPropertyValue('bottom'));

  // Seems to be needed to get more accurate behavior on collision.
  const hitBoxPaddingRight = 20;
  const hitBoxPaddingTop = 15;

  console.log(`left ${blockLeft} right${blockLeft + blockWidth} width ${characterWidth}`)

  const blockInCharacterSpace = blockLeft < characterWidth && blockLeft + blockWidth + hitBoxPaddingRight > characterWidth;
  const characterLowerThanBlock = characterBottom < blockHeight + hitBoxPaddingTop;

  if (blockInCharacterSpace && characterLowerThanBlock) {
    block.classList.remove("block-advancing");
    gameState = "stopped";
    score = 1;
    document.querySelector("#final-score").textContent = document.querySelector("#score").textContent;
    document.querySelector("#game-over").showModal();
  } else {
    score += 1;
    document.querySelector("#score").textContent = Math.floor(score / scoreDevisor);
  }
}

setInterval(gameLoop, 10);

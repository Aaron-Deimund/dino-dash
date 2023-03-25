const character = document.querySelector("#character");

document.body.onkeyup = function(e) {
    if (e.code == "Space") {
      character.classList.add("jumping");
      setTimeout(()=>{
        character.classList.remove("jumping");
      }, 500);
    }
  }
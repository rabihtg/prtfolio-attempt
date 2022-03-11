const animatedTxtContent = ["front-end", "back-end", "ui/ux"];

class TxtType {
  constructor(el, currentWord, period) {
    this.currentWord = currentWord;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    let i = this.loopNum % this.currentWord.length;
    let fullTxt = this.currentWord[i];

    if (this.isDeleting) {
      this.el.classList.remove("typing");
      this.el.classList.add("deleting");

      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.el.classList.add("typing");
      this.el.classList.remove("deleting");

      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.textContent = this.txt;

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

function startTxtType() {
  let typingTxt = document.querySelectorAll(".intro__typing-text");
  for (let i = 0; i < typingTxt.length; i++) {
    let currentWord = animatedTxtContent;
    let period = 1000;
    if (currentWord) {
      new TxtType(typingTxt[i], currentWord, period);
    }
  }
}
export { startTxtType };

let typerObj;
class TxtType {
  constructor(el, loopedText, switchPeriod) {
    this.loopedText = loopedText;
    this.el = el;
    this.loopNum = 0;
    this.switchPeriod = parseInt(switchPeriod, 10) || 2000;
    this.txt = "";
    this.type();
    this.isDeleting = false;
    this.paused = false;
  }
  type() {
    let i = this.loopNum % this.loopedText.length;
    let fullTxt = this.loopedText[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.textContent = this.txt;

    let chStep = 200 - Math.random() * 100;

    if (this.isDeleting) {
      chStep /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      chStep = this.switchPeriod;
      this.isDeleting = true;
      this.el.classList.add("showing");
    } else if (this.isDeleting && this.txt === "") {
      this.el.classList.add("showing");
      this.isDeleting = false;
      this.loopNum++;
      chStep = 500;
    } else {
      this.el.classList.remove("showing");
    }
    if (!this.paused) {
      this.timeOut = setTimeout(() => {
        this.type();
      }, chStep);
    } else {
      this.el.textContent = "";
      this.el.classList.remove("showing");
      clearTimeout(this.timeOut);
    }
  }
}

function startTxtType() {
  const typingTxt = document.querySelectorAll(".animated-typing-text"),
    animatedTxtContent = ["front-end", "back-end", "ui/ux"];
  for (let i = 0; i < typingTxt.length; i++) {
    let loopedText = animatedTxtContent;
    let switchPeriod = 1000;
    if (loopedText) {
      typerObj = new TxtType(typingTxt[i], loopedText, switchPeriod);
    }
  }
}
function stopTxtType() {
  typerObj.paused = true;
}
export { startTxtType, stopTxtType };

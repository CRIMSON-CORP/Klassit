import gsap from "gsap";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollTrigger.normalizeScroll();

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
});

function setPositions() {
  gsap.set("#mobile-nav", { x: "100%" });
}

function setSplitTypes() {
  const allWords = [];
  const allLines = [];
  const allChars = [];
  const splitWordText = document.querySelectorAll(".split-word");
  const splitLineText = document.querySelectorAll(".split-line");
  const splitCharText = document.querySelectorAll(".split-char");

  splitWordText.forEach((text) => {
    const words = new SplitType(text, {
      type: "words",
    });

    allWords.push(...words.words);
  });

  splitLineText.forEach((text) => {
    const lines = new SplitType(text, {
      type: "words",
    });

    allLines.push(...lines.lines);
  });

  splitCharText.forEach((text) => {
    const lines = new SplitType(text, {
      type: "chars",
    });

    allChars.push(...lines.chars);
  });

  gsap.set(allWords, { y: "100%", opacity: 0 });
  gsap.set(allLines, { y: "100%", opacity: 0, scale: 0.8 });
}

window.addEventListener("DOMContentLoaded", () => {
  setPositions();
  setSplitTypes();
});

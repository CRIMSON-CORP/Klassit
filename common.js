import gsap from "gsap";
import SplitType from "split-type";
import "./style.css";

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
  gsap.set("body header", { y: "-100%", opacity: 0 });
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

function toggleMobileNav() {
  const hamburgerMenu = document.querySelector("#hamburger-menu");

  const timeline = gsap.timeline({ reversed: true, paused: true });

  timeline.to("#mobile-nav", { x: 0 }).from("#mobile-nav .nav-items > *", {
    opacity: 0,
    y: 60,
    duration: 1.25,
    ease: "power3.out",
    stagger: "0.15",
  });

  hamburgerMenu.onclick = () => {
    if (timeline.reversed()) {
      timeline.timeScale(1);
      timeline.play();
    } else {
      timeline.timeScale(2);
      timeline.reverse();
    }
  };
}

export function headerAnimation() {
  const timeline = gsap.timeline();
  timeline
    .to("body header", {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
      duration: 2,
    })
    .from(
      "body header > div>div>img, header > div > div > nav *",
      {
        opacity: 0,
        x: "-100px",
        ease: "power3.out()",
        stagger: 0.15,
        duration: 1.5,
      },
      "-=1"
    );
}

window.addEventListener("DOMContentLoaded", () => {
  setPositions();
  setSplitTypes();
});

window.addEventListener("load", () => {
  toggleMobileNav();
});

import gsap from "gsap";
import SplitType from "split-type";
import "./style.css";

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

function setPositions() {
  gsap.set("#mobile-nav", { x: "100%" });
  gsap.set(
    "#hero button",
    { opacity: 0, y: "100%", ease: "power3.out", duration: 2 },
    "-=1"
  );
  gsap.set(".hero-image-popup", { scale: 0.5, opacity: 0 });
}

function accordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.onclick = (e) => {
      const accordionOpen = accordion.dataset.accordionOpen === "true";
      if (accordionOpen) {
        accordion.children[1].style.maxHeight = "0px";
        accordion.setAttribute("data-accordion-open", false);
      } else {
        accordion.children[1].style.maxHeight = `${accordion.children[1].scrollHeight}px`;
        accordion.setAttribute("data-accordion-open", true);
      }
    };
  });
}

function currentYear() {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
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

function headerAnimation() {
  const timeline = gsap.timeline();
  timeline
    .from("header", { y: "-100%" })
    .from("header > div>div>img, header > div > div > nav *", {
      opacity: 0,
      x: "-100px",
      ease: "power3.out()",
      stagger: 0.15,
      duration: 1.5,
    });
}

function heroAnimation() {
  let timeline = gsap.timeline({ delay: 1 });
  timeline
    .from("#hero span", { opacity: 0, y: 40 })
    .to("#hero h1 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .to(
      "#hero p .line",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: 1,
        stagger: { each: 0.1, from: "start" },
      },
      "-=0.5"
    )
    .to(
      "#hero button",
      { opacity: 1, y: 0, ease: "power3.out", duration: 2 },
      "-=0.75"
    )
    .to(
      "g#hero-image",
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out()",
        duration: 2,
      },
      "-=2.5"
    )
    .to(
      ".hero-image-popup",
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.25,
      },
      "-=1.75"
    );
}

setPositions();
setSplitTypes();

accordions();
currentYear();
toggleMobileNav();

headerAnimation();
heroAnimation();

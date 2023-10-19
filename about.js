import gsap from "gsap";
import { headerAnimation } from "./common";

function aboutHero() {
  const timeline = gsap.timeline();

  timeline.from("#hero span", { opacity: 0, y: "150%" }).to("#hero h1 .word", {
    y: 0,
    opacity: 1,
    stagger: { each: 0.08 },
    ease: "back.out(1.4)",
    duration: 1.5,
  });
}

function aboutContentTimeline() {
  const paragraphs = document.querySelectorAll(".about p .line");

  paragraphs.forEach((paragraph) => {
    gsap.to(paragraph, {
      opacity: 1,
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 1,
      stagger: { each: 0.1, from: "start" },
      scrollTrigger: {
        trigger: paragraph,
        start: "bottom 80%",
      },
    });
  });
}

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  headerAnimation();
  aboutHero();
  aboutContentTimeline();
});

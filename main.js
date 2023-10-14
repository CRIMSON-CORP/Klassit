import "./style.css";
import gsap from "gsap";

function setPositions() {
  gsap.set("#mobile-nav", { x: "100%" });
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
setPositions();
accordions();
currentYear();
toggleMobileNav();

headerAnimation();

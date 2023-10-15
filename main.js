import gsap from "gsap";
import SplitType from "split-type";
import Swiper from "swiper";
import "swiper/css";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

function initPackages() {
  new Swiper(".team-swiper", {
    speed: 400,
    spaceBetween: 10,
    slidesPerView: "auto",
  });
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

function setPositions() {
  gsap.set("#mobile-nav", { x: "100%" });
  gsap.set(
    "#hero button",
    { opacity: 0, y: "100%", ease: "power3.out", duration: 2 },
    "-=1"
  );
  gsap.set(".hero-image-popup, #interaction-image .pop-up", {
    scale: 0.5,
    opacity: 0,
  });
  gsap.set("#services article", {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  });
  gsap.set("#group-class > div > div svg .member-card", {
    scale: 0.5,
    opacity: 0,
  });
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
  let timelineContent = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-content-container",
      start: "top center",
    },
  });
  let timelineImage = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-image-container",
      start: "top center",
    },
  });

  const underline = document.getElementById("underline");
  const underlineLength = underline.getTotalLength();

  gsap.set(underline, {
    strokeDasharray: underlineLength,
    strokeDashoffset: underlineLength,
  });

  timelineContent
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
    .to(underline, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "expo.out",
    })
    .to(
      "#hero button",
      { opacity: 1, y: 0, ease: "power3.out", duration: 2 },
      "-=0.75"
    );

  timelineImage
    .to("g#hero-image", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power4.out()",
      duration: 2,
    })
    .to(
      ".hero-image-popup",
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.25,
      },
      "-=0.75"
    );
}

function servicesAnimation() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#services header",
      start: "top 70%",
    },
  });

  timeline
    .to("#services header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from(
      "#services header p",
      {
        y: 40,
        opacity: 0,
        stagger: { each: 0.05, from: "start" },
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.75"
    );

  const services = document.querySelectorAll("#services article");

  services.forEach((service) => {
    const serviceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: service,
        start: "top 70%",
      },
    });

    serviceTimeline
      .to(service, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power3.out()",
        duration: 1,
      })
      .from(service.children, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out()",
        stagger: 0.15,
      });
  });
}

function whoCanUse() {
  const headerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#who-can-use header",
      start: "top 60%",
    },
  });
  const map = document.getElementById("map");
  const mapLength = map.getTotalLength();

  gsap.set(map, {
    strokeDasharray: mapLength,
    strokeDashoffset: mapLength,
    stroke: "#DDE0E4",
    fill: "transparent",
    strokeWidth: 2,
  });

  headerTimeline
    .to("#who-can-use header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from(
      "#who-can-use header p",
      {
        y: 40,
        opacity: 0,
        stagger: { each: 0.05, from: "start" },
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.75"
    );

  gsap.to(map, {
    strokeDashoffset: 0,
    duration: 4,
    ease: "power4.in()",
    fill: "#DDE0E4",
    scrollTrigger: {
      trigger: map,
      start: "top 60%",
    },
  });
}

function team() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#team header",
      start: "top 70%",
    },
  });

  timeline
    .to("#team header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from(
      "#team header p",
      {
        y: 40,
        opacity: 0,
        stagger: { each: 0.05, from: "start" },
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.75"
    );

  gsap.from(".team-swiper article", {
    opacity: 0,
    x: "30vw",
    stagger: 0.125,
    duration: 2,
    ease: "expo.out()",
    scrollTrigger: {
      trigger: ".team-swiper",
      start: "top 60%",
    },
  });
}

function interaction() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#interaction header",
      start: "top 70%",
    },
  });

  const interactionImageTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#interaction-image",
      start: "top 70%",
    },
  });

  timeline
    .from(
      "#interaction header span",
      {
        y: 40,
        opacity: 0,
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.75"
    )
    .to("#interaction header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from("#interaction header p", {
      y: 40,
      opacity: 0,
      ease: "power3.out",
      duration: 1,
    });

  interactionImageTimeline
    .to("#interaction-image g#main-image", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power4.out()",
      duration: 2,
    })
    .to(
      "#interaction-image .pop-up",
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.25,
      },
      "-=0.75"
    );
}

function learnersEducators() {
  const articles = document.querySelectorAll("#learners-educators article");

  articles.forEach((article) => {
    const sideImage = article.querySelector(".side-image");
    const sideContent = article.querySelector(".side-content");

    const sideContenttimeline = gsap.timeline({
      scrollTrigger: { trigger: sideContent, start: "80% 80%" },
    });

    gsap.from(sideImage.children, {
      scale: 0.5,
      opacity: 0,
      ease: "back.out(2)",
      duration: 1,
      stagger: 0.25,
      scrollTrigger: { trigger: sideImage, start: "80% 80%" },
    });

    sideContenttimeline
      .from(
        sideContent.children[0],
        {
          y: 40,
          opacity: 0,
          ease: "power3.out",
          duration: 0.8,
        },
        "-=0.75"
      )
      .to(sideContent.children[1].querySelectorAll(".word"), {
        y: 0,
        opacity: 1,
        stagger: { each: 0.05, from: "start" },
        ease: "power3.out",
        duration: 0.8,
      })
      .from(sideContent.children[2], {
        y: 40,
        opacity: 0,
        ease: "power3.out",
        duration: 1,
      });
  });
}

function groupClass() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#group-class header",
    },
  });

  const imageTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#group-class > div > div > svg",
      start: "80% bottom",
    },
  });

  timeline
    .from(
      "#group-class header span",
      {
        y: 40,
        opacity: 0,
        ease: "power3.out",
        duration: 0.8,
      },
      "-=0.75"
    )
    .to("#group-class header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from("#group-class header p", {
      y: 40,
      opacity: 0,
      ease: "power3.out",
      duration: 1,
    });

  imageTimeline
    .from("#group-class > div > div svg .background", {
      opacity: 0,
      scale: 0.8,
      y: "50%",
      ease: "back.out(1.5)",
      duration: 0.8,
    })
    .from(
      "#group-class > div > div svg .icons > *",
      {
        opacity: 0,
        scale: 0.2,
        y: 60,
        ease: "back.out(2)",
        stagger: 0.15,
        duration: 0.5,
      },
      "-=0.5"
    )
    .to("#group-class > div > div svg .member-card", {
      opacity: 1,
      scale: 1,
      y: 0,
      ease: "back.out(2)",
      stagger: 0.125 / 1.6,
      duration: 0.8,
    });

  gsap.from("#group-class > div > div button", {
    opacity: 0,
    y: "100%",
    ease: "power3.out",
    duration: 2,
    scrollTrigger: {
      trigger: "#group-class > div > div > div",
      start: "top 60%",
    },
  });
}

function faq() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#faq header",
      start: "top 60%",
    },
  });

  timeline
    .to("#faq header h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from("#faq .accordion", {
      scale: 0.5,
      opacity: 0,
      stagger: 0.125,
      duration: 0.8,
    });
}

function joinWaitlist() {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#join-waitlist",
      start: "top center",
    },
  });

  timeline
    .to("#join-waitlist h2 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .from("#join-waitlist button", {
      y: "100%",
      opacity: 0,
      ease: "power3.out",
      duration: 2,
    });
}

initPackages();
setPositions();
setSplitTypes();

accordions();
currentYear();
toggleMobileNav();

headerAnimation();
heroAnimation();
servicesAnimation();
whoCanUse();
team();
interaction();
learnersEducators();
groupClass();
faq();
joinWaitlist();

import "./style.css";

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

accordions();

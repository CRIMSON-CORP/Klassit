import gsap from "gsap";
import { headerAnimation } from "./common";
import FirebaseService from "./firebase";

const form = document.querySelector("form");
const labels = document.querySelectorAll("form .user-type label");
const indicator = document.getElementById("user-choice-indicator");

function initiIndicator() {
  const firstChecked = labels[0].children[0].checked;
  const height = firstChecked ? labels[0].clientHeight : labels[1].clientHeight;
  const width = firstChecked ? labels[0].clientWidth : labels[1].clientWidth;

  const left = firstChecked
    ? 0
    : labels[1].getBoundingClientRect().left -
      form.getBoundingClientRect().left;

  indicator.style.height = `${height}px`;
  indicator.style.width = `${width}px`;
  indicator.style.opacity = `1`;
  indicator.style.left = `${left}px`;
}

function userChoiceIndicator() {
  const instructorOnly = document.getElementById("instructor-only-field");
  const studentOnly = document.getElementById("student-only-field");

  const instructorOnlyInput = instructorOnly.querySelector("select");
  const studentOnlyInput = studentOnly.querySelector("input");

  initiIndicator();

  studentOnlyInput.removeAttribute("required");
  studentOnlyInput.setAttribute("disabled", "true");

  labels.forEach((label) => {
    label.onclick = (e) => {
      const height = label.clientHeight;
      const width = label.clientWidth;
      const formLeft = form.getBoundingClientRect().left;
      const left = label.getBoundingClientRect().left - 1 - formLeft;

      indicator.style.height = `${height}px`;
      indicator.style.width = `${width}px`;
      indicator.style.left = `${left}px`;
      indicator.style.opacity = `1`;

      if (label.getAttribute("for") === "instructor") {
        instructorOnly.style.display = "flex";
        instructorOnlyInput.setAttribute("required", "true");
        instructorOnlyInput.removeAttribute("disabled");

        studentOnly.style.display = "none";
        studentOnlyInput.removeAttribute("required");
        studentOnlyInput.setAttribute("disabled", "true");
      } else {
        instructorOnly.style.display = "none";
        instructorOnlyInput.removeAttribute("required");
        instructorOnlyInput.setAttribute("disabled", "true");

        studentOnly.style.display = "flex";
        studentOnlyInput.setAttribute("required", "true");
        studentOnlyInput.removeAttribute("disabled");
      }
    };
  });
}

function loadCategories() {
  const instructorCategpry = document.getElementById("category");
  const categories = [
    "AI",
    "Advertising",
    "Business",
    "Branding",
    "Design",
    "Data",
    "Development",
    "Engineering",
    "Film",
    "Health & Fitness",
    "Investing",
    "Leadership",
    "Lifestyle",
    "Marketing",
    "Productivity",
    "Product",
    "Photography & Video",
    "Strategy",
    "Software",
    "Sales",
    "Others",
  ];

  for (let catergory of categories) {
    const option = document.createElement("option");
    option.setAttribute("value", catergory.toLowerCase());
    option.innerHTML = catergory;
    instructorCategpry.appendChild(option);
  }
}

async function loadCountries() {
  const { VITE_COUNTRIES_API_ENDPOINT } = import.meta.env;
  const countrySelect = document.getElementById("country");

  const response = await fetch(VITE_COUNTRIES_API_ENDPOINT);
  const data = await response.json();

  const countries = data.map((country) => country.name.common).sort();

  for (let country of countries) {
    const option = document.createElement("option");
    option.setAttribute("value", country.toLowerCase());
    option.innerHTML = country;
    countrySelect.appendChild(option);
  }
}

async function handleFormSubmit() {
  const form = document.getElementById("wait-list-form");
  const emailErrorHelper = document.getElementById("email-error-helper");
  const emailField = document.getElementById("email");
  const closeWaitlistModal = document.getElementById("close-wait-list-modal");
  const formSubmitButton = document.getElementById("form-submit-button");

  form.onsubmit = async (e) => {
    e.preventDefault();
    emailErrorHelper.style.opacity = "0";

    formSubmitButton.style.opacity = "0.7";
    formSubmitButton.style.pointerEvents = "none";
    formSubmitButton.children[0].style.opacity = "0";
    formSubmitButton.children[1].style.opacity = "1";

    try {
      const formData = new FormData(form);
      const email = formData.get("email");

      const emptyValueExists = Array.from(formData.entries()).some(
        (valueSet) =>
          valueSet[1] === "" ||
          valueSet[1] === null ||
          valueSet[1] === undefined
      );

      if (emptyValueExists) {
        alert("Please fill all values 🙏");
        return;
      }

      const result = await FirebaseService.validateEmail(email);

      if (result) {
        emailErrorHelper.style.opacity = "1";
        emailField.value = "";
      } else {
        const payload = {
          user: formData.get("user"),
          firstname: formData.get("first-name"),
          lastname: formData.get("last-name"),
          email,
          country: formData.get("country"),
          category: formData.get("category"),
          what_to_learn: formData.get("what-to-learn"),
        };

        await FirebaseService.submitForm(payload);
        openWaitListModal();
        form.reset();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      formSubmitButton.style.opacity = "1";
      formSubmitButton.style.pointerEvents = "auto";
      formSubmitButton.children[0].style.opacity = "1";
      formSubmitButton.children[1].style.opacity = "0";
    }
  };

  closeWaitlistModal.onclick = () => {
    closeWaitListmodal();
  };
}

function openWaitListModal() {
  const timeline = gsap.timeline();

  timeline
    .to("#success-modal", { y: 0, ease: "expo.out", duration: 1.5 })
    .to(
      "#success-modal #modal-content",
      {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "expo.out",
        duration: 1.5,
      },
      "-=1"
    )
    .from(
      "#success-modal #modal-content > div > *",
      {
        opacity: 0,
        y: 200,
        ease: "expo.out",
        duration: 2,
        stagger: 0.125,
      },
      "-=1"
    );
}

function closeWaitListmodal() {
  const timeline = gsap.timeline({
    onComplete() {
      window.location.href = "/";
    },
  });

  timeline
    .to("#success-modal #modal-content", { scale: 0.7, opacity: 0 })
    .to("#success-modal", { y: "100%", ease: "expo.out", duration: 1.5 });
}

function animation() {
  const timeline = gsap.timeline({
    delay: 1,
  });

  timeline
    .to("header h1 .word", {
      y: 0,
      opacity: 1,
      stagger: { each: 0.05, from: "start" },
      ease: "power3.out",
      duration: 0.8,
    })
    .to(
      "header .line",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: 1,
        stagger: { each: 0.1, from: "start" },
      },
      "-=0.75"
    )
    .from(
      "form > :first-child, form > :last-child, form > :nth-child(2) > *",
      {
        opacity: 0,
        y: "200%",
        ease: "power3.out",
        duration: 1,
        stagger: 0.125,
      },
      "-=1"
    );
}

window.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadCountries();
});

window.addEventListener("load", () => {
  document.body.style.opacity = "1";

  headerAnimation();
  userChoiceIndicator();
  handleFormSubmit();

  animation();
});

window.addEventListener("resize", initiIndicator);

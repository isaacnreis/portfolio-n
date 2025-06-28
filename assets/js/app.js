function setupMobileMenu() {
  const menuToggle = document.querySelector(".cabecalho__menu-toggle");
  const menuNav = document.querySelector(".cabecalho__menu-mobile--nav");
  const closeButton = document.querySelector(".cabecalho__menu-mobile--fechar");
  const navLinks = document.querySelectorAll(".cabecalho__navMobilelink");

  if (!menuToggle || !menuNav || !closeButton) return;

  const focusableElements = menuNav.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      toggleMenu();
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  const toggleMenu = () => {
    const isActive = menuNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll", isActive);
    menuToggle.setAttribute("aria-expanded", isActive);
    menuNav.setAttribute("aria-hidden", !isActive);

    menuToggle.setAttribute(
      "aria-label",
      isActive ? "Fechar menu" : "Abrir menu"
    );

    if (isActive) {
      document.addEventListener("keydown", handleKeydown);
      closeButton.focus(); // Move o foco para o botão de fechar
    } else {
      document.removeEventListener("keydown", handleKeydown);
      menuToggle.focus(); // Retorna o foco para o botão que abriu o menu
    }
  };

  menuToggle.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuNav.classList.contains("active")) toggleMenu();
    });
  });
}

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (!this.form) return;
    this.originalButtonText = this.formButton.innerText;

    this.url = this.form.getAttribute("action");
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  resetFormButton() {
    if (!this.formButton) return;
    this.formButton.disabled = false;
    this.formButton.innerText = this.originalButtonText;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission() {
    this.formButton.disabled = true;
    this.formButton.innerText = "Enviando...";
  }

  showError(field, message) {
    const input = this.form.querySelector(`[name="${field}"]`);
    const errorSpan = this.form.querySelector(`#error-${field}`);
    if (input) input.classList.add("input-error");
    if (errorSpan) errorSpan.innerText = message;
  }

  clearErrors() {
    this.form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    this.form
      .querySelectorAll(".error-message")
      .forEach((el) => (el.innerText = ""));
  }

  validateForm() {
    this.clearErrors();
    const fields = this.getFormObject();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (fields._honey) {
      console.log("Honeypot triggered. Likely a bot.");
      return false;
    }

    const submissionTime = new Date().getTime();
    const loadTime = parseInt(
      this.form.querySelector('[name="_time"]').value,
      10
    );
    if (submissionTime - loadTime < 3000) {
      console.log("Form submitted too quickly. Likely a bot.");
      return false;
    }

    if (!fields.nome || fields.nome.trim() === "") {
      this.showError("nome", "O campo nome é obrigatório.");
      isValid = false;
    }

    if (!fields.email || fields.email.trim() === "") {
      this.showError("email", "O campo email é obrigatório.");
      isValid = false;
    } else if (!emailRegex.test(fields.email)) {
      this.showError("email", "Por favor, insira um email válido.");
      isValid = false;
    }

    if (!fields.mensagem || fields.mensagem.trim() === "") {
      this.showError("mensagem", "O campo de mensagem é obrigatório.");
      isValid = false;
    }

    return isValid;
  }

  async sendForm(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      this.onSubmission();
      const formData = this.getFormObject();
      delete formData._honey;
      delete formData._time;

      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.displaySuccess();
      } else {
        this.resetFormButton();
        throw new Error(
          `O servidor respondeu com o status: ${response.status}`
        );
      }
    } catch (error) {
      this.displayError();
      this.resetFormButton();
      console.error("Houve um problema com a requisição fetch:", error);
    }
  }

  init() {
    if (this.formButton) {
      const timeField = this.form.querySelector('[name="_time"]');
      if (timeField) timeField.value = new Date().getTime();

      this.form.addEventListener("submit", this.sendForm);
    }
    return this;
  }
}

function setupScrollAnimation() {
  const animatedElements = document.querySelectorAll(".animate");
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

function createSkillElement(skill) {
  const skillCard = document.createElement("div");
  skillCard.className = "skills__card";
  if (skill.customCardStyle) {
    skillCard.style.cssText = skill.customCardStyle;
  }
  skillCard.innerHTML = `
    ${skill.svg}
    <h3 class="skills__cardTitulo" style="${skill.customTitleStyle || ""}">${
    skill.title
  }</h3>
  `;
  return skillCard;
}

function createEducationElement(education) {
  const educationArticle = document.createElement("article");
  educationArticle.className = "formacao";
  educationArticle.innerHTML = `
    <div class="formacao__header">
      <div style="display: flex; gap: 2rem; align-items: center">
        <div class="${education.logoClass}"></div>
        <h3 class="formacao__titulo">${education.title}</h3>
      </div>
      <h3 class="formacao__periodo">${education.period}</h3>
    </div>
    <div class="formacao__body">
      <p>${education.description}</p>
    </div>
  `;
  return educationArticle;
}

const linkSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.8333 9.16658L17.6667 2.33325" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.3333 5.66675V1.66675H14.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.16667 1.66675H7.5C3.33333 1.66675 1.66667 3.33341 1.66667 7.50008V12.5001C1.66667 16.6667 3.33333 18.3334 7.5 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5001V10.8334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

function createProjectElement(project) {
  const projectArticle = document.createElement("article");
  projectArticle.className = "projeto animate";

  let linksHtml = "";
  if (project.customLinks) {
    linksHtml = project.customLinks
      .map(
        (link) => `
      <a class="projeto__link" href="${link.url}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} ${link.text}
      </a>`
      )
      .join("");
  } else {
    linksHtml = `
      <a class="projeto__link" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} Demo
      </a>
      <a class="projeto__link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} Repositório
      </a>`;
  }

  const imageContainer = `<div class="projeto__imagemContainer ${project.imageClass}"></div>`;
  const textContainer = `
    <div class="projeto__textoContainer">
      ${project.id ? `<h3 class="projeto__numero">${project.id}</h3>` : ""}
      <h3 class="projeto__titulo">${project.title}</h3>
      <p class="projeto__descricao">${project.description}</p>
      <div class="projeto__linksContainer">${linksHtml}</div>
    </div>
  `;

  const isEven = project.id && parseInt(project.id, 10) % 2 === 0;
  projectArticle.innerHTML = isEven
    ? textContainer + imageContainer
    : imageContainer + textContainer;

  return projectArticle;
}

function renderContent({ containerSelector, data, renderItem, errorMsg }) {
  const container = document.querySelector(containerSelector);
  if (!container || typeof data === "undefined") {
    console.error(errorMsg);
    return;
  }

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const element = renderItem(item);
    if (element) {
      fragment.appendChild(element);
    }
  });

  container.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();

  renderContent({
    containerSelector: ".skills__cards",
    data: skillsData,
    renderItem: createSkillElement,
    errorMsg:
      "Container de habilidades ou dados das habilidades não encontrados.",
  });

  renderContent({
    containerSelector: ".formacoes__container",
    data: educationsData,
    renderItem: createEducationElement,
    errorMsg: "Container de formações ou dados das formações não encontrados.",
  });

  renderContent({
    containerSelector: ".projetos__container",
    data: projectsData,
    renderItem: createProjectElement,
    errorMsg: "Container de projetos ou dados dos projetos não encontrados.",
  });

  setupScrollAnimation();

  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success:
      "<h1 class='success'>Mensagem enviada!</h1><p>Obrigado pelo seu contato. Retornarei em breve.</p>",
    error:
      "<h1 class='error'>Não foi possível enviar.</h1><p>Por favor, tente novamente mais tarde ou entre em contato por outro meio.</p>",
  });
  formSubmit.init();
});

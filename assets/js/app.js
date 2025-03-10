$(document).ready(() => {
  class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }

    displayError() {
      this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }

    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Enviando...";
    }

    checkFieldsSubmission() {
      const fields = this.getFormObject();
      let bool = true;
      if (fields.nome == "" || !fields.nome) {
        bool = false;
      } else if (
        fields.email == "" ||
        !fields.email ||
        !fields.email.includes("@")
      ) {
        bool = false;
      } else if (fields.mensagem == "" || !fields.mensagem) {
        bool = false;
      }
      return bool;
    }

    async sendForm(event) {
      try {
        if (this.checkFieldsSubmission()) {
          this.onSubmission(event);
          await fetch(this.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
          });
          this.displaySuccess();
        }
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }

    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }

  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
  });
  formSubmit.init();

  $(".cabecalho .cabecalho__menu-mobile svg").on("click", () => {
    console.log("click");
    $(".cabecalho__menu-mobile--nav").css("display", "flex");
  });

  $(".cabecalho__menu-mobile--fechar").on("click", () => {
    console.log("click");
    $(".cabecalho__menu-mobile--nav").css("display", "none");
  });

  $(".cabecalho__navMobilelink").on("click", () => {
    console.log("click");
    $(".cabecalho__menu-mobile--nav").css("display", "none");
  });

  // Função para verificar se o elemento está visível na tela
  function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const elementVisible = rect.top <= windowHeight * 0.75;

    return elementVisible;
  }

  window.addEventListener("scroll", function () {
    const elements = document.querySelectorAll(".animate");

    elements.forEach(function (element) {
      if (isElementInView(element)) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  });
});

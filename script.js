document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registro-form");
    const inputs = document.querySelectorAll(".input-container input, .input-container select");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    function actualizarEstadoCampo(container, errorMessage, isValid, mensaje) {
        if (isValid) {
            container.classList.add("valid");
            container.classList.remove("invalid");
            errorMessage.style.display = "none";
        } else {
            container.classList.add("invalid");
            container.classList.remove("valid");
            errorMessage.textContent = mensaje;
            errorMessage.style.display = "block";
        }
    }

    function validarConfirmacionPassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const confirmContainer = confirmPasswordInput.parentElement;
        const errorMessage = confirmContainer.querySelector(".error-message");

        const isValid = password !== "" && confirmPassword !== "" && password === confirmPassword;
        actualizarEstadoCampo(confirmContainer, errorMessage, isValid, "Las contraseñas no coinciden");
        return isValid;
    }

    function validarCampo(input) {
        const container = input.parentElement;
        const errorMessage = container.querySelector(".error-message");
        let isValid = false;
        
        if (input.type === "email") {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            actualizarEstadoCampo(container, errorMessage, isValid, "Correo inválido, use formato ejemplo@correo.com");
        } else if (input.type === "password" && input.id !== "confirm-password") {
            isValid = input.value.length >= 8;
            actualizarEstadoCampo(container, errorMessage, isValid, "Debe contener al menos 8 caracteres");
        } else if (input.id === "confirm-password") {
            return validarConfirmacionPassword();
        } else {
            isValid = input.value.trim() !== "";
            actualizarEstadoCampo(container, errorMessage, isValid, "Este campo es obligatorio");
        }

        return isValid;
    }

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            validarCampo(input);
            if (input.id === "password" || input.id === "confirm-password") {
                validarConfirmacionPassword();
            }
        });

        input.addEventListener("blur", function () {
            validarCampo(input);
        });
    });

    form.addEventListener("submit", function (event) {
        let isValid = true;

        inputs.forEach(input => {
            if (!validarCampo(input)) {
                isValid = false;
            }
        });

        if (!validarConfirmacionPassword()) {
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});

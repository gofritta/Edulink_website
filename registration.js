document.addEventListener("DOMContentLoaded", function() {
    // Get form elements
    const firstNameInput = document.getElementById("first-name");
    const familyNameInput = document.getElementById("family-name");
    const stateInput = document.getElementById("state");
    const addressInput = document.getElementById("address");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const schoolNameInput = document.getElementById("school-name");
    const passwordInput = document.getElementById("password");
    const registerButton = document.getElementById("open-popup-btn");

    // Function to check if all required fields are filled
    function checkFormValidity() {
        return firstNameInput.value.trim() !== '' &&
               familyNameInput.value.trim() !== '' &&
               stateInput.value.trim() !== '' &&
               addressInput.value.trim() !== '' &&
               emailInput.value.trim() !== '' &&
               phoneInput.value.trim() !== '' &&
               schoolNameInput.value.trim() !== '' &&
               passwordInput.value.trim() !== '';
    }

    function updateRegisterButton() {
        registerButton.disabled = !checkFormValidity();
    }

    //used to update button state
    firstNameInput.addEventListener("input", updateRegisterButton);
    familyNameInput.addEventListener("input", updateRegisterButton);
    stateInput.addEventListener("input", updateRegisterButton);
    addressInput.addEventListener("input", updateRegisterButton);
    emailInput.addEventListener("input", updateRegisterButton);
    phoneInput.addEventListener("input", updateRegisterButton);
    schoolNameInput.addEventListener("input", updateRegisterButton);
    passwordInput.addEventListener("input", updateRegisterButton);
});

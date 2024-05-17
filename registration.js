document.addEventListener("DOMContentLoaded", function() {
    // Get form elements
    const firstNameInput = document.getElementById("firstName");
    const familyNameInput = document.getElementById("lastName");
    const stateInput = document.getElementById("statesch");
    const addressInput = document.getElementById("adresssch");
    const emailInput = document.getElementById("emailsch");
    const phoneInput = document.getElementById("numbersch");
    const schoolNameInput = document.getElementById("namesch");
    const passwordInput = document.getElementById("passwordsch");
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

    // Function to enable/disable the Register button based on form validity
    function updateRegisterButton() {
        registerButton.disabled = !checkFormValidity();
    }

    // Event listeners for input fields to update button state
    // firstNameInput.addEventListener("input", updateRegisterButton);
    // familyNameInput.addEventListener("input", updateRegisterButton);
    // stateInput.addEventListener("input", updateRegisterButton);
    // addressInput.addEventListener("input", updateRegisterButton);
    // emailInput.addEventListener("input", updateRegisterButton);
    // phoneInput.addEventListener("input", updateRegisterButton);
    // schoolNameInput.addEventListener("input", updateRegisterButton);
    // passwordInput.addEventListener("input", updateRegisterButton);
    async function submitData(){
    try{
        console.log(firstNameInput.value);
    const response = await fetch("http://localhost:3000/inscrit-school",{
        method:"POST",
        body:{
            firstName:firstNameInput.value,
            lastName: familyNameInput.value,
            namesch:schoolNameInput.value,
            emailsch:emailInput.value,
            passwordsch:passwordInput.value,
            statesch:stateInput.value,
            adresssch:addressInput.value,
            numbersch:phoneInput.value
        }

    })}catch(err){
        console.log(err)
        console.log("Error while registering")
    }
    }
    document.getElementById("submitButton").addEventListener("click",submitData);
});

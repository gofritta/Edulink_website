document.addEventListener("DOMContentLoaded", function() {
    const openPopupButton = document.getElementById("open-popup-btn");
    const dismissPopupButton = document.getElementById("dismiss-popup-btn");
    const popupContainer = document.querySelector(".popup");
    const registrationForm = document.getElementById("registration-form");

    // Function to open the popup
    function openPopup() {
        popupContainer.classList.add("active");
    }

    // Function to close the popup
    function closePopup() {
        popupContainer.classList.remove("active");
    }

    // Function to check if all required fields are filled
    function checkFormValidity() {
        const firstName = document.getElementById("first-name").value.trim();
        const familyName = document.getElementById("family-name").value.trim();
        const state = document.getElementById("state").value.trim();
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const schoolName = document.getElementById("school-name").value.trim();
        const description = document.getElementById("description").value.trim();

        return firstName !== '' && familyName !== '' && state !== '' &&
               address !== '' && email !== '' && phone !== '' &&
               schoolName !== '' && description !== '';
    }

    // Event listener for the "Register" button
    openPopupButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default button behavior

        if (checkFormValidity()) {
            // All required fields are filled, open the popup
            openPopup();
        } else {
            // If form is not valid, you can display an error message or take other action
            console.log("Please fill out all required fields.");
        }
    });

    // Event listener for the "Dismiss" button inside the popup
    dismissPopupButton.addEventListener("click", closePopup);

    // Event listener for form submission
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        if (checkFormValidity()) {
            // All required fields are filled, open the popup
            openPopup();
        } else {
            // If form is not valid, you can display an error message or take other action
            console.log("Please fill out all required fields.");
        }
    });
});

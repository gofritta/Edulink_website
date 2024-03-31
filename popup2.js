console.log("Loading...");

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("open-popup-btn").addEventListener("click", function(){
        document.getElementsByClassName("popup")[0].classList.add("active");
    });

    document.getElementById("student-btn").addEventListener("click", function(){
        // Logic for when student button is clicked
        console.log("Student button clicked");
        // For demonstration, I'll just close the popup
        document.getElementsByClassName("popup")[0].classList.remove("active");
    });

    document.getElementById("school-manager-btn").addEventListener("click", function(){
        // Logic for when school manager button is clicked
        console.log("School Manager button clicked");
        // For demonstration, I'll just close the popup
        document.getElementsByClassName("popup")[0].classList.remove("active");
    });
});

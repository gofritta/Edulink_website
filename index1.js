document.addEventListener("DOMContentLoaded", function() {
    
    var getStartedButton = document.querySelector(".start-button");
    var joinUsButton = document.querySelector(".join-us-button");
    var joinUsButtonn=document.querySelector(".join-us-buttonn");
    var popupContainer = document.getElementById("popup-container");
    
    
    getStartedButton.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
       
    });
    
    
    joinUsButton.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
        
    });

    
    joinUsButtonn.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
        
    });

    // Add click event listeners to the buttons inside the popup (if needed)
    document.getElementById("student-btn").addEventListener("click", function() {
        // Logic for when the student button is clicked
        console.log("Student button clicked");
        popupContainer.classList.remove("active");//for now lets just display it
        
    });

    document.getElementById("school-manager-btn").addEventListener("click", function() {
        // Logic for when the school manager button is clicked
        console.log("School Manager button clicked");
        popupContainer.classList.remove("active");
        
    });
});

document.querySelectorAll('.school').forEach(function(school) {
    var button = school.querySelector('.view-details');
    var rating = school.querySelector('.rating');

    button.addEventListener('click', function(event) {
        event.preventDefault();
        rating.style.display = 'block';
        button.style.display = 'none';
    });

    school.addEventListener('mouseenter', function() {
        if (rating.style.display === 'block') {
            rating.style.display = 'none';
            button.style.display = 'block';
        }
    });
});


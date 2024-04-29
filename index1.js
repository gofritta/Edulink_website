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

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".parallax-section");

    function handleScroll() {
        // Loop through each parallax section
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const sectionHeight = section.getBoundingClientRect().height;

            // Calculate the scroll position relative to the section
            const scrollPosition = window.innerHeight - sectionTop;

            // Apply zoom effect when section is in viewport
            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                // Calculate the scale factor based on scroll position
                const scaleFactor = 1 + (scrollPosition / sectionHeight) * 0.03; // Adjust the multiplier for desired zoom effect

                // Apply the scale transformation to the section
                section.style.transform = `scale(${scaleFactor})`;
            } else {
                // Reset the transform if section is out of viewport
                section.style.transform = "scale(1)";
            }
        });
    }

    // Use requestAnimationFrame for smoother scroll handling
    let isScrolling = false;
    function throttleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    // Attach scroll event listener to window using throttleScroll function
    window.addEventListener("scroll", throttleScroll);

    // Call handleScroll initially to set initial section styles
    handleScroll();
});

// Get the student picture and the associated text
const studentPicture = document.querySelector('.student-picture-img');
const feedbackText = document.querySelector('.feedback-text p');

// Add event listeners to each related picture
document.querySelectorAll('.related-pictures img').forEach(img => {
    img.addEventListener('click', () => {
        // Swap the sources of the clicked picture and the student picture
        const tempSrc = img.src;
        img.src = studentPicture.src;
        studentPicture.src = tempSrc;

        // Swap the associated texts of the clicked picture and the student picture
        const tempText = img.dataset.text;
        img.dataset.text = studentPicture.dataset.text;
        studentPicture.dataset.text = tempText;

        // Update the displayed feedback text
        feedbackText.textContent = studentPicture.dataset.text;
    });
});


document.addEventListener("DOMContentLoaded", function() {
    
    var getStartedButton = document.querySelector(".start-button");
    var joinUsButton = document.querySelector(".join-us-button");
    var joinUsButtonn=document.querySelector(".join-us-buttonn");
    var popupContainer = document.getElementById("popup-container");
    var footerButton=document.querySelector(".button-footer");
    
    
    getStartedButton.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
       
    });
    
    
    joinUsButton.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
        
    });

    
    joinUsButtonn.addEventListener("click", function() {
        
        popupContainer.classList.add("active");
        
    });

    footerButton.addEventListener("click", function() {
        
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

document.querySelector('.view-details-button').addEventListener('click', function() {
    var popup = document.querySelector('.popup3');
    popup.style.display = 'block'; // Display the popup

    // Hide the popup after 4 seconds 
    setTimeout(function() {
        popup.style.display = 'none';
    }, 3000);
});

// Function to scroll to the footer section when the "Contact" link is clicked
document.addEventListener("DOMContentLoaded", function() {
    var contactLink = document.querySelector(".contact-link");
    var footerSection = document.getElementById("footer-section");

    if (contactLink && footerSection) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Scroll smoothly to the footer section
            footerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Function to scroll to the footer section when the "About" link is clicked
document.addEventListener("DOMContentLoaded", function() {
    var contactLink = document.querySelector(".about-link");
    var footerSection = document.getElementById("footer-section");

    if (contactLink && footerSection) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Scroll smoothly to the footer section
            footerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var contactLink = document.querySelector(".contact-link");
    var footerSection = document.getElementById("footer-section");
    var facebookIcon = document.getElementById("facebook-icon");
    var linkedinIcon = document.getElementById("linkedin-icon");
    var instagramIcon = document.getElementById("instagram-icon");
    var emailIcon = document.getElementById("email-icon");
    var iconsShined = false;

    if (contactLink && footerSection) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Scroll smoothly to the footer section
            footerSection.scrollIntoView({ behavior: 'smooth' });

            // Add the shine effect to icons only once
            if (!iconsShined) {
                setTimeout(function() {
                    facebookIcon.classList.add("shine");
                    linkedinIcon.classList.add("shine");
                    instagramIcon.classList.add("shine");
                    emailIcon.classList.add("shine");
                    iconsShined = true;
                }, 1000); // Delay the shining effect by 1 second
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var aboutLink = document.querySelector(".about-link");
    var footerSection = document.getElementById("footer-section");
    var aboutusLink = document.getElementById("aboutus-link");
    var helpLink = document.getElementById("help-link");
    var policyLink = document.getElementById("policy-link");
    var termLink = document.getElementById("term-link");
    var iconsShined = false;

    if (aboutLink && footerSection) {
        aboutLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Scroll smoothly to the footer section
            footerSection.scrollIntoView({ behavior: 'smooth' });

            // Add the shine effect to icons only once
            if (!iconsShined) {
                setTimeout(function() {
                    aboutusLink.classList.add("shine");
                    helpLink.classList.add("shine");
                    policyLink.classList.add("shine");
                    termLink.classList.add("shine");
                    iconsShined = true;
                }, 1000); // Delay the shining effect by 1 second
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var joinUsButton = document.getElementById("join-us-footer");
    var popupContainer = document.getElementById("popup-container");

    if (joinUsButton && popupContainer) {
        joinUsButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default button behavior

            // Scroll smoothly to the first section
            document.querySelector("section.video-section").scrollIntoView({ behavior: 'smooth' });

            // Show the popup container
            popupContainer.style.display = 'block';
        });
    }
});
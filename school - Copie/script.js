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
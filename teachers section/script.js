function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}


document.addEventListener("DOMContentLoaded", function() {
  const ratings = document.querySelectorAll('.rating');
  ratings.forEach(rating => {
      const ratingValue = parseInt(rating.dataset.rating);
      rating.innerHTML = generateStars(ratingValue);
  });
});

function generateStars(rating) {
  const filledStar = '★';
  const emptyStar = '☆';
  let starsHTML = '';

  for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
          starsHTML += filledStar;
      } else {
          starsHTML += emptyStar;
      }
  }

  return starsHTML;
}

/* rating teachers "stars !!" */

// document.addEventListener('DOMContentLoaded', function() {
//   const teachers = document.querySelectorAll('.teacher');

//   teachers.forEach(function(teacher) {
//     const stars = teacher.querySelectorAll('.star');

//     stars.forEach(function(star) {
//       star.addEventListener('click', function() {
//         const rating = parseInt(star.getAttribute('data-value'));
//         const parent = star.parentElement;
      
//         // Update data-rating attribute
//         parent.setAttribute('data-rating', rating);
      
//         // Add 'active'  to stars up to the clicked one
//         stars.forEach(function(s, index) {
//           if (index < rating) {
//             s.classList.add('active');
//           } else {
//             s.classList.remove('active');
//           }
//         });
//       });

   
//     });
//   });
// });

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
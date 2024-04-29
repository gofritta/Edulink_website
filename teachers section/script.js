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

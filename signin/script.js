const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener(
    'click', () => {
    container.classList.add("active");
}
);//fonction anonyme

loginBtn.addEventListener(
    'click', () => {
    container.classList.remove("active");
}
);
    function showSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'flex'
    }
    function hideSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'none'
    }

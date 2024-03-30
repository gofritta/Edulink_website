console.log("Loading...");

document.addEventListener("DOMContentLoaded", function() {
document.getElementById("open-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
});

document.getElementById("dismiss-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
});

});

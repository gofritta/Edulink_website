document.getElementById('profile-picture').addEventListener('change', function(e) {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('profile-picture-preview').src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
});
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});


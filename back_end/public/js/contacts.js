let profile =  localStorage.getItem('profile');
let usersNav = document.getElementById('usersNav');

if(profile != "Admin"){
    usersNav.style.display = "none";
}
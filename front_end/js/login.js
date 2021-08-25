import alerta from './helpers/alert';
const txtUser = document.getElementById("username");
const txtPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");




alerta("Hello World");


// btnSubmit.addEventListener("click", (e) => {
//     e.preventDefault();
//     request("/login", {
//         method: "POST",
//         body: { user: txtUser.value, password: txtPassword.value },
//     }).then((res) => {
//         localStorage.setItem("ejercicio_token", res.token);
//         localStorage.setItem('ejercicio_admin', res.admin);
//         window.location.replace('./public/users.html'); 
//     }).catch(err => {
//       console.log(err);
//     });
// });
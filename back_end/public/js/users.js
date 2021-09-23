let profile =  localStorage.getItem('profile');
let jwt = localStorage.getItem('user_token');
let usersNav = document.getElementById('usersNav');
let nameUserCreate = document.getElementById('nameUserCreate');
let surnameUserCreate = document.getElementById('surnameUserCreate');
let emailUserCreate = document.getElementById('emailUserCreate');
let profileUserCreate = document.getElementById('profileUserCreate');
let passwordUserCreate = document.getElementById('passwordUserCreate');
let submit = document.getElementById('submit');
let requireCreateName = document.getElementById('requireCreateName');
let requireCreateSurname = document.getElementById('requireCreateSurname');
let requireCreateEmail = document.getElementById('requireCreateEmail');
let requireCreatePassword = document.getElementById('requireCreatePassword');
let requireCreateProfile = document.getElementById('requireCreateProfile');
let userList = document.getElementById('userList');
let submitEdit = document.getElementById('submitEdit');
let requireUpdateId = document.getElementById('requireUpdateId');
let requireUpdateName = document.getElementById('requireUpdateName');
let requireUpdateSurname = document.getElementById('requireUpdateSurname');
let requireUpdateEmail = document.getElementById('requireUpdateEmail');
let requireUpdateProfile = document.getElementById('requireUpdateProfile');
let idUserUpdate = document.getElementById('idUserUpdate');
let requireUpdatePassword = document.getElementById('requireUpdatePassword');

if(profile != "Admin"){
    usersNav.style.display = "none";
}

async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = {
            status: response.status,
            statusText: response.statusText,
            response: await response.json(),
        };
        throw error;
    }
}

const request = (url, options = {}) => {
    options.credentials = "include";
    options.mode = "cors";
    options.cache = "default";
    options.body = JSON.stringify(options.body);
    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
    };

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(checkStatus)
            .then((response) => response.json())
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

function createUser(){
    request('http://localhost:3000/api/user', {
        method: 'POST',
        body: {
            "name": nameUserCreate.value,
            "surname": surnameUserCreate.value,
            "email": emailUserCreate.value,
            "profile_id": profileUserCreate.value,
            "password": passwordUserCreate.value,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        location.reload();
    }).catch(function(error){
        console.log(error);
    }
    )
}

submit.addEventListener('click',e => {
    e.preventDefault();
    fieldsRequired();
    if(nameUserCreate.value !== "" && surnameUserCreate.value !== "" && emailUserCreate.value !== "" && profileUserCreate.value !== "" && passwordUserCreate.value !== ""){
        createUser();
    }
    
})

function fieldsRequired(){
    if(nameUserCreate.value == ""){
        nameUserCreate.style.border = "1px solid red";
        requireCreateName.classList.add('require'); 
        setTimeout(() => {
            nameUserCreate.style.border = "1px solid #ced4da";
        }, 2000);  
        nameUserCreate.addEventListener('keypress', () => {
            requireCreateName.classList.remove('require');
        })
    }
    if(surnameUserCreate.value == ""){
        surnameUserCreate.style.border = "1px solid red";
        requireCreateSurname.classList.add('require');
        setTimeout(() => {
            surnameUserCreate.style.border = "1px solid #ced4da";
        }, 2000);        
        surnameUserCreate.addEventListener('keypress', () => {
            requireCreateSurname.classList.remove('require');
        })
    }
    if(emailUserCreate.value == ""){
        emailUserCreate.style.border = "1px solid red";
        requireCreateEmail.classList.add('require');
        setTimeout(() => {
            emailUserCreate.style.border = "1px solid #ced4da";
        }, 2000);        
        emailUserCreate.addEventListener('keypress', () => {
            requireCreateEmail.classList.remove('require');
        })
    }
    if(profileUserCreate.value == ""){
        profileUserCreate.style.border = "1px solid red";
        requireCreateProfile.classList.add('require');
        setTimeout(() => {
            profileUserCreate.style.border = "1px solid #ced4da";
        }, 2000);        
        profileUserCreate.addEventListener('click', () => {
            requireCreateProfile.classList.remove('require');
        })
    }
    if(passwordUserCreate.value == ""){
        passwordUserCreate.style.border = "1px solid red";
        requireCreatePassword.classList.add('require');
        setTimeout(() => {
            passwordUserCreate.style.border = "1px solid #ced4da";
        }, 2000);        
        passwordUserCreate.addEventListener('keypress', () => {
            requireCreatePassword.classList.remove('require');
        })
    }
}

function insertUser(){
    request('http://localhost:3000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        renderUserList(response);
    }).catch(function(error){
        console.log(error);
    }
    )
}
insertUser();   

function renderUserList(response){
    for(let i = 0; i < response.data.length; i++){
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${response.data[i].name}</td>
                    <td>${response.data[i].surname}</td>
                    <td id="userId${response.data[i].id}">${response.data[i].id}</td>
                    <td><i class="fas fa-trash" id="trash${response.data[i].id}"></i></td>`
    userList.appendChild(tr);
    let trash = document.getElementById(`trash${response.data[i].id}`);
    trash.addEventListener('click', () => {
        if(confirm(`¿Estas seguro que deseas eliminar a ${response.data[i].name} de la lista de Usuarios?`)){
            deleteUser(response.data[i].id);
        }else{
            alert('Operacion cancelada');
        }
    })
    }
}

function updateUser(){
    request(`http://localhost:3000/api/user/${idUserUpdate.value}`, {
        method: 'PATCH',
        body: {
            "name": nameUserUpdate.value,
            "surname": surnameUserUpdate.value,
            "email": emailUserUpdate.value,
            "password": passwordUserUpdate.value,
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        location.reload();
    }).catch(function(error){
        console.log(error);
    }
    )
}

submitEdit.addEventListener('click',e => {
    e.preventDefault();
    if(idUserUpdate.value !== ""){
        updateUser();
    }
    
})

function deleteUser(userDeleted){
    request(`http://localhost:3000/api/user/${userDeleted}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        location.reload();
    }).catch(function(error){
        console.log(error);
    }
    )
}


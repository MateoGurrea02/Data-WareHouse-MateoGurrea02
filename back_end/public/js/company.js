let profile =  localStorage.getItem('profile');
let usersNav = document.getElementById('usersNav');
let companyData = document.getElementById('companyData');
let jwt = localStorage.getItem('user_token');
let nameCreate = document.getElementById('nameCreate');
let directionCreate = document.getElementById('directionCreate');
let phoneCreate = document.getElementById('phoneCreate');
let emailCreate = document.getElementById('emailCreate');
let cityCreate = document.getElementById('cityCreate');
let btnAddCompany = document.getElementById('btnAddCompany');
let addCompany = document.getElementById('addCompany');
let btnCloseCreate = document.getElementById('btnCloseCreate');
let bgOpacity = document.getElementById('bgOpacity');
let btnCreateCompanyRequest = document.getElementById('btnCreateCompanyRequest');
let nameUpdate = document.getElementById('nameUpdate');     
let directionUpdate = document.getElementById('directionUpdate');
let phoneUpdate = document.getElementById('phoneUpdate');
let emailUpdate = document.getElementById('emailUpdate');
let cityUpdate = document.getElementById('cityUpdate');
let updateCompany = document.getElementById('updateCompany');
let btnCloseUpdate = document.getElementById('btnCloseUpdate');
let btnUpdateCompanyRequest = document.getElementById('btnUpdateCompanyRequest');

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


function getCompany(){
    request('http://localhost:3000/api/company', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        renderCompany(response);
    }).catch(function(error){
        console.log(error);
    }
    )
}

function renderCompany(response){
    for(let i = 0; i < response.data.length; i++){
        let tr = document.createElement('tr');
        tr.innerHTML = `<td><h3>${response.data[i].name}</h3></td>
                        <td>${response.data[i].direction}</td>
                        <td>${response.data[i].phone}</td>
                        <td>${response.data[i].email}</td>
                        <td>${response.data[i].city.country.name}</td>
                        <td>${response.data[i].id}</td>
                        <td>
                            <button value="${response.data[i].id}" id="btnUpdate${response.data[i].id}"><i class="fas fa-pen"></i></button>
                            <button value="${response.data[i].id}" id="btnDelete${response.data[i].id}"><i class="fas fa-trash"></i></button>
                        </td>
                        `;
        companyData.appendChild(tr);

        let btnUpdate = document.getElementById(`btnUpdate${response.data[i].id}`);
        let btnDelete = document.getElementById(`btnDelete${response.data[i].id}`);

        btnDelete.addEventListener('click', function(){
            deleteCompany(response.data[i].id);
            window.location.reload();
        });

        btnUpdate.addEventListener('click', function(){
            bgOpacity.classList.add('bgOpacity');
            updateCompany.style.display = "block";
            companyIdUpdate.value = response.data[i].id;
            btnUpdateCompanyRequest.addEventListener('click', function(){
                updateCompanyRequest(response.data[i].id);
            });
        })

        btnCloseUpdate.addEventListener('click', function(){
            bgOpacity.classList.remove('bgOpacity');
            updateCompany.style.display = "none";
        })
    }
}

function deleteCompany(id){
    request(`http://localhost:3000/api/company/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    })
}
function createCompany(){
    request('http://localhost:3000/api/company', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: {
            name: nameCreate.value,
            direction: directionCreate.value,
            phone: phoneCreate.value,
            email: emailCreate.value,
            city_id: cityCreate.value
        }
    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    })
}

btnCreateCompanyRequest.addEventListener('click', function(){
    createCompany();
    window.location.reload();
});

btnAddCompany.addEventListener('click', function(){
    addCompany.style.display = "block";
    bgOpacity.classList.add('bgOpacity');
});

btnCloseCreate.addEventListener('click', function(){
    addCompany.style.display = "none";
    bgOpacity.classList.remove('bgOpacity');
});

function getCity(){
    request('http://localhost:3000/api/city', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        renderCityCreate(response);
        renderCityUpdate(response)
    }).catch(function(error){
        console.log(error);
    }
    )
}

function renderCityCreate(response){
    for(let i = 0; i < response.data.length; i++){
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        cityCreate.appendChild(option);
    }
}
function renderCityUpdate(response){
    for(let i = 0; i < response.data.length; i++){
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        cityUpdate.appendChild(option);
    }
}


function updateCompanyRequest(id){
    request(`http://localhost:3000/api/company/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: {
            name: nameUpdate.value,
            direction: directionUpdate.value,
            phone: phoneUpdate.value,
            email: emailUpdate.value,
            city_id: cityUpdate.value
        }
    }).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    })
}




getCity();
getCompany();

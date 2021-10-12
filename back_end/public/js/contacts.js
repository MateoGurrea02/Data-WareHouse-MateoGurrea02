let profile =  localStorage.getItem('profile');
let jwt = localStorage.getItem('user_token');
let usersNav = document.getElementById('usersNav');
let contactTable = document.getElementById('contactTable');
let btnAddContact = document.getElementById('btnAddContact');
let bgOpacity = document.getElementById('bgOpacity');
let artAddContact = document.getElementById('artAddContact');
let btnCloseArtContactAdd = document.getElementById('btnCloseArtContactAdd');
let interestBarFill = document.getElementById('interestBarFill');
let interestContactCreate = document.getElementById('interestContactCreate');
let countryContact = document.getElementById('countryContact');
let regionContact = document.getElementById('regionContact');
let cityContact = document.getElementById('cityContact');
let companyContactCreate = document.getElementById('companyContactCreate');
let btnSaveContact = document.getElementById('btnSaveContact');
let btnCancelContact = document.getElementById('btnCancelContact');
let directionContactCreate = document.getElementById('directionContactCreate');

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

function getContacts() {
    request('http://localhost:3000/api/contact', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderContactList(response);
    }).catch(function(error){
        console.log(error);
    })
}

function renderContactList(response){
    for(let i = 0; i < response.data.length; i++){
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><i class="far fa-square" id="checkBox${response.data[i].id}"></i></td>
            <td>
                <div class="contactName">
                    <img src="./images/descarga.png" alt="">
                    <span>
                        <h3>${response.data[i].name}</h3>
                        <p>${response.data[i].email}</p>
                    </span>
                </div>
            </td>
            <td>
                <div class="contactCountry">
                    <h3>${response.data[i].city.country.region.name}</h3>
                    <p>${response.data[i].city.country.name}</p>
                </div>
            </td>
            <td>${response.data[i].company.name}</td>
            <td>${response.data[i].position_company}</td>
            <td>
                <div class="contactPreferredChannel">
                    <h3>Pending</h3>
                    <h3>Pending</h3>
                </div>
            </td>
            <td>
                <div class="interestDiv">
                    <p>${response.data[i].interest}%</p>
                    <div class="interestBarEmpty">
                        <div id="interestBarFill" class="interestBarFill" style="width: ${response.data[i].interest}%; background-color:${colorBar(response.data[i].interest)};"></div>
                    </div>
                </div>
            </td>
            <td><i class="fas fa-ellipsis-h"></i></td>
        `;
        contactTable.appendChild(tr);
            
    }
}


btnAddContact.addEventListener('click', function(){
    bgOpacity.classList.add('bgOpacity');
    artAddContact.style.display = "block";
});
btnCloseArtContactAdd.addEventListener('click', function(){
    bgOpacity.classList.remove('bgOpacity');
    artAddContact.style.display = "none";
});

// renderizando la barra de interes segun el porcentaje
function colorBar(number){
    if (number <= 25){
        return '#1CC1F5';
    }else if(number > 25 && number <= 50){
        return '#FFC700';
    }else if(number > 50 && number <= 75){
        return '#FF6F00';
    }else if(number > 75 && number <= 100){
        return '#DE0028';
    }
}
interestContactCreate.addEventListener('click', function(){
    interestBarFill.style.width = `${interestContactCreate.value}%`;
    interestBarFill.style.backgroundColor = colorBar(interestContactCreate.value);
});

function getCities(){
    request('http://localhost:3000/api/city', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderCCR(response);
    }).catch(function(error){
        console.log(error);
    })
}

function renderCCR(response){
    //ciclo para renderizar las ciudades
    for(let i = 0; i < response.data.length; i++){
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        cityContact.appendChild(option);
    }
    //ciclo para renderizar los paises
    for(let i = 0; i < response.data.length; i++){
        //eliminar paises repetidos
        if(i === 0){
            let option = document.createElement('option');
            option.innerHTML = `${response.data[i].country.name}`;
            option.value = `${response.data[i].country.id}`;
            countryContact.appendChild(option);
        }else{
            if(response.data[i].country.name != response.data[i-1].country.name){
            let option = document.createElement('option');
            option.innerHTML = `${response.data[i].country.name}`;
            option.value = `${response.data[i].country.id}`;
            countryContact.appendChild(option);
            }
        }
    }
    //ciclo para renderizar las regiones
    for(let i = 0; i < response.data.length; i++){
        //eliminar regiones repetidas
        if(i === 0){
            let option = document.createElement('option');
            option.innerHTML = `${response.data[i].country.region.name}`;
            option.value = `${response.data[i].country.region.id}`;
            regionContact.appendChild(option);
        }else{
            if(response.data[i].country.region.name != response.data[i-1].country.region.name){
                let option = document.createElement('option');
                option.innerHTML = `${response.data[i].country.region.name}`;
                option.value = `${response.data[i].country.region.id}`;
                regionContact.appendChild(option);
            }
        }
    }

    //eventos para cambiar segun corresponda los options de paises,regiones y ciudades
    cityContact.addEventListener('change', function(){
        for(let i = 0; i < response.data.length; i++){
            if(response.data[i].id == cityContact.value){
                countryContact.value = response.data[i].country.id;
                regionContact.value = response.data[i].country.region.id;
            }
        }
    });
    countryContact.addEventListener('change', function(){
        for(let i = 0; i < response.data.length; i++){
            if(response.data[i].country.id == countryContact.value){
                regionContact.value = response.data[i].country.region.id;
                cityContact.value = response.data[i].id;
            }
        }
    });
    regionContact.addEventListener('change', function(){
        for(let i = 0; i < response.data.length; i++){
            if(response.data[i].country.region.id == regionContact.value){
                cityContact.value = response.data[i].id;
                countryContact.value = response.data[i].country.id;
            }
        }
    });
}

function getCompanies(){
    request('http://localhost:3000/api/company', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderCompanies(response);
    }).catch(function(error){
        console.log(error);
    })
}
function renderCompanies(response){
    for(let i = 0; i < response.data.length; i++){
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        companyContactCreate.appendChild(option);
    }
}

function createContact(){
    if(interestContactCreate.value == 0){
        request('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body:{
                name: nameContactCreate.value,
                surname: surnameContactCreate.value,
                email: emailContactCreate.value,
                company_id: companyContactCreate.value,
                position_company: positionContactCreate.value,
                city_id: cityContact.value,
                direction: directionContactCreate.value,
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }else{
        request('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body:{
                name: nameContactCreate.value,
                surname: surnameContactCreate.value,
                email: emailContactCreate.value,
                company_id: companyContactCreate.value,
                position_company: positionContactCreate.value,
                city_id: cityContact.value,
                direction: directionContactCreate.value,
                interest: interestContactCreate.value,
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        })
    }

}

btnSaveContact.addEventListener('click', function(){
    createContact();
    window.location.reload();
});
btnCancelContact.addEventListener('click', function(){
    nameContactCreate.value = '';
    surnameContactCreate.value = '';
    emailContactCreate.value = '';
    companyContactCreate.value = '';
    positionContactCreate.value = '';
    cityContact.value = '';
    interestContactCreate.value = 0;
    interestBarFill.style.width = '0%';
    directionContactCreate.value = '';
    btnCloseArtContactAdd.click();
});

getCompanies();
getCities();
getContacts();
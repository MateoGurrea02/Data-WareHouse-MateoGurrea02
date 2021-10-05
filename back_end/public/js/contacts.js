let profile =  localStorage.getItem('profile');
let jwt = localStorage.getItem('user_token');
let usersNav = document.getElementById('usersNav');
let contactTable = document.getElementById('contactTable');

if(profile != "Admin"){
    usersNav.style.display = "none";
}

//example
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
//example

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

getContacts();
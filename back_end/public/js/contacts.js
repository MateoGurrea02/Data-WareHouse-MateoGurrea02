
let profile = localStorage.getItem('profile');
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
let contactChannelCreate = document.getElementById('contactChannelCreate');
let informationConctactChannelCreate = document.getElementById('informationConctactChannelCreate');
let preferenceContactChannelCreate = document.getElementById('preferenceContactChannelCreate');
let btnAgregarContactChannelCreate = document.getElementById('btnAgregarContactChannelCreate');
let contactChannelForm = document.getElementById('contactChannelForm');
let btnCheckbox = document.getElementById('btnCheckbox');
let contactCount = document.getElementById('contactCount');
let contactIdArray = [];
let trashAndCount = document.getElementById('trashAndCount');
let btnDeleteContactCheck = document.getElementById('btnDeleteContactCheck');
let searchInput = document.getElementById('searchInput');
let btnSearch = document.getElementById('btnSearch');
let renderSugerencias = document.getElementById('renderSugerencias');
let search = document.getElementById('search');
let iconDown = document.getElementById('iconDown');
let nameSearch = document.getElementById('nameSearch');
let positionSearch = document.getElementById('positionSearch');
let countrySearch = document.getElementById('countrySearch');
let regionSearch = document.getElementById('regionSearch');
let interestSearch = document.getElementById('interestSearch');
let companySearch = document.getElementById('companySearch');
let section = document.getElementById('section');
let textContact = `<tr>
                    <th><i class="far fa-square" id="btnCheckbox"></i></th>
                    <th>Contacto</th>
                    <th>Pais/Region</th>
                    <th>Compañia</th>
                    <th>Cargo</th>
                    <th>Canal Favorito</th>
                    <th>Interes</th>
                    <th>Acciones</th>
                </tr>`

if (profile != "Admin") {
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
    }).then(function (response) {
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
function getContactChannel() {
    request('http://localhost:3000/api/contact_channel', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        renderContactChannelCreate(response);
    }).catch(function (error) {
        console.log(error);
    })
}
function getCities() {
    request('http://localhost:3000/api/city', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        renderCCR(response, cityContact, countryContact, regionContact);
    }).catch(function (error) {
        console.log(error);
    })
}
function getCompanies() {
    request('http://localhost:3000/api/company', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        renderCompanies(response);
        //llamado a la funcion para renderizar las opciones de busqueda de compañias
        renderSearchCompanyInfo(response)
    }).catch(function (error) {
        console.log(error);
    })
}
function getCountrys() {
    request('http://localhost:3000/api/country', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        renderSearchCountryInfo(response);
    }).catch(function (error) {
        console.log(error);
    })
}
function getRegions() {
    request('http://localhost:3000/api/region', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        renderSearchRegionInfo(response);
    }).catch(function (error) {
        console.log(error);
    })
}

function renderContactList(response) {
    for (let i = 0; i < response.data.length; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><i class="far fa-square" id="${response.data[i].id}"></i></td>
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
                <div class="contactPreferredChannel" id="contactPreferredChannel${response.data[i].id}">
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
            <td id="elipsis${response.data[i].id}">
                <i class="fas fa-ellipsis-h" id="elipsisIcon${response.data[i].id}"></i>
                <span class="trashPen" id="trashPen${response.data[i].id}">
                    <i class="fas fa-trash" id="trash${response.data[i].id}"></i>
                    <i class="fas fa-pen" id="edit${response.data[i].id}"></i>
                </span>
            </td>
        `;
        contactTable.appendChild(tr);
        //canal preferido del contacto
        let largo = response.data[i].contact_channel_line.map(function (element) {
            return element
        })

        let preferredChannel = document.getElementById(`contactPreferredChannel${response.data[i].id}`)
        
        //render en del canal preferido

        for (let i = 0; i < largo.length; i++) {
            if ((largo[i].preference.id === 2) && (preferredChannel.children.length < 2)) {
                let h3 = document.createElement('h3');
                h3.innerHTML = `${largo[i].contact_channel.name}`;
                preferredChannel.appendChild(h3);
            }
        }

        //render y cambio de estilo del checkbox para seleccionar contactos
        let checkbox = document.getElementById(`${response.data[i].id}`);

        let elipsis = document.getElementById(`elipsis${response.data[i].id}`);
        let elipsisIcon = document.getElementById(`elipsisIcon${response.data[i].id}`);
        let trash = document.getElementById(`trash${response.data[i].id}`);
        let edit = document.getElementById(`edit${response.data[i].id}`);
        let trashPen = document.getElementById(`trashPen${response.data[i].id}`);
        //Cambios de estilos para las acciones de editar y borrar contacto
        elipsis.addEventListener('mouseover', function () {
            elipsisIcon.style.display = "none";
            trashPen.classList.remove('trashPen');
        });
        elipsis.addEventListener('mouseout', function () {
            elipsisIcon.style.display = "block";
            trashPen.classList.add('trashPen');
        });

        //evento para eliminar contacto desde las acciones
        trash.addEventListener('click', function () {
            deleteContactCheck(response.data[i].id);
        });
        //evento para editar contacto desde las acciones
        edit.addEventListener('click', function () {
            let article = document.createElement('article');
            article.innerHTML = `
                                <div class="primaryForm">
                                <div class="primaryFromTitle">
                                    <h2>Editar Contacto</h2>
                                    <i class="fas fa-times" id="btnCloseArtContactUpdate"></i>
                                </div>
                                <div class="primaryFormCreate">
                                    <form action="">
                                        <div>
                                            <img src="./images/descarga.png" alt="">
                                            <!-- <span class="camera"> -->
                                            <i class="fas fa-camera"></i>
                                            <!-- </span> -->
                                        </div>
                                        <div>
                                            <label for="nameContactUpdate">Nombre</label>
                                            <input type="text" id="nameContactUpdate" value="${response.data[i].name}">
                                        </div>
                                        <div>
                                            <label for="surnameContactUpdate">Apellido</label>
                                            <input type="text" id="surnameContactUpdate" value="${response.data[i].surname}">
                                        </div>
                                        <div>
                                            <label for="positionContactUpdate">Cargo</label>
                                            <input type="text" id="positionContactUpdate" value="${response.data[i].position_company}">
                                        </div>
                                        <div>
                                            <label for="emailContactUpdate">Correo Electronico</label>
                                            <input type="email" id="emailContactUpdate" value="${response.data[i].email}">
                                        </div>
                                        <div>
                                            <label for="companyContactUpdate">Compañia</label>
                                            <select name="" id="companyContactUpdate">
                                                <option selected value="${response.data[i].company.id}">${response.data[i].company.name}</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="secondaryForm">
                            <form action="" class="secondaryFormCreate">
                                <div>
                                    <label for="regionContact">Region</label>
                                    <select name="" id="regionContactUpdate">
                                        <option value="${response.data[i].city.country.region.id}">${response.data[i].city.country.region.name}</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="countryContact">Pais</label>
                                    <select name="" id="countryContactUpdate">
                                        <option value="${response.data[i].city.country.id}">${response.data[i].city.country.name}</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="cityContact">Ciudad</label>
                                    <select name="" id="cityContactUpdate">
                                        <option value="${response.data[i].city.id}">${response.data[i].city.name}</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="directionContactUpdate">Drireccion</label>
                                    <input type="text" id="directionContactUpdate" value="${response.data[i].direction}">
                                </div>
                                <div>
                                    <p>Interes</p>
                                    <div class="interestDiv">
                                        <label for="interestContactUpdate">
                                            <div class="interestBarEmpty">
                                                <div id="interestBarFillUpdate" class="interestBarFill" style="width:${response.data[i].interest};">
            
                                                </div>
                                            </div>
                                        </label>
                                        <select name="" id="interestContactUpdate">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="contactChannelForm" id="contactChannelFormUpdate">
                        </div>
                    </div>
                    <div class="saveCancelDiv">
                        <button class="btnCancelContact" id="btnCancelContactUpdate">Cancelar</button>
                        <button class="btnSaveContact" id="btnSaveContactUpdate">Guardar Contacto</button>
                    </div>
                        `;
            article.classList.add('artAddContact');
            article.id = 'artUpdateContact';
            section.appendChild(article);
            let artUpdateContact = document.getElementById('artUpdateContact');
            artUpdateContact.style.display = 'block';
            bgOpacity.classList.add('bgOpacity');
            //evento para cerrar el formulario
            let btnCloseArtContactUpdate = document.getElementById('btnCloseArtContactUpdate');
            btnCloseArtContactUpdate.addEventListener('click', function () {
                artUpdateContact.style.display = 'none';
                bgOpacity.classList.remove('bgOpacity');
                artUpdateContact.remove();
            });
            let interestBarFillUpdate = document.getElementById('interestBarFillUpdate');
            let interestContactUpdate = document.getElementById('interestContactUpdate');
            interestContactUpdate.value = response.data[i].interest;
            interestBarFillUpdate.style.width = `${response.data[i].interest}%`;
            interestBarFillUpdate.style.backgroundColor = colorBar(response.data[i].interest);
            let contactChannelFormUpdate = document.getElementById('contactChannelFormUpdate');
            //canales de contacto
            if(response.data[i].contact_channel_line.length > 0){
                for (let j = 0; j < response.data[i].contact_channel_line.length; j++) {
                    let contactChannel = document.createElement('form');
                    contactChannel.innerHTML = `
                        <div>
                            <label for="contactChannelUpdate${response.data[i].id}">Canal de Contacto</label>
                            <select type="text" id="contactChannelUpdate${response.data[i].id}" readonly">
                                <option value="${response.data[i].id}">${response.data[i].contact_channel_line[j].contact_channel.name}</option>
                            </select>
                        </div>
                        <div>
                            <label for="informationUpdate${response.data[i].id}">Informacion de Contacto</label>
                            <input type="text" id="informationUpdate${response.data[i].id}" value="${response.data[i].contact_channel_line[j].information}">
                        </div>
                        <div>
                            <label for="preferenceUpdate${response.data[i].id}">Preferencia</label>
                            <select name="" id="preferenceUpdate${response.data[i].id}">
                                <option value="1">Sin Preferencia</option>
                                <option value="2" selected>Canal Favorito</option>
                                <option value="3">No molestar</option>
                            </select>
                        </div>
                        <div>
                            <button id="btnAgregarContactChannelUpdate${response.data[i].id}"><i class="fas fa-plus"></i>Guardar Canal</button>
                        </div>
                    `
                    contactChannelFormUpdate.appendChild(contactChannel);
                    let btnAgregarContactChannelUpdate = document.getElementById(`btnAgregarContactChannelUpdate${response.data[i].id}`);
                    let contactChannelUpdate = document.getElementById(`contactChannelUpdate${response.data[i].id}`);
                    let preferenceUpdate = document.getElementById(`preferenceUpdate${response.data[i].id}`);
                    let informationUpdate = document.getElementById(`informationUpdate${response.data[i].id}`);
                    let contact_id = response.data[i].id;
                    let contact_channel_id = response.data[i].contact_channel_line[j].id;
                    btnAgregarContactChannelUpdate.addEventListener('click', function (e) {
                        e.preventDefault();
                        console.log(contact_id);
                        console.log(contact_channel_id);
                        console.log(preferenceUpdate.value);
                        console.log(informationUpdate.value);
                        contactChannelUpdated( contact_channel_id , informationUpdate.value, preferenceUpdate.value);
                    });
                }
            }
            let btnSaveContactUpdate = document.getElementById('btnSaveContactUpdate')
            btnSaveContactUpdate.addEventListener('click', function () {
                contactUpdated(response.data[i].id);
                window.location.reload();
            });
            function renderCompaniesUpdate() {
                request('http://localhost:3000/api/company', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    }
                }).then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        let option = document.createElement('option');
                        option.innerHTML = `${response.data[i].name}`;
                        option.value = `${response.data[i].id}`;
                        companyContactUpdate.appendChild(option);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
                
            }
            function getCitiesUpdate() {
                request('http://localhost:3000/api/city', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    }
                }).then(function (response) {
                    renderCCR(response, cityContactUpdate, countryContactUpdate, regionContactUpdate);
                }).catch(function (error) {
                    console.log(error);
                })
            }
            renderCompaniesUpdate();
            getCitiesUpdate();
        });


        //checkbox para seleccionar contactos
        checkbox.addEventListener('click', function () {
            if (checkbox.classList.contains('far')) {
                checkbox.classList.remove('fa-square');
                checkbox.classList.remove('far');
                checkbox.classList.add('fa-check-square');
                checkbox.classList.add('fas');
                checkbox.style.color = '#0683F9';
                contactIdArray.push(response.data[i].id);
                if(contactIdArray.length > 0){
                    trashAndCount.style.display = 'flex';
                    contactCount.innerHTML = `${contactIdArray.length} Seleccionados`;
                }else{
                    trashAndCount.style.display = 'none';
                }
            } else if(checkbox.classList.contains('fas')) {
                checkbox.classList.remove('fa-check-square');
                checkbox.classList.remove('fas');
                checkbox.classList.add('fa-square');
                checkbox.classList.add('far');
                checkbox.style.color = 'grey';
                contactIdArray.splice(contactIdArray.indexOf(response.data[i].id), 1);
                if(contactIdArray.length > 0){
                    trashAndCount.style.display = 'flex';
                    contactCount.innerHTML = `${contactIdArray.length} Seleccionados`;
                    console.log(contactIdArray);
                }else{
                    trashAndCount.style.display = 'none';
                    console.log(contactIdArray);
                }
            }
        });
        
    }
}
function renderContactChannelCreate(response) {
    for(let i = 0; i < response.data.length; i++){
        let contactChannel = document.createElement('form');
        contactChannel.innerHTML = `
            <div>
                <label for="contactChannelCreate${response.data[i].name}">Canal de Contacto</label>
                <select type="text" id="contactChannelCreate${response.data[i].name}" readonly">
                    <option value="${response.data[i].id}">${response.data[i].name}</option>
                </select>
            </div>
            <div>
                <label for="informationCreate${response.data[i].name}">Informacion de Contacto</label>
                <input type="text" id="informationCreate${response.data[i].name}" placeholder="@ejemplo">
            </div>
            <div>
                <label for="preferenceCreate${response.data[i].name}">Preferencia</label>
                <select name="" id="preferenceCreate${response.data[i].name}">
                    <option value="1">Sin Preferencia</option>
                    <option value="2">Canal Favorito</option>
                    <option value="3">No molestar</option>
                </select>
            </div>
            <div>
                <button id="btnAgregarContactChannel${response.data[i].name}"><i class="fas fa-plus"></i>Agregar Canal</button>
            </div>
        `
        contactChannelForm.appendChild(contactChannel);
        let btnAgregarContactChannel = document.getElementById(`btnAgregarContactChannel${response.data[i].name}`);
        let contactChannelCreate = document.getElementById(`contactChannelCreate${response.data[i].name}`);
        let preferenceCreate = document.getElementById(`preferenceCreate${response.data[i].name}`);
        let informationCreate = document.getElementById(`informationCreate${response.data[i].name}`);
        btnAgregarContactChannel.disabled = true;
        let contact_id = JSON.parse(localStorage.getItem('contact_id'));
        btnAgregarContactChannel.addEventListener('click', function () {
            if(btnAgregarContactChannel.disabled === true){
                alert('Debes Guardar el contacto Primero');
            }else{
                addContactChannel(contact_id, contactChannelCreate.value, informationCreate.value, preferenceCreate.value);
                localStorage.removeItem('contact_id');

            }
        });
    }
}

        

//checkbox para seleccionar todos los contactos 
btnCheckbox.addEventListener('click', function () {
    if (btnCheckbox.classList.contains('far')) {
        btnCheckbox.classList.remove('fa-square');
        btnCheckbox.classList.remove('far');
        btnCheckbox.classList.add('fa-minus-square');
        btnCheckbox.classList.add('fas');
        btnCheckbox.style.color = '#0683F9';
        for (let i = 1; i < contactTable.children.length; i++) {
            contactTable.children[i].children[0].children[0].classList.remove('far');
            contactTable.children[i].children[0].children[0].classList.remove('fa-square');
            contactTable.children[i].children[0].children[0].classList.add('fa-check-square');
            contactTable.children[i].children[0].children[0].classList.add('fas');
            contactTable.children[i].children[0].children[0].style.color = '#0683F9';
            //contactIdArray string to a number
            contactIdArray.push(parseInt(contactTable.children[i].children[0].children[0].id));
            if(contactIdArray.length > 0){
                trashAndCount.style.display = 'flex';
                contactCount.innerHTML = `${contactIdArray.length} Seleccionados`;
            }else{
                trashAndCount.style.display = 'none';
            }
        }
    } else if(btnCheckbox.classList.contains('fas')) {
        btnCheckbox.classList.remove('fa-minus-square');
        btnCheckbox.classList.remove('fas');
        btnCheckbox.classList.add('fa-square');
        btnCheckbox.classList.add('far');
        btnCheckbox.style.color = 'grey';
        for (let i = 1; i < contactTable.children.length; i++) {
            contactTable.children[i].children[0].children[0].classList.remove('fa-check-square');
            contactTable.children[i].children[0].children[0].classList.remove('fas');
            contactTable.children[i].children[0].children[0].classList.add('far');
            contactTable.children[i].children[0].children[0].classList.add('fa-square');
            contactTable.children[i].children[0].children[0].style.color = 'grey';
            contactIdArray.splice(parseInt(contactIdArray.indexOf(contactTable.children[i].children[0].children[0].id), 1));
            if(contactIdArray.length > 0){
                trashAndCount.style.display = 'flex';
                contactCount.innerHTML = `${contactIdArray.length} Seleccionados`;
            }else{
                trashAndCount.style.display = 'none';
            }
        }
    }
})

btnAddContact.addEventListener('click', function () {
    bgOpacity.classList.add('bgOpacity');
    artAddContact.style.display = "block";
});
btnCloseArtContactAdd.addEventListener('click', function () {
    bgOpacity.classList.remove('bgOpacity');
    artAddContact.style.display = "none";
});

// renderizando la barra de interes segun el porcentaje
function colorBar(number) {
    if (number <= 25) {
        return '#1CC1F5';
    } else if (number > 25 && number <= 50) {
        return '#FFC700';
    } else if (number > 50 && number <= 75) {
        return '#FF6F00';
    } else if (number > 75 && number <= 100) {
        return '#DE0028';
    }
}
interestContactCreate.addEventListener('click', function () {
    interestBarFill.style.width = `${interestContactCreate.value}%`;
    interestBarFill.style.backgroundColor = colorBar(interestContactCreate.value);
});


function renderCCR(response, city, country, region) {
    //ciclo para renderizar las ciudades
    for (let i = 0; i < response.data.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        city.appendChild(option);
    }
    //ciclo para renderizar los paises
    for (let i = 0; i < response.data.length; i++) {
        //eliminar paises repetidos
        if (i === 0) {
            let option = document.createElement('option');
            option.innerHTML = `${response.data[i].country.name}`;
            option.value = `${response.data[i].country.id}`;
            country.appendChild(option);
        } else {
            if (response.data[i].country.name != response.data[i - 1].country.name) {
                let option = document.createElement('option');
                option.innerHTML = `${response.data[i].country.name}`;
                option.value = `${response.data[i].country.id}`;
                country.appendChild(option);
            }
        }
    }
    //ciclo para renderizar las regiones
    for (let i = 0; i < response.data.length; i++) {
        //eliminar regiones repetidas
        if (i === 0) {
            let option = document.createElement('option');
            option.innerHTML = `${response.data[i].country.region.name}`;
            option.value = `${response.data[i].country.region.id}`;
            region.appendChild(option);
        } else {
            if (response.data[i].country.region.name != response.data[i - 1].country.region.name) {
                let option = document.createElement('option');
                option.innerHTML = `${response.data[i].country.region.name}`;
                option.value = `${response.data[i].country.region.id}`;
                region.appendChild(option);
            }
        }
    }

    //eventos para cambiar segun corresponda los options de paises,regiones y ciudades
    city.addEventListener('change', function () {
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id == city.value) {
                country.value = response.data[i].country.id;
                region.value = response.data[i].country.region.id;
            }
        }
    });
    country.addEventListener('change', function () {
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].country.id == country.value) {
                region.value = response.data[i].country.region.id;
                city.value = response.data[i].id;
            }
        }
    });
    region.addEventListener('change', function () {
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].country.region.id == region.value) {
                city.value = response.data[i].id;
                country.value = response.data[i].country.id;
            }
        }
    });
}

function renderCompanies(response) {
    for (let i = 0; i < response.data.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = `${response.data[i].name}`;
        option.value = `${response.data[i].id}`;
        companyContactCreate.appendChild(option);
    }
}

function contactUpdated(id){
    request(`http://localhost:3000/api/contact/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body:{
            name:nameContactUpdate.value,
            surname: surnameContactUpdate.value,
            position_company: positionContactUpdate.value,
            email: emailContactUpdate.value,
            company_id: companyContactUpdate.value,
            city_id: cityContactUpdate.value,
            direction: directionContactUpdate.value,
            interest: interestContactUpdate.value,
        },
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
}
function contactChannelUpdated(id ,information, preference_id){
    request(`http://localhost:3000/api/contactChannel/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: {
            information: information,
            preference_id: preference_id,
        }
    }).then(function (response) {
        console.log(response);
    }
    ).catch(function (error) {
        console.log(error);
    });
}

function createContact() {
    if (interestContactCreate.value == 0) {
        request('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: {
                name: nameContactCreate.value,
                surname: surnameContactCreate.value,
                email: emailContactCreate.value,
                company_id: companyContactCreate.value,
                position_company: positionContactCreate.value,
                city_id: cityContact.value,
                direction: directionContactCreate.value,
            }
        }).then(function (response) {
            console.log(response.data);
            localStorage.setItem('contact_id', reponse.data);
            if (response.status == 201) {
                btnAgregarContactChannelWhatsApp.disabled = false;
                btnAgregarContactChannelTwitter.disabled = false;
                btnAgregarContactChannelFacebook.disabled = false;
                btnAgregarContactChannelTelefono.disabled = false;
            }else{
                console.log(response);
            }
        }).catch(function (error) {
            console.log(error);
        })
    } else {
        request('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
            body: {
                name: nameContactCreate.value,
                surname: surnameContactCreate.value,
                email: emailContactCreate.value,
                company_id: companyContactCreate.value,
                position_company: positionContactCreate.value,
                city_id: cityContact.value,
                direction: directionContactCreate.value,
                interest: interestContactCreate.value,
            }
        }).then(function (response) {
            let contact_id = response.data;
            localStorage.setItem('contact_id', contact_id);
            console.log(response.data);
            if (response.status == 201) {
                btnAgregarContactChannelWhatsApp.disabled = false;
                btnAgregarContactChannelTwitter.disabled = false;
                btnAgregarContactChannelFacebook.disabled = false;
                btnAgregarContactChannelTelefono.disabled = false;
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

}

btnSaveContact.addEventListener('click', function () {
    createContact();
});


btnCancelContact.addEventListener('click', function () {
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

function addContactChannel(contact_id,contact_channel_id,information,preference_id) {
    request('http://localhost:3000/api/contact_channel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: {
            contact_id: contact_id,
            contact_channel_id:contact_channel_id,
            information:information,
            preference_id: preference_id,
        }
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para eliminar contactos masivamente
function deleteContactCheck (contactIdArray) {
    request('http://localhost:3000/api/contact/' + contactIdArray, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        window.location.reload();
    }).catch(function (error) {
        console.log(error);
    })
}

btnDeleteContactCheck.addEventListener('click', function () {
    for (let i = 0; i < contactIdArray.length; i++) {
        deleteContactCheck(contactIdArray[i]);
    }
});

searchInput.addEventListener('click', function () {
    search.classList.toggle('block');
    iconDown.classList.toggle('fa-sort-down');
    iconDown.classList.toggle('fa-sort-up');
    iconDown.style.paddingTop = '5px';
});

//funcion para renderizar las opciones de busqueda de contactos
function renderSearchCountryInfo(response){
    for (let i = 0; i < response.data.length; i++) {

        //renderiza las opciones de busqueda de los Paises
        let optionCountry = document.createElement('option');
        optionCountry.innerHTML = `${response.data[i].name}`;
        optionCountry.value = `${response.data[i].id}`;
        countrySearch.appendChild(optionCountry);
    }
}
function renderSearchRegionInfo(response){
    for (let i = 0; i < response.data.length; i++) {
        //renderiza las opciones de busqueda de las Regiones
        let optionRegion = document.createElement('option');
        optionRegion.innerHTML = `${response.data[i].name}`;
        optionRegion.value = `${response.data[i].id}`;
        regionSearch.appendChild(optionRegion);
    }
}
function renderSearchCompanyInfo(response){
    for (let i = 0; i < response.data.length; i++) {
        //renderiza las opciones de busqueda de las compañias
        let optionCompany = document.createElement('option');
        optionCompany.innerHTML = `${response.data[i].name}`;
        optionCompany.value = `${response.data[i].id}`;
        companySearch.appendChild(optionCompany);
    }
}


//function para buscar contactos en la base de datos por nombre
function searchQueryName(textSearch){
    request(`http://localhost:3000/api/contact/search/name/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para realizar la busqueda en la base de datos por compania
function searchQueryCompany(textSearch){
    request(`http://localhost:3000/api/contact/search/company/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para realizar la busqueda en la base de datos por Pais
function searchQueryCountry(textSearch){
    request(`http://localhost:3000/api/contact/search/country/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para realizar la busqueda en la base de datos por Cargo
function searchQueryPosition(textSearch){
    request(`http://localhost:3000/api/contact/search/position/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para realizar la busqueda en la base de datos por Interes
function searchQueryInterest(textSearch){
    request(`http://localhost:3000/api/contact/search/interest/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}
//funcion para realizar la busqueda en la base de datos por Region
function searchQueryRegion(textSearch){
    request(`http://localhost:3000/api/contact/search/region/${textSearch}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function (response) {
        console.log(response);
        renderContactList(response);
    }).catch(function (error) {
        console.log(error);
    })
}

btnSearch.addEventListener('click', function () {
    if (companySearch.value != '') {
        contactTable.innerHTML = textContact
        searchQueryCompany(companySearch.value);
        companySearch.options[0].selected = true;
    }else if (nameSearch.value != '') {
        contactTable.innerHTML = textContact
        searchQueryName(nameSearch.value);
        nameSearch.value = '';
    }else if (countrySearch.value != '') {
        contactTable.innerHTML = textContact
        searchQueryCountry(countrySearch.value);
        countrySearch.options[0].selected = true;
    }else if( positionSearch.value != ''){
        contactTable.innerHTML = textContact
        searchQueryPosition(positionSearch.value);
        positionSearch.value = '';
    }else if (interestSearch.value != '') {
        contactTable.innerHTML = textContact
        searchQueryInterest(interestSearch.value);
        interestSearch.options[0].selected = true;
    }else if (regionSearch.value != '') {
        contactTable.innerHTML = textContact
        searchQueryRegion(regionSearch.value);
        regionSearch.options[0].selected = true;
    }
});

getContactChannel();
getRegions();
getCountrys();
getCompanies();
getCities();
getContacts();
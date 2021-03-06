let profile =  localStorage.getItem('profile');
let usersNav = document.getElementById('usersNav');
let ulPadre = document.getElementById('ulPadre');
let jwt = localStorage.getItem('user_token');
let addRegion = document.getElementById('addRegion');
let bgOpacity = document.getElementById('bgOpacity');
let agregarRegion = document.getElementById('agregarRegion')
let btnClose = document.getElementById('btnClose');
let region = document.getElementById('region');
let btnCrearRegionRequest = document.getElementById('btnCrearRegionRequest');
let agregarPais = document.getElementById('agregarPais');
let pais = document.getElementById('pais');
let btnCrearPaisRequest = document.getElementById('btnCrearPaisRequest');
let regionPais = document.getElementById('regionPais');
let btnPaisClose = document.getElementById('btnPaisClose');
let editarRegion = document.getElementById('editarRegion');
let regionUpdate = document.getElementById('regionUpdate');
let agregarCiudadInput = document.getElementById('agregarCiudadInput');
let agregarCiudad = document.getElementById('agregarCiudad');
let btnAgregarCiudadClose = document.getElementById('btnAgregarCiudadClose');
let paisCiudad = document.getElementById('paisCiudad');
let selectRegionUpdate  = document.getElementById('selectRegionUpdate');
let btnEditarPaisRequest = document.getElementById('btnEditarPaisRequest');
let btnEditarPaisClose = document.getElementById('btnEditarPaisClose');
let selectCountryUpdate = document.getElementById('selectCountryUpdate');
let btnEditarCiudadRequest = document.getElementById('btnEditarCiudadRequest');
let cityUpdate = document.getElementById('cityUpdate');
let editarCiudad = document.getElementById('editarCiudad')
if(profile != "Admin"){
    usersNav.style.display = "none";
}

// funcion para hacer funcionar el request personalizado
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
//funcion para obterner las regiones
function getRegions(){
    request('http://localhost:3000/api/region', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderRegions(response);
    }).catch(function(error){
        console.log(error);
    })
}

//funcion para renderizar las regiones
function renderRegions(response){
    for(let i = 0; i < response.data.length; i++){   
        let regionLi = document.createElement('li');
        regionLi.innerHTML =`<span>
                                <h2>${response.data[i].name}</h2>
                                <div style="display: flex;">
                                    <span>
                                        <button value="${response.data[i].id}" id="btnRegionUpdate${response.data[i].id}"><i class="fas fa-pen"></i></button>
                                        <button value="${response.data[i].id}" id="btnRegionDelete${response.data[i].id}"><i class="fas fa-trash"></i></button>
                                    </span>
                                    <button id="btnRegionPais${response.data[i].id}" value="${response.data[i].id}">Agregar Pais</button>
                                </div>
                            </span>`
        regionUl = document.createElement('ul');
        regionUl.classList.add('country');
        regionUl.id = response.data[i].id;
        regionLi.appendChild(regionUl);
        regionLi.classList.add('regions');
        ulPadre.appendChild(regionLi);
        
        //capturando los botones de editar, eliminar y agregar pais dinamicamente

        let btnRegionUpdate = document.getElementById(`btnRegionUpdate${response.data[i].id}`);
        let btnRegionDelete = document.getElementById(`btnRegionDelete${response.data[i].id}`);
        let btnRegionPais = document.getElementById(`btnRegionPais${response.data[i].id}`);
        
        // funcion para crear Pais
        btnRegionPais.addEventListener('click', function(){
            bgOpacity.classList.add('bgOpacity');
            agregarPais.style.display = "block";
            regionPais.value = response.data[i].id;
            
            //boton para hacer el request una vez ingresado el pais
            btnCrearPaisRequest.addEventListener('click', function(){
                
                request('http://localhost:3000/api/country', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    },
                    body: {
                        name: pais.value,
                        region_id: regionPais.value
                    }
                }).then(function(response){
                    console.log(response);
                    getCity();
                    bgOpacity.classList.remove('bgOpacity');
                    agregarPais.style.display = "none";
                }).catch(function(error){
                    console.log(error);
                })
            })
            
        });
        // boton para cerrar menu de creacion de pais
        btnPaisClose.addEventListener('click', function(){
            bgOpacity.classList.remove('bgOpacity');
            agregarPais.style.display = "none";
        })
        //boton para borrar la region
        btnRegionDelete.addEventListener('click', function(){
            deleteRegion(btnRegionDelete.value);
            window.location.reload();
        });

        // funcion para editar la region
        btnRegionUpdate.addEventListener('click', function(){
            bgOpacity.classList.add('bgOpacity');
            editarRegion.style.display = "block";
            btnEditarRegionRequest.addEventListener('click', function(){
                request(`http://localhost:3000/api/region/${btnRegionUpdate.value}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': jwt
                    },
                    body: {
                        name: regionUpdate.value,
                    }
                }).then(function(response){
                    console.log(response);
                    getRegions();
                    bgOpacity.classList.remove('bgOpacity');
                    editarRegion.style.display = "none";
                }).catch(function(error){
                    console.log(error);
                })
            })
        });
        
        //boton para cerrar menu de edicion de region
        btnRegionClose.addEventListener('click', function(){
            bgOpacity.classList.remove('bgOpacity');
            editarRegion.style.display = "none";
        })
    }
}
//funcion para obteber los paises
function getCountries(){
    request('http://localhost:3000/api/country', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderCountries(response);
    }).catch(function(error){
        console.log(error);
    })
}

//funcion para renderizar los paises
function renderCountries(response){
    for(let i = 0; i < response.data.length; i++){ 
    let regionUl = document.getElementById(response.data[i].region.id);  
    let countryLi = document.createElement('li');
    countryLi.innerHTML =`<span>
                            <h3>${response.data[i].name}</h3>
                            <div style="display: flex;">
                                <span>
                                    <button value="${response.data[i].id}" id="btnCountryUpdate${response.data[i].id}"><i class="fas fa-pen"></i></button>
                                    <button value="${response.data[i].id}" id="btnCountryDelete${response.data[i].id}"><i class="fas fa-trash"></i></button>
                                </span>
                                <button id="btnPaisCity${response.data[i].id}" value="${response.data[i].id}">Agregar Ciudad</button>
                            </div>
                        </span>
                        <ul class="cityList" id="country${response.data[i].id}"></ul>`
    regionUl.appendChild(countryLi);
    

    let btnCountryUpdate = document.getElementById(`btnCountryUpdate${response.data[i].id}`);
    let btnCountryDelete = document.getElementById(`btnCountryDelete${response.data[i].id}`);
    let btnAddCountry = document.getElementById(`btnPaisCity${response.data[i].id}`);


    //funcion para crear ciudad
    btnAddCountry.addEventListener('click', function(){
        bgOpacity.classList.add('bgOpacity');
        agregarCiudad.style.display = "block";
        btnAddCountry.value = response.data[i].id;
        paisCiudad.value = response.data[i].id;

        //boton para hacer el request una vez ingresado el pais

        btnCrearCiudadRequest.addEventListener('click', function(){
            request('http://localhost:3000/api/city', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                body: {
                    name: agregarCiudadInput.value,
                    country_id: btnAddCountry.value
                }
            }).then(function(response){
                console.log(response);
                getCity();
                bgOpacity.classList.remove('bgOpacity');
                agregarCiudad.style.display = "none";
            }).catch(function(error){
                console.log(error);
            })
        })
    })
    //boton para cerrar menu de creacion de ciudad
    btnAgregarCiudadClose.addEventListener('click', function(){
        bgOpacity.classList.remove('bgOpacity');
        agregarCiudad.style.display = "none";
    })
    //boton para borrar la ciudad
    btnCountryDelete.addEventListener('click', function(){
        deleteCountry(btnCountryDelete.value);
        window.location.reload();
    })
    //funcion para editar el pais
    btnCountryUpdate.addEventListener('click', function(){
        bgOpacity.classList.add('bgOpacity');
        editarPais.style.display = "block";
        btnEditarPaisRequest.addEventListener('click', function(){
            request(`http://localhost:3000/api/country/${btnCountryUpdate.value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                body: {
                    name: paisUpdate.value,
                }
            }).then(function(response){
                console.log(response);
                getCountries();
                bgOpacity.classList.remove('bgOpacity');
                editarPais.style.display = "none";
            }).catch(function(error){
                console.log(error);
            })
        })
    })
    //boton para cerrar menu de edicion de pais
    btnEditarPaisClose.addEventListener('click', function(){
        bgOpacity.classList.remove('bgOpacity');
        editarPais.style.display = "none";
    })
}
}
//funcion para obtener las ciudades
function getCity(){
    request('http://localhost:3000/api/city', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        }
    }).then(function(response){
        console.log(response);
        renderCity(response);
    }).catch(function(error){
        console.log(error);
    })
}

//funcion para renderizar una ciudad
function renderCity(response){
    for(let i = 0; i < response.data.length; i++){ 
    let countryLi = document.getElementById(`country${response.data[i].country.id}`);  
    let cityLi = document.createElement('li');
    cityLi.innerHTML =`<div>
                        <h4>${response.data[i].name}</h4>
                        <span>
                            <button value="${response.data[i].id}" id="btnCityUpdate${response.data[i].id}"><i class="fas fa-pen"></i></button>
                            <button value="${response.data[i].id}" id="btnCityDelete${response.data[i].id}"><i class="fas fa-trash"></i></button>
                        </span>
                        </div>`
    countryLi.appendChild(cityLi);

    let btnCityUpdate = document.getElementById(`btnCityUpdate${response.data[i].id}`);
    let btnCityDelete = document.getElementById(`btnCityDelete${response.data[i].id}`);

    //funcion para borrar la ciudad
    btnCityDelete.addEventListener('click', function(){
        deleteCity(btnCityDelete.value);
        window.location.reload();
    })
    //funcion para editar la ciudad
    btnCityUpdate.addEventListener('click', function(){
        bgOpacity.classList.add('bgOpacity');
        editarCiudad.style.display = "block";
        btnEditarCiudadRequest.addEventListener('click', function(){
            request(`http://localhost:3000/api/city/${btnCityUpdate.value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                body: {
                    name: cityUpdate.value
                }
            }).then(function(response){
                console.log(response);
                getCity();
                bgOpacity.classList.remove('bgOpacity');
                editarCiudad.style.display = "none";
            }).catch(function(error){
                console.log(error);
            })
        })
    })
    //boton para cerrar menu de edicion de ciudad
    btnEditarCiudadClose.addEventListener('click', function(){
        bgOpacity.classList.remove('bgOpacity');
        editarCiudad.style.display = "none";
    })
}
}

addRegion.addEventListener('click', function(){
    bgOpacity.classList.add('bgOpacity');
    agregarRegion.style.display = "block"
})

btnClose.addEventListener('click', function(){
    bgOpacity.classList.remove('bgOpacity');
    agregarRegion.style.display = "none"
})

//request para crear una region nueva
function addRegionRequest(){ 
    request('http://localhost:3000/api/region', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwt
        },
        body: {
            name: region.value
        }
    }).then(function(response){
        console.log(response);
    
    }).catch(function(error){
        console.log(error);
    })
}
//request para borrar una region
function deleteRegion(id){
    request(`http://localhost:3000/api/region/${id}`, {
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
//request para borrar un pais
function deleteCountry(id){
    request(`http://localhost:3000/api/country/${id}`, {
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
//request para borrar una ciudad
function deleteCity(id){
    request(`http://localhost:3000/api/city/${id}`, {
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


btnCrearRegionRequest.addEventListener('click', function(){
    addRegionRequest();
    btnClose.click();
})


getRegions();
getCountries();
getCity();


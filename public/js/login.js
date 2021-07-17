const txtUser = document.getElementById("username");
const txtPassword = document.getElementById("password");
const btnSubmit = document.getElementById("submit");

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

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    request("/login", {
        method: "POST",
        body: { user: txtUser.value, password: txtPassword.value },
    }).then((res) => {
        localStorage.setItem("ejercicio_token", res.token);
        localStorage.setItem('ejercicio_admin', res.admin);
        window.location.replace('./public/users.html'); 
    }).catch(err => {
      console.log(err);
    });
});
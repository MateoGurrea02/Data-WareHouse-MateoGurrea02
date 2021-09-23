const txtUser = document.getElementById("user");
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
    request("/api/user/login", {
        method: "POST",
        body:{email: txtUser.value, password:txtPassword.value },
    }).then((res) => {
        localStorage.setItem("user_token", res.token);
        localStorage.setItem('profile', res.profile);
        window.location.replace('./contacts.html'); 
    }).catch(err => {
      console.log(err);
    });
});
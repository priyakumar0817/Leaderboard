/*
Login js file
*/
document.addEventListener('DOMContentLoaded', () => {

    // Retrieve login form element
    let login_form = document.getElementById('login');
    function server_request(url, data, verb, callback) {
        return fetch(url, {
            credentials: 'same-origin',
            method: verb,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (callback)
                    callback(data);
            })
            .catch(error => console.error('Error:', error));
    }
    // event listener for login form
    login_form.addEventListener('submit', (event) => {
        event.preventDefault();
        const method = login_form.getAttribute('method');
        let data = Object.fromEntries(new FormData(login_form).entries());
        const action = login_form.getAttribute('action');
        // let user login make request to server
        server_request(action, data, method, (response) => {
            if (response.session_id != 0) {
                // change window location
                location.replace(`/profile`);
            }
        })
        login_form.reset();
    })

});
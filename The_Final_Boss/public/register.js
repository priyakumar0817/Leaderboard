/*
register js file
*/
document.addEventListener('DOMContentLoaded', () => {

    // get register form element
    let register_form = document.getElementById('add-user');
    /*
        Server request function to handle when the user registers for an account
        @ return a fetch request =
    */
    function server_request(url, data, verb, callback) {
        return fetch(url, {
            credentials: 'same-origin',
            method: verb,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(response => {
                if (callback)
                    callback(response);
            })
            .catch(error => console.error('Error:', error));
    }
    // register form event listener
    register_form.addEventListener('submit', (event) => {
        event.preventDefault();

        const method = register_form.getAttribute('method');
        let data = Object.fromEntries(new FormData(register_form).entries());

        const action = register_form.getAttribute('action');

        // make a request to register if successful then direct to profile page
        server_request(action, data, method, (response) => {
            console.log(response)
            if (response.session_id != 0) {
                location.replace('/profile')
            }
        })
        register_form.reset();
    })

});
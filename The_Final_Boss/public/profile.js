/*
profile js file
*/
document.addEventListener('DOMContentLoaded', () => {

    // logout event listener
    let logout = document.getElementById('logout');
    // change location to login to 'logout' the user
    logout.addEventListener('click', (event) => {
        event.preventDefault();
        location.replace(`/login`);
    })

});
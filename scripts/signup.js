window.addEventListener('load', function () {

    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const passwordRepetida = document.querySelector('#inputPasswordRepetida');

    const url = 'https://todo-api.ctd.academy/v1';

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let settings = {};

        const payload = {
            firstName: nombre.value,
            lastName: apellido.value,
            email: email.value,
            password: password.value
        };

        settings = {
            method:'POST',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type':'application/json'
            }
        }

        realizarRegister(settings);

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        console.log('Consulto a la API');

        fetch(`${url}/users`, settings)
        .then(response => {
            if (!response.ok) console.log('Alguno de los datos están incorrectos');
            return response.json();
        })
        .then(data => {
            console.log('Promesa cumplida');
            if (data.jwt) {
                // localStorage.setItem('jwt', JSON.stringify(data.jwt));
                localStorage.setItem('jwt', data.jwt);
                location.replace('../mis-tareas.html');
            }
        })
        .catch(console.log('Promesa rechazada'))
    };

});
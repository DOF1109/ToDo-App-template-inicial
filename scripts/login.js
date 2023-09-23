window.addEventListener('load', function () {

    /* --------------- Obtenemos variables globales --------------- */
    const form = document.forms[0];
    const email = document.getElementById('inputEmail');
    const errorEmail = document.getElementById('errorEmail');
    const password = document.getElementById('inputPassword');
    const errorPassword = document.getElementById('errorPassword');

    const url = 'https://todo-api.ctd.academy/v1';

    /* --------------- Objeto para almacenar los errores de inputs --------------- */
    let estadoErrores = {
        emailOK: false,
        passwordOK: false
    }

    /* --------------- Mostramos u ocultamos el error --------------- */
    function mostrarErrorEmail(){
        (estadoErrores.emailOK)? errorEmail.classList.add('invisible') : errorEmail.classList.remove('invisible');
    }

    function mostrarErrorPassword(){
        (estadoErrores.passwordOK)? errorPassword.classList.add('invisible') : errorPassword.classList.remove('invisible');
    }

    function existenErrores(){
        for (let inputOK in estadoErrores) {
            if (estadoErrores[inputOK] === false) return true;
        }
        return false;
    }

    /* --------------- Validamos los datos mientras se ingresan --------------- */
    email.addEventListener('change', () => {
        estadoErrores.emailOK = validarEmail(email.value);
        mostrarErrorEmail();
    })

    password.addEventListener('change', () => {
        estadoErrores.passwordOK = validarContrasenia(password.value);
        mostrarErrorPassword();
    })

    /* --------------- Validamos el submit y preparamos el envío --------------- */
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (existenErrores()) {
            mostrarErrorEmail()
            mostrarErrorPassword()
        } else {
            // Creamos el cuerpo de la request
            const payload = {
                email: normalizarEmail(email.value),
                password: password.value
            };
    
            // Configuramos la request del Fetch
            const setting = {
                method:'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type':'application/json'
                }
            }
    
            // Lanzamos la consulta de login a la API
            realizarLogin(setting);
        }
    });

    /* --------------- Realizar el login [POST] --------------- */
    function realizarLogin(settings) {
        console.log('Lanzando la consulta a API');

        fetch(`${url}/users/login`, settings)
        .then(response => {
            if (!response.ok) alert('Usuario incorrecto');
            return response.json();
        })
        .then(data => {
            console.log('Promesa cumplida');
            if (data.jwt) {
                localStorage.setItem('jwt', JSON.stringify(data.jwt));
                // Limpio los campos del formulario
                form.reset();
                location.replace('../mis-tareas.html');
            }
        })
        .catch(() => console.log('Promesa rechazada'))
    };

});
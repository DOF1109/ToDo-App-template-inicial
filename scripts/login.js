window.addEventListener('load', function () {

    /* --------------- Obtenemos variables globales --------------- */
    const form = document.forms[0];
    const email = document.getElementById('inputEmail');
    const errorEmail = document.getElementById('errorEmail');
    const password = document.getElementById('inputPassword');
    const errorPassword = document.getElementById('errorEmail');

    const url = 'https://todo-api.ctd.academy/v1';

    /* --------------- Objeto para almacenar los errores de inputs --------------- */
    estadoErrores = {
        emailOK: false,
        passwordOK: false
    }
    
    function mostrarErrores(){
        (estadoErrores.emailOK)? errorEmail.classList.add('invisible') : errorEmail.classList.remove('invisible');
        (estadoErrores.passwordOK)? errorEmail.classList.add('invisible') : errorEmail.classList.remove('invisible');
    }
    
    /* --------------- Validamos los datos mientras se ingresan --------------- */
    form.addEventListener('change', () => {
        console.log(email.value);
        estadoErrores.emailOK = validarEmail(email.value);
        estadoErrores.passwordOK = validarContrasenia(password.value);

        mostrarErrores();
    })

    /* --------------- Escuchamos el submit y preparamos el envío --------------- */
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Creamos el cuerpo de la request
        const payload = {
            email: email.value,
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

        // Limpio los campos del formulario
        form.reset();
    });

    /* --------------- Realizar el login [POST] --------------- */
    function realizarLogin(settings) {
        console.log('Lanzando la consulta a API');

        fetch(`${url}/users/login`, settings)
        .then(response => {
            if (!response.ok) alert('Alguno de los datos están incorrectos');
            return response.json();
        })
        .then(data => {
            console.log('Promesa cumplida');
            if (data.jwt) {
                localStorage.setItem('jwt', JSON.stringify(data.jwt));
                location.replace('../mis-tareas.html');
            }
        })
        .catch(console.log('Promesa rechazada'))
    };

});
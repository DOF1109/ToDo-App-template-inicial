window.addEventListener('load', function () {

    /* --------------- Obtenemos variables globales --------------- */
    const form = document.forms[0];
    const nombre = document.getElementById('inputNombre');
    const errorNombre = document.getElementById('errorNombre');
    const apellido = document.getElementById('inputApellido');
    const errorApellido = document.getElementById('errorApellido');
    const email = document.getElementById('inputEmail');
    const errorEmail = document.getElementById('errorEmail');
    const password = document.getElementById('inputPassword');
    const errorPassword = document.getElementById('errorPassword');
    const passwordRepetida = document.getElementById('inputPasswordRepetida');
    const errorPasswordRepetida = document.getElementById('errorPasswordRepetida');

    const url = 'https://todo-api.ctd.academy/v1';

    /* --------------- Objeto para almacenar los errores de inputs --------------- */
    const estadoErrores = {
        nombreOK: false,
        apellidoOK: false,
        emailOK: false,
        passwordOK: false,
        passwordRepetidaOK: false
    }

    /* --------------- Mostramos u ocultamos el error --------------- */
    function mostrarErrorNombre(){
        (estadoErrores.nombreOK)? errorNombre.classList.add('invisible') : errorNombre.classList.remove('invisible');
    }

    function mostrarErrorApellido(){
        (estadoErrores.apellidoOK)? errorApellido.classList.add('invisible') : errorApellido.classList.remove('invisible');
    }

    function mostrarErrorEmail(){
        (estadoErrores.emailOK)? errorEmail.classList.add('invisible') : errorEmail.classList.remove('invisible');
    }

    function mostrarErrorPassword(){
        (estadoErrores.passwordOK)? errorPassword.classList.add('invisible') : errorPassword.classList.remove('invisible');
    }

    function mostrarErrorPasswordRepetida(){
        (estadoErrores.passwordRepetidaOK)? errorPasswordRepetida.classList.add('invisible') : errorPasswordRepetida.classList.remove('invisible');
    }

    function existenErrores(){
        for (let inputOK in estadoErrores) {
            if (estadoErrores[inputOK] === false) return true;
        }
        return false;
    }

    /* --------------- Validamos los datos mientras se ingresan --------------- */
    nombre.addEventListener('change', () => {
        estadoErrores.nombreOK = validarTexto(nombre.value);
        mostrarErrorNombre();
    })

    apellido.addEventListener('change', () => {
        estadoErrores.apellidoOK = validarTexto(apellido.value);
        mostrarErrorApellido();
    })

    email.addEventListener('change', () => {
        estadoErrores.emailOK = validarEmail(email.value);
        mostrarErrorEmail();
    })

    password.addEventListener('change', () => {
        estadoErrores.passwordOK = validarContrasenia(password.value);
        mostrarErrorPassword();
    })

    passwordRepetida.addEventListener('change', () => {
        estadoErrores.passwordRepetidaOK = compararContrasenias(password.value, passwordRepetida.value);
        mostrarErrorPasswordRepetida();
    })

    /* --------------- Validamos el submit y preparamos el envío --------------- */
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (existenErrores()) {
            mostrarErrorNombre()
            mostrarErrorApellido()
            mostrarErrorEmail()
            mostrarErrorPassword()
            mostrarErrorPasswordRepetida()
        } else {
            // Creamos el cuerpo de la request
            const payload = {
                firstName: normalizarTexto(nombre.value),
                lastName: normalizarTexto(apellido.value),
                email: normalizarEmail(email.value),
                password: password.value
            };

            // Configuramos la request del Fetch
            const settings = {
                method:'POST',
                body: JSON.stringify(payload),
                headers:{
                    'Content-Type':'application/json'
                }
            }

            // Lanzamos la consulta de signup a la API
            realizarRegister(settings);
        }
    });

    /* --------------- Realizar el signup [POST] --------------- */
    function realizarRegister(settings) {
        console.log('Lanzando la consulta a API');

        fetch(`${url}/users`, settings)
        .then(response => {
            if (!response.ok) alert('El usuario ya existe');
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
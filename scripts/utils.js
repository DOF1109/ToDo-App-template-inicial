/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    // Armo una expresión regular para validar, esta permite
    // letras mayusculas, minusculas, acentuadas, ü, Ü, ' ' y
    // que al menos sean 3
    const regExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{3,}$/
    return (regExp.test(texto))
}

function normalizarTexto(texto) {
    return (texto.toUpperCase().trim())
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return (regExp.test(email))
}

function normalizarEmail(email) {
    return (email.toUpperCase())
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    return (contrasenia.length >= 6)
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    return (contrasenia_1 === contrasenia_2)
}

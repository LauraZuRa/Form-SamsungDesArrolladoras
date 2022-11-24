const form = document.getElementById('form');
const nombreUsuario = document.getElementById('nombreUsuario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//En un principio, los cuatro campos del formulario tienen un valor booleano de false
var nombreUsuarioBool = false;
var emailBool = false;
var passwordBool = false;
var password2Bool = false;

form.addEventListener('submit', (e) => {
    //Cancela la acción por defecto y se ejecuta el resto del código
    e.preventDefault();

    //Función que valida todos los campos del formulario
    validarFormulario(); 

    //Si todos los campos son correctos (valor booleano true), se envia el formulario y sale la alerta
    //Además, una vez enviado el formulario, si volvemos a poner un campo incorrecto, evita que se pueda enviar y salga la alerta
    if(nombreUsuarioBool === true && emailBool === true && passwordBool === true && password2Bool === true){
        alert('La inscripción se ha realizado correctamente')
        nombreUsuarioBool = false;
        emailBool = false;
        passwordBool = false;
        password2Bool = false;
    }
});

//Función que valida los cuatro campos del formulario
function validarFormulario() {
    validarNombreUsuario();
    validarEmail();
    validarPassword();
}

//El método trim() que aparece en las siguientes funciones sirve para eliminar los espacios en blanco del principio y final de una string

//Validación del nombre de usuario
function validarNombreUsuario() {
    
    const nombreUsuarioValue = nombreUsuario.value.trim();
    
    //Comprueba que solo esté formado por letras
    if(nombreUsuarioValue === '') {
        apareceError(nombreUsuario, 'Rellene este campo');
    } else if(!soloLetras(nombreUsuarioValue)) {
        apareceError(nombreUsuario, 'Solo admite letras, no números');
    } else {
        apareceCorrecto(nombreUsuario);
        nombreUsuarioBool = true;
    }
}

//Validación del email
function validarEmail() {
    
    const emailValue = email.value.trim();
    
    //Comprueba que tenga formato de email
    if(emailValue === '') {
        apareceError(email, 'Rellene este campo');
    } else if(!esEmail(emailValue)) {
        apareceError(email, 'Email inválido');
    } else {
        apareceCorrecto(email);
        emailBool = true;
    }
}

//Validación de la clave y de la confirmación de la clave
function validarPassword() {

    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    //Validación de la clave
    //Comprueba que tenga mínimo 8 caracteres
    if(passwordValue === '') {
        apareceError(password, 'Rellene este campo');
    } else if(passwordValue.length < 8){ 
        apareceError(password, 'Debe tener al menos 8 caracteres');  
    } else {
        apareceCorrecto(password);
        passwordBool = true;
    }

    //Validación de la confirmación de la clave
    //Comprueba si coincide con la contraseña
    if(password2Value === '') {
        apareceError(password2, 'Rellene este campo');
    } else if(passwordValue !== password2Value) {
        apareceError(password2, 'Las contraseñas no coinciden');
    } else {
        apareceCorrecto(password2);
        password2Bool = true;
    } 
}

//Función para cambiar el mensaje de error según el campo del formulario
function apareceError(input, mensaje) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = mensaje;
    formControl.className = 'form-control error';
}

//Función para que el campo aparezca correcto
function apareceCorrecto(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Función que comprueba si el nombre de usuario solo está formado por letras
function soloLetras(nombreUsuario) {
    return /^[A-Za-z]+$/.test(nombreUsuario);
}

//Función que comprueba si el email tiene un formato correcto
function esEmail(email) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}
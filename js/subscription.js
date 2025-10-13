// Helpers

function $(selector) {
  return document.querySelector(selector);
}

function mostrarError(input, mensaje) {
  input.classList.add("invalid");
  input.classList.remove("valid");
  input.parentElement.classList.remove("valid");
  input.nextElementSibling.textContent = mensaje;
}

function limpiarError(input) {
  input.classList.remove("invalid");
  input.classList.remove("valid");
  input.parentElement.classList.remove("valid");
  input.nextElementSibling.textContent = "";
}

function marcarValido(input) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  input.parentElement.classList.add("valid");
  input.nextElementSibling.textContent = "";
}


// Validaciones individuales


function validarNombre(el) {
  var valor = el.value.trim();
  if (valor.length <= 6 || valor.indexOf(" ") === -1) {
    mostrarError(el, "Debe tener más de 6 letras y al menos un espacio.");
  } else {
    marcarValido(el);
  }
}

function validarEmail(el) {
  var valor = el.value.trim();
  var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron.test(valor)) {
    mostrarError(el, "Formato de email inválido.");
  } else {
    marcarValido(el);
  }
}

function validarPass(el) {
  var valor = el.value;
  var tieneLetra = /[a-zA-Z]/.test(valor);
  var tieneNumero = /\d/.test(valor);

  if (valor.length < 8 || !tieneLetra || !tieneNumero) {
    mostrarError(el, "Debe tener al menos 8 caracteres con letras y números.");
  } else {
    marcarValido(el);
  }
}

function validarRepetirPass(el) {
  var pass = $("#pass").value;
  if (el.value !== pass) {
    mostrarError(el, "Las contraseñas no coinciden.");
  } else {
    marcarValido(el);
  }
}

function validarEdad(el) {
  var n = parseInt(el.value, 10);
  if (isNaN(n) || n < 18) {
    mostrarError(el, "Debe ser un número entero mayor o igual a 18.");
  } else {
    marcarValido(el);
  }
}

function validarTelefono(el) {
  var valor = el.value.trim();
  if (!/^\d{7,}$/.test(valor)) {
    mostrarError(el, "Solo dígitos, al menos 7 caracteres.");
  } else {
    marcarValido(el);
  }
}

function validarDireccion(el) {
  var valor = el.value.trim();
  var tieneLetra = /[a-zA-Z]/.test(valor);
  var tieneNumero = /\d/.test(valor);
  if (valor.length < 5 || valor.indexOf(" ") === -1 || !tieneLetra || !tieneNumero) {
    mostrarError(el, "Debe incluir letras, números y un espacio.");
  } else {
    marcarValido(el);
  }
}

function validarCiudad(el) {
  var valor = el.value.trim();
  if (valor.length < 3) {
    mostrarError(el, "Debe tener al menos 3 caracteres.");
  } else {
    marcarValido(el);
  }
}

function validarCodigoPostal(el) {
  var valor = el.value.trim();
  if (valor.length < 3) {
    mostrarError(el, "Debe tener al menos 3 caracteres.");
  } else {
    marcarValido(el);
  }
}

function validarDni(el) {
  var valor = el.value.trim();
  if (!/^\d{7,8}$/.test(valor)) {
    mostrarError(el, "Debe tener 7 u 8 dígitos.");
  } else {
    marcarValido(el);
  }
}


// Blur events

var campos = [
  { id: "fullName", validar: validarNombre },
  { id: "email", validar: validarEmail },
  { id: "pass", validar: validarPass },
  { id: "pass2", validar: validarRepetirPass },
  { id: "age", validar: validarEdad },
  { id: "phone", validar: validarTelefono },
  { id: "address", validar: validarDireccion },
  { id: "city", validar: validarCiudad },
  { id: "zip", validar: validarCodigoPostal },
  { id: "dni", validar: validarDni },
];

for (var i = 0; i < campos.length; i++) {
  var el = $("#" + campos[i].id);
  el.addEventListener("blur", function (e) {
    // Solo validar si el usuario escribió algo
    if (e.target.value.trim().length > 0) {
      var id = e.target.id;
      for (var j = 0; j < campos.length; j++) {
        if (campos[j].id === id) {
          campos[j].validar(e.target);
        }
      }
    }
  });

  el.addEventListener("focus", function (e) {
    limpiarError(e.target);
  });
}


// Dynamic form :)

var helloTitle = $("#helloTitle");
$("#fullName").addEventListener("input", function (e) {
  var nombre = e.target.value.trim();
  if (nombre.length > 0) {
    helloTitle.textContent = "HOLA " + nombre.toUpperCase();
  } else {
    helloTitle.textContent = "HOLA";
  }
});


// Form sender

$("#subForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var errores = [];
  var datos = [];

  for (var i = 0; i < campos.length; i++) {
    var campo = $("#" + campos[i].id);
    campos[i].validar(campo);

    var mensajeError = campo.nextElementSibling.textContent;
    if (mensajeError !== "") {
      errores.push(campo.previousSibling.textContent + " → " + mensajeError);
    } else {
      datos.push(campo.previousSibling.textContent + " → " + campo.value);
    }
  }

  if (errores.length > 0) {
    alert("Errores de validación:\n\n" + errores.join("\n"));
  } else {
    alert("Datos enviados correctamente:\n\n" + datos.join("\n"));
    for (var i = 0; i < campos.length; i++) {
      var campo = $("#" + campos[i].id);
      campo.value = "";
      limpiarError(campo);
    }
    helloTitle.textContent = "HOLA";
  }
});
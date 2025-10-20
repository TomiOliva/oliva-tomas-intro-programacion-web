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
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarEmail(el) {
  var valor = el.value.trim();
  var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron.test(valor)) {
    mostrarError(el, "Formato de email inválido.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarPass(el) {
  var valor = el.value;
  var tieneLetra = /[a-zA-Z]/.test(valor);
  var tieneNumero = /\d/.test(valor);

  if (valor.length < 8 || !tieneLetra || !tieneNumero) {
    mostrarError(el, "Debe tener al menos 8 caracteres con letras y números.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarRepetirPass(el) {
  var pass = $("#pass").value;
  if (el.value !== pass) {
    mostrarError(el, "Las contraseñas no coinciden.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarEdad(el) {
  var n = parseInt(el.value, 10);
  if (isNaN(n) || n < 18) {
    mostrarError(el, "Debe ser un número entero mayor o igual a 18.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarTelefono(el) {
  var valor = el.value.trim();
  if (!/^\d{7,}$/.test(valor)) {
    mostrarError(el, "Solo dígitos, al menos 7 caracteres.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarDireccion(el) {
  var valor = el.value.trim();
  var tieneLetra = /[a-zA-Z]/.test(valor);
  var tieneNumero = /\d/.test(valor);
  if (valor.length < 5 || valor.indexOf(" ") === -1 || !tieneLetra || !tieneNumero) {
    mostrarError(el, "Debe incluir letras, números y un espacio.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarCiudad(el) {
  var valor = el.value.trim();
  if (valor.length < 3) {
    mostrarError(el, "Debe tener al menos 3 caracteres.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarCodigoPostal(el) {
  var valor = el.value.trim();
  if (valor.length < 3) {
    mostrarError(el, "Debe tener al menos 3 caracteres.");
    return false;
  } else {
    marcarValido(el);
    return true;
  }
}

function validarDni(el) {
  var valor = el.value.trim();
  if (!/^\d{7,8}$/.test(valor)) {
    mostrarError(el, "Debe tener 7 u 8 dígitos.");
    return false;
  } else {
    marcarValido(el);
    return true;
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


// Dynamic form title

var helloTitle = $("#helloTitle");
$("#fullName").addEventListener("input", function (e) {
  var nombre = e.target.value.trim();
  if (nombre.length > 0) {
    helloTitle.textContent = "HOLA " + nombre.toUpperCase();
  } else {
    helloTitle.textContent = "HOLA";
  }
});


// Modal functions

function mostrarModal(titulo, contenido) {
  $("#modalTitle").textContent = titulo;
  $("#modalBody").innerHTML = contenido;
  $("#modal").classList.remove("hidden");
}

function cerrarModal() {
  $("#modal").classList.add("hidden");
}

$("#modal").addEventListener("click", function (e) {
  if (e.target === $("#modal")) {
    cerrarModal();
  }
});

$(".modal-close").addEventListener("click", cerrarModal);
$("#modalBtn").addEventListener("click", cerrarModal);


// LocalStorage functions

function guardarEnLocalStorage(datos) {

  var datosSinPassword = {
    fullName: datos.fullName,
    email: datos.email,
    age: datos.age,
    phone: datos.phone,
    address: datos.address,
    city: datos.city,
    zip: datos.zip,
    dni: datos.dni
 
  };
  localStorage.setItem("subscriptionData", JSON.stringify(datosSinPassword));
}
function cargarDesdeLocalStorage() {
  var datosGuardados = localStorage.getItem("subscriptionData");
  if (datosGuardados) {
    var datos = JSON.parse(datosGuardados);
    $("#fullName").value = datos.fullName || "";
    $("#email").value = datos.email || "";
    $("#age").value = datos.age || "";
    $("#phone").value = datos.phone || "";
    $("#address").value = datos.address || "";
    $("#city").value = datos.city || "";
    $("#zip").value = datos.zip || "";
    $("#dni").value = datos.dni || "";
    
    if (datos.fullName) {
      helloTitle.textContent = "HOLA " + datos.fullName.toUpperCase();
    }
  }
}


// Form sender

$("#subForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var errores = [];
  var datosValidos = true;

  for (var i = 0; i < campos.length; i++) {
    var campo = $("#" + campos[i].id);
    var esValido = campos[i].validar(campo);
    
    if (!esValido) {
      datosValidos = false;
      var mensajeError = campo.nextElementSibling.textContent;
      var labelText = campo.parentElement.childNodes[0].textContent.trim();
      errores.push(labelText + " → " + mensajeError);
    }
  }

  if (!datosValidos) {
    mostrarModal("Errores de validación", "<p>" + errores.join("<br>") + "</p>");
    return;
  }

  var formData = {
    fullName: $("#fullName").value.trim(),
    email: $("#email").value.trim(),
    password: $("#pass").value,
    age: $("#age").value,
    phone: $("#phone").value.trim(),
    address: $("#address").value.trim(),
    city: $("#city").value.trim(),
    zip: $("#zip").value.trim(),
    dni: $("#dni").value.trim()
  };

  var baseUrl = "https://jsonplaceholder.typicode.com/posts";
  var params = new URLSearchParams(formData).toString();
  var url = baseUrl + "?" + params;

  fetch(url, {
    method: "GET"
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la solicitud: " + response.status);
      }
    })
    .then(function (data) {
      guardarEnLocalStorage(formData);
      
      var contenidoModal = "<p><strong>¡Suscripción exitosa!</strong></p>";
      contenidoModal += "<p>Datos recibidos del servidor:</p>";
      contenidoModal += "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
      contenidoModal += "<hr>";
      contenidoModal += "<p><strong>Datos enviados:</strong></p>";
      contenidoModal += "<p>Nombre: " + formData.fullName + "</p>";
      contenidoModal += "<p>Email: " + formData.email + "</p>";
      contenidoModal += "<p>Edad: " + formData.age + "</p>";
      contenidoModal += "<p>Teléfono: " + formData.phone + "</p>";
      contenidoModal += "<p>Dirección: " + formData.address + "</p>";
      contenidoModal += "<p>Ciudad: " + formData.city + "</p>";
      contenidoModal += "<p>Código Postal: " + formData.zip + "</p>";
      contenidoModal += "<p>DNI: " + formData.dni + "</p>";
      
      mostrarModal("Suscripción Exitosa", contenidoModal);
      
      for (var i = 0; i < campos.length; i++) {
        var campo = $("#" + campos[i].id);
        campo.value = "";
        limpiarError(campo);
      }
      $("#pass").value = "";
      $("#pass2").value = "";
      helloTitle.textContent = "HOLA";
    })
    .catch(function (error) {
      var contenidoError = "<p><strong>Error al enviar la suscripción</strong></p>";
      contenidoError += "<p>" + error.message + "</p>";
      contenidoError += "<p>Por favor, intente nuevamente.</p>";
      
      mostrarModal("Error", contenidoError);
    });
});


window.addEventListener("load", function () {
  cargarDesdeLocalStorage();
});
console.log("----------- Gestion de Usuarios ----------")


//Creación de un usuario (Quemado)
let usuarios = [
    {
        tipoDI: "CC",
        id: "1152471106",
        nombre: "Sebastian",
        apellidos: "Diez Vallejo",
        correo: "Sebasdiez84@gmail.com",
        peso: "100",
        estatura:"1.82",
        convertidoIMC:"30.1"

    }
]
let UsuarioTemporal = null




//Metodo en donde se obtiene los valores para crear el usuario
function obtenerValores() {
    let tipoDI = document.getElementById("tipoDI").value
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellidos").value
    let correo = document.getElementById("correo").value
    let peso = document.getElementById("peso").value
    let estatura = document.getElementById("estatura").value

    calcularMasaCorporal()
    
    //Almacenamiento de datos Usuario
    let miUsuario2 = { tipoDI, id, nombre, apellidos, correo, peso, estatura, convertidoIMC }
    console.log("Se creo el usuario "+id)
    return miUsuario2
}

//Metodo para calcular el IMC
function calcularMasaCorporal(){
    let peso = document.getElementById("peso").value
    let estatura = document.getElementById("estatura").value
    estaturaMetros = estatura/100
    indiceMasaCorporal = peso/(estaturaMetros*estaturaMetros) 
    convertidoIMC = indiceMasaCorporal.toFixed(1)
    return convertidoIMC

}

//Metodo para cear un usuario
function crearUsuario() {
    let usuario = obtenerValores()
    let existeUsuario = usuarios.find(x => usuario.id === x.id)
    if (existeUsuario) {
        console.log('El usuario ya existe');
        alert("El usuario ya existe")
        return;
    }
    usuarios.push(usuario)
    //Almacenamiento en el LocalStorage
    localStorageListaUsuarios(usuarios);
    //Se limpia el formulario
    listarUsuarios(limpiarFormulario)
}

//Metodo para eliminar un usuario
function eliminarUsuario(index) {
    usuarios.splice(index, 1)
    listarUsuarios()
    alert("Se elimino el usuario ")
    console.log("Se elimino el usuario ")
}

//Metodo para cargar la información de el usuario seleccionado en los forms para ser modificada
function cargarInformacion(index) {
    let usuario = usuarios[index]
    usuarioTemporal = index
    document.getElementById("tipoDI").value = usuario.tipoDI
    document.getElementById("id").value = usuario.id
    document.getElementById("nombre").value = usuario.nombre
    document.getElementById("apellidos").value = usuario.apellidos
    document.getElementById("correo").value = usuario.correo
    document.getElementById("peso").value = usuario.peso
    document.getElementById("estatura").value = usuario.estatura

    document.getElementById("btnCrearUsuario").style.display = "none"
    document.getElementById("btnModificarUsuario").style.display = "inline"

    console.log("Se va a modificar el usuario "+ usuario.id)
}

//Metodo para limpiar formulario
function limpiarFormulario() {

    document.getElementById("tipoDI").value = ""
    document.getElementById("id").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellidos").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("estatura").value = ""

    document.getElementById("btnCrearUsuario").style.display = "inline"
    document.getElementById("btnModificarUsuario").style.display = "none"
}

//Metodo para modificar usuario
function modificarUsuario() {
    let usuarioActualizado = obtenerValores()
    usuarios.splice(usuarioTemporal, 1, usuarioActualizado)
   
    listarUsuarios(limpiarFormulario)
    console.log("Se modifico el usuario correctamente")
}

//Metodo para saber el indice de masa moscular
function consultar(index){
    let usuario = usuarios[index]
    usuarioTemporal = index
    let consultaEstatura = usuario.estatura
    let consultaPeso =usuario.peso
    estaturaMetros = consultaEstatura/100
    indiceMasaCorporal = consultaPeso/(estaturaMetros*estaturaMetros) 
    convertidoIMC = indiceMasaCorporal.toFixed(1)
    console.log("este es el IMC "+convertidoIMC+ "del consultado "+ id)

    //Alertas de IMC
    if(convertidoIMC<18.5){
        alert("Bajo peso")
    }else{
        if (30>convertidoIMC && convertidoIMC>=18.5){
            alert("Peso normal")
        }else{
            console.log("entro al segundo condicional")
            if(35>convertidoIMC && convertidoIMC>=30){
                alert("Sobre Peso")
            }else{
                if(35<=convertidoIMC){
                    alert("obesidad")
                }
            }
        }
    return;
    } 
    
}


function localStorageListaUsuarios(pList){
    localStorage.setItem('ListaUsuariosLocal', JSON.stringify(pList));
}


function getListaUsuarios(){
    var storedLista = localStorage.getItem('ListaUsuariosLocal')
    if(storedLista == null){
        usuarios = [];
    }else{
        usuarios= JSON.parse(storedLista);
    }
    return usuarios;
}

function listarUsuarios() {
    //localStorage.getItem('usuarios')
    let lista = document.getElementById("listaUsuarios")
    getListaUsuarios();
    
    let data = ""
    for (let i = 0; i < usuarios.length; i++
        ) {
        let miUsuario2 = usuarios[i];
        data += "<tr>"
        data += `<td>${miUsuario2.tipoDI}</td>`
        data += `<td>${miUsuario2.id}</td>`
        data += `<td>${miUsuario2.nombre} ${miUsuario2.apellidos}</td>`
        data += `<td>${miUsuario2.correo} </td>`
        data += `<td>${miUsuario2.peso} </td>`
        data += `<td>${miUsuario2.estatura} </td>`
        data += `<td>${miUsuario2.convertidoIMC} </td>`
        data += `<td><button type="button" onclick="cargarInformacion(${i})" class="btn btn-primary btn-sm">Modificar</button> </td>`
        data += '<td><button type="button" onclick="eliminarUsuario(' + i + ')" class="btn btn-primary btn-sm">Eliminar</button> </td>'
        data += `<td><button type="button" onclick="consultar(${i})" class="btn btn-primary btn-sm">Ver Estado</button> </td>`
        data += "</tr>"
    }
    lista.innerHTML = data
    
}

// Llamado a la función
listarUsuarios()
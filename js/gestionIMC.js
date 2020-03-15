console.log("----------- Gestion de Usuarios ----------")
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

function obtenerValores() {
    let tipoDI = document.getElementById("tipoDI").value
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellidos").value
    let correo = document.getElementById("correo").value
    let peso = document.getElementById("peso").value
    let estatura = document.getElementById("estatura").value

    calcularMasaCorporal()
    
    //Aqui se hace el arreglo del usuario
    let miUsuario2 = { tipoDI, id, nombre, apellidos, correo, peso, estatura, convertidoIMC }
    //localStorage.setItem('usuarios',JSON.stringify(miUsuario2))
    return miUsuario2
}

function calcularMasaCorporal(){
    let peso = document.getElementById("peso").value
    let estatura = document.getElementById("estatura").value
    estaturaMetros = estatura/100
    indiceMasaCorporal = peso/(estaturaMetros*estaturaMetros) 
    convertidoIMC = indiceMasaCorporal.toFixed(1)
    //console.log(" el indice de masa corporal es de " +convertidoIMC)
    return convertidoIMC

}

function crearUsuario() {
    let usuario = obtenerValores()
    let existeUsuario = usuarios.find(x => usuario.id === x.id)
    if (existeUsuario) {
        console.log('El usuario ya existe');
        alert("El usuario ya existe")
        return;
    }
    
    usuarios.push(usuario)
    

    listarUsuarios(limpiarFormulario)
}

function eliminarUsuario(index) {
    usuarios.splice(index, 1)
    listarUsuarios()
}

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
}


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

function modificarUsuario() {
    let usuarioActualizado = obtenerValores()
    usuarios.splice(usuarioTemporal, 1, usuarioActualizado)
   
    listarUsuarios(limpiarFormulario)
}

function consultar(index){
    let usuario = usuarios[index]
    usuarioTemporal = index


    let consultaEstatura = usuario.estatura
    let consultaPeso =usuario.peso

    estaturaMetros = consultaEstatura/100
    indiceMasaCorporal = consultaPeso/(estaturaMetros*estaturaMetros) 
    convertidoIMC = indiceMasaCorporal.toFixed(1)
    console.log("este es el IMC del consultado "+convertidoIMC)

    if(convertidoIMC<18.5){
        alert("Bajo peso")
        console.log("quedo en bajo peso")
    }else{
        console.log("entro al condicional")
        if (30>convertidoIMC && convertidoIMC>=18.5){
            alert("Peso normal")
            console.log("quedo en peso normal")
        }else{
            console.log("entro al segundo condicional")
            if(35>convertidoIMC && convertidoIMC>=30){
                alert("Sobre Peso")
                console.log("quedo en sobre peso")
            }else{
                console.log("entro al tercer condicional")
                if(35<=convertidoIMC){
                    alert("obesidad")
                    console.log("quedo en obeso")
                }
            }
        }
        return;
    } 
    
}



function listarUsuarios(callback) {
    //localStorage.getItem('usuarios')
    let lista = document.getElementById("listaUsuarios")
    let data = ""
    for (let i = 0; i < usuarios.length; i++) {
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
        data += `<td><button type="button" onclick="consultar(${i})" class="btn btn-primary btn-sm">VerEstado</button> </td>`
        data += "</tr>"
    }
    lista.innerHTML = data
    callback()
}

// Llamado a la función
listarUsuarios()
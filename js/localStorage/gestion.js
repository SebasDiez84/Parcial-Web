function guardarUsuario(){
    let stipoDI = document.getElementById("tipoDI").value
    let sid = document.getElementById("id").value
    let snombre = document.getElementById("nombre").value
    let sapellidos = document.getElementById("apellidos").value
    let scorreo = document.getElementById("correo").value
    let speso = document.getElementById("peso").value
    let sestatura = document.getElementById("estatura").value
    calcularMasaCorporal()

    agregarUsuarioAlSistema(stipoDI, sid, snombre, sapellidos, scorreo, speso, sestatura, convertidoIMC)
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
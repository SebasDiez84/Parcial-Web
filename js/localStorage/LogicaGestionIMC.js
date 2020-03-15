var listaUsuarios = [];

function agregarUsuarioAlSistema(pTipoDI, pId, pNombre, pApellidos, pCorreo, pPeso, pEstatura, pconvertidoIMC){

    var nuevoUsuario = {
        // Propiedad valor- es como un jason
        tipo : pTipoDI,
        id : pId,
        nombre : pNombre,
        apellidos : pApellidos,
        correo : pCorreo,
        peso : pPeso,
        estatura : pEstatura,
        convertidoIMC : pconvertidoIMC
    };
    console.log(nuevoUsuario);
    listaUsuarios.push(nuevoUsuario);
}
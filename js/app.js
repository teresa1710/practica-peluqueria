document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    console.log('Iniciando app');
    mostrarServicios();
}

async function mostrarServicios(){
    try {
        const resultado = await fetch('servicios.json');
        //const db = await resultado.json();
        
        console.log(resultado);

    } catch (error) {
        console.log(error);
    }
}

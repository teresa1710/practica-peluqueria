document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();
}

async function mostrarServicios(){
    try {
        const resultado = await fetch('servicios.json');
        const db = await resultado.json();
        
        console.log(db.servicios);

    } catch (error) {
        console.log(error);
    }
}

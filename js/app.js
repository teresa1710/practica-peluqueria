document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    console.log('Iniciando app');
    mostrarServicios();
}

async function mostrarServicios(){
    try {
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const servicios = db.servicios;

        //Generando HTML

        servicios.forEach( servicio => {
            //console.log(servicio);      
            

            //Generando el nombre

            const {id,nombre,precio} = servicio;

            const nombreServicio =  document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            //Generando Precio

            const precioServicio =  document.createElement('P');
            precioServicio.textContent =`$ ${precio}`;
            precioServicio.classList.add('precio-servicio');

            // Generando Div servicio
            
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicio');
            servicioDiv.classList.add('col-md-5');
            servicioDiv.dataset.idServicio = id;

            //Agregar precio y nombre

            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            //console.log(servicioDiv);

            //Seleccion de servicio
            servicioDiv.onclick = seleccionarServicio;


            //Pasarlo al html

            document.querySelector('#servicios').appendChild(servicioDiv);

        });
        
        //console.log(servicios);

    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(e){
    //Forzar que el elemento al cual le damos click sea div

    let elemento;

    if(e.target.tagName === 'P'){
        elemento = e.target.parentElement;
        console.log(elemento);
    }else{
        elemento = e.target;
        console.log(elemento);
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');

    }else{
        elemento.classList.add('seleccionado');
    }
}
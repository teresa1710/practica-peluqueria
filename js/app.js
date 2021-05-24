let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    mostrarServicios();

    //Resalta el div actual segun el que se presiona
    mostrarSeccion();

    //Oculta o muestra una sección segun el tal que se presiona
    cambiarSeccion();
}

function mostrarSeccion(){
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.botones button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e =>{
            e.preventDefault();
            
            pagina = parseInt(e.target.dataset.paso);

            //Elimina mostrar-seccion de la sección anterior
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');
            
            //Agrega mostrar-seccion donde dimos click
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            //Elimina la clase de actual en el tab anterior
            document.querySelector('.botones .actual').classList.remove('actual');

            //Agrega la clase de actual en el nuevo tab
            const tab= document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('actual');
        })
    })
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


$(document).ready(function(){
    let pagina = 1;

    const cita= {
        nombre: '',
        fecha: '',
        hora: '',
        servicios: []

    }

    document.addEventListener('DOMContentLoaded', function(){
        iniciarApp();
    });

    function iniciarApp(){
        mostrarServicios();

        //Resalta el div actual segun el que se presiona
        mostrarSeccion();

        //Oculta o muestra una sección segun el tal que se presiona
        cambiarSeccion();

        //Paginación
        paginaSiguiente();

        paginaAnterior();

        //Comprueba pagina actual para ocultar o mostrar la paginación
        
        botonesPaginador();

        //Resumen de la cita verificacion de vacio
        //mostrarResumen();

        nombreCita();

    }

    function mostrarSeccion(){
        const seccionAnterior = document.querySelector('.mostrar-seccion');

        if(seccionAnterior){
            seccionAnterior.classList.remove('mostrar-seccion');
        }

        const seccionActual = document.querySelector(`#paso-${pagina}`);
        seccionActual.classList.add('mostrar-seccion');

        const tabAnterior = document.querySelector('.botones .actual');
        if (tabAnterior){
            tabAnterior.classList.remove('actual');
        }

        const tab = document.querySelector(`[data-paso="${pagina}"]`);
        tab.classList.add('actual');
    }

    function paginaAnterior(){
        const paginaAnterior = document.querySelector('#anterior');

        paginaAnterior.addEventListener('click', () => {
            pagina--
            botonesPaginador();
        });
    }

    function paginaSiguiente(){
        const paginaSiguiente = document.querySelector('#siguiente');

        paginaSiguiente.addEventListener('click', () => {
            pagina++
            botonesPaginador();
        });
    }

    function botonesPaginador(){
        const paginaSiguiente = document.querySelector('#siguiente');
        const paginaAnterior = document.querySelector('#anterior');

        if(pagina === 1){
            paginaAnterior.classList.add('ocultar');
        }else if(pagina === 3){
            paginaSiguiente.classList.add('ocultar');        
            paginaAnterior.classList.remove('ocultar');
        } else {
            paginaSiguiente.classList.remove('ocultar');        
            paginaAnterior.classList.remove('ocultar');
        }

        mostrarSeccion();
    }

    function cambiarSeccion(){
        const enlaces = document.querySelectorAll('.botones button');

        enlaces.forEach(enlace => {
            enlace.addEventListener('click', e =>{
                e.preventDefault();
                
                pagina = parseInt(e.target.dataset.paso);

                mostrarSeccion();

                botonesPaginador();
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

            const id = parseInt (elemento.dataset.idServicio);

            eliminarServicio(id);

        }else{
            elemento.classList.add('seleccionado');
            //console.log(elemento.firstElementChild.nextElementSibling.textContent);

            servicioObj = {
                id: parseInt(elemento.dataset.idServicio),
                nombre: elemento.firstElementChild.textContent,
                precio: elemento.firstElementChild.nextElementSibling.textContent

            }

            //console.log(servicioObj);
            agregarServicio(servicioObj);
        }
    }

    function eliminarServicio(id){
        //console.log ('Eliminando . . . ' + id);

        const {servicios} = cita;
        cita.servicios = servicios.filter(servicio => servicio.id !== id);
        console.log(cita);
    }

    function agregarServicio(servicioObj){
        const {servicios} = cita;

        cita.servicios = [...servicios, servicioObj];
        
        console.log(cita);
    }


    function mostrarResumen() {
        //Destructuring
        const { nombre, fecha, hora, servicios } = cita;

        //Seleccionar el resumen 
        const resumenDiv = document.querySelector('.contenido-resumen');

        //Validación de Objeto



        if(Object.values(cita).includes('')){
            //console.log('Objeto vacio');
            const noServicios = document.createElement('P');

            noServicios.textContent = 'Faltan datos de Servicios, hora, fecha o nombre';

            noServicios.classList.add('invalidar-cita');

            resumenDiv.appendChild(noServicios);

            return;
        }
    }

    function nombreCita(){
        const nombreInput = document.querySelector('#nombre');
        
        nombreInput.addEventListener('input', e =>{
            const nombreTexto = e.target.value.trim();

            //Validacion 

            if(nombreTexto === '' || nombreTexto.length < 3){
                mostrarAlerta('Nombre no valido', 'error');
            }else {
                cita.nombre = nombreTexto;
            }

        });
    }

    function mostrarAlerta(mensaje, tipo){

        const alerta= document.createElement('DIV');
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');

        if(tipo === 'error'){
            alerta.classList.add('error');
        }

        const formulario = document.querySelector('.formulario');
        formulario.appendChild( alerta );
    }
})
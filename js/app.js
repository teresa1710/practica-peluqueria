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
        mostrarResumen();

        nombreCita();

        fechaCita();

        horaCita();

        deshabilitarFechaAnterior();
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

            mostrarResumen(); 
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
            //console.log(elemento);
        }else{
            elemento = e.target;
            //console.log(elemento);
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
        //console.log(cita);
    }

    function agregarServicio(servicioObj){
        const {servicios} = cita;

        cita.servicios = [...servicios, servicioObj];
        
        //console.log(cita);
    }


    function mostrarResumen() {
        //Destructuring
        const { nombre, fecha, hora, servicios } = cita;

        //Seleccionar el resumen 
        const resumenDiv = document.querySelector('.resumen');

        while(resumenDiv.firstChild){
            resumenDiv.removeChild(resumenDiv.firstChild);
        }

        if(Object.values(cita).includes('')){
            //console.log('Objeto vacio');
            const noServicios = document.createElement('P');

            noServicios.textContent = 'Faltan datos de Servicios, hora, fecha o nombre';

            noServicios.classList.add('invalidar-cita');

            resumenDiv.appendChild(noServicios);

            return;
            
        }
            //console.log('Todos los datos correctos, a continuacion información');

        const headingCita = document.createElement('H3');
        headingCita.textContent = 'Resumen de Cita: ';
        headingCita.classList.add('titulo-resumen');

        const nombreCita=document.createElement('P');
        nombreCita.innerHTML = `<span> Nombre: </span> ${nombre}`;

        const fechaCita = document.createElement('P');
        fechaCita.innerHTML = `<span> Fecha: </span> ${fecha}`;

        const horaCita = document.createElement('P');
        horaCita.innerHTML = `<span> Hora: </span> ${hora}`;

        const serviciosCita = document.createElement('DIV');
        serviciosCita.classList.add ('resumen-servicios');

        const headingServicios = document.createElement('H3');
        headingServicios.textContent = 'Resumen de Servicios: ';
        headingServicios.classList.add('titulo-resumen');

        serviciosCita.appendChild(headingServicios);

        let cantidad = 0;

        servicios.forEach(servicio =>{

            const {nombre, precio } = servicio;

            const contenedorServicio = document.createElement('DIV');
            contenedorServicio.classList.add('contenedor-servicio');

            const textoServicio = document.createElement('P');
            textoServicio.textContent = nombre ;

            const precioServicio = document.createElement('P');
            precioServicio.textContent = precio;
            precioServicio.classList.add('precio');

            const totalPagar = precio.split('$');
            cantidad += parseInt(totalPagar[1].trim());
    
            contenedorServicio.appendChild(textoServicio);
            contenedorServicio.appendChild(precioServicio);

            serviciosCita.appendChild(contenedorServicio);
        })

        resumenDiv.appendChild(headingCita);

        resumenDiv.appendChild(nombreCita);
        resumenDiv.appendChild(fechaCita);
        resumenDiv.appendChild(horaCita);

        resumenDiv.appendChild(serviciosCita);

        const cantidadPagar = document.createElement('P');
        cantidadPagar.classList.add('cantidad-pagar');
        cantidadPagar.innerHTML = `<span> TOTAL: </span> ${cantidad} $`;
        resumenDiv.appendChild(cantidadPagar);

        
    }

    function nombreCita(){
        const nombreInput = document.querySelector('#nombre');

        nombreInput.addEventListener('input', e => {
        const nombreTexto = e.target.value.trim();

        // Validación de que nombreTexto debe tener algo
        if( nombreTexto === '' || nombreTexto.length < 3 ) {
            mostrarAlerta('Nombre no valido', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if(alerta) {
                alerta.remove();
            }
            cita.nombre = nombreTexto;
        }
    });
    }

function mostrarAlerta(mensaje, tipo){

        const alertaPrevia = document.querySelector('.alerta');
        if(alertaPrevia){
            return;
        }


        const alerta= document.createElement('DIV');
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');

        if(tipo === 'error'){
            alerta.classList.add('error');
        }

        const formulario = document.querySelector('.formulario');
        formulario.appendChild( alerta );

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

function fechaCita(){
    const fechaInput = document.querySelector('#fecha');
    fechaInput.addEventListener('input', e=> {

        const dia = new Date(e.target.value).getUTCDay();  
        
        if([0,6].includes(dia)){
            
            //console.log('Seleccionaste Sabado o Domingo y no trabajamos');
            e.preventDefault();
            fechaInput.value = '';
            mostrarAlerta('Seleccionaste Sabado o Domingo y no trabajamos', 'error');

        }else{
            cita.fecha = fechaInput.value
            
        }
    })
}

function horaCita(){
    const horaInput = document.querySelector('#hora');

    horaInput.addEventListener('input', e=> {
        const horaCita = e.target.value;
        const hora = horaCita.split(':');

        if (hora [0]< 10 || hora[0] > 18){
            mostrarAlerta('Abrimos de 10:00 am a 6:00 pm', 'error');
            setTimeout(() => {
                horaInput.value = '';
            }, 3000);
        }else{
            cita.hora = horaCita;
        }
    })
}

function deshabilitarFechaAnterior (){
    const inputFecha = document.querySelector('#fecha');

    //console.log (inputFecha);
    
    const fechaAhora = new Date();

    //console.log(fechaAhora);

    const year = fechaAhora.getFullYear();
    const mes = fechaAhora.getMonth() + 1;
    const dia = fechaAhora.getDate() + 1;

    if (mes == 1 || mes == 2 || mes == 3 || mes == 4 || mes == 5 || mes == 6 || mes == 7 || mes == 8 || mes == 9){
        const fechaDeshabilitar = `${year}-0${mes}-${dia}`;
        inputFecha.min = fechaDeshabilitar;
    } else {
        const fechaDeshabilitar = `${year}-${mes}-${dia}`;
        inputFecha.min = fechaDeshabilitar;
    }

    

}


setInterval(ActualizarHora, 1000);
ActualizarHora();
Fecha();



let Localidad = function(){

    let AlarmasJSON = JSON.parse(localStorage.getItem('todasAlarmas'));

    try {
        if (AlarmasJSON){
            let contenido = '';              
            
            for(let alarma of AlarmasJSON){   
                contenido += `<div class="Evento">`;
    
                contenido += `<div class="EventoHeader">`;
                contenido += `<div class="CirculoColor" style="background-color: ${alarma.color};"></div>`;
                contenido += `<div class="Titulo TextosHeader">${alarma.nombre}</div>`;
                contenido += `<div class="Horario TextosHeader">${alarma.horaInicio} - ${alarma.horaFinal}</div>`;
                contenido += `</div>`;
    
                contenido += '<div class="EventoFooter">';
                contenido += `<div class="DiasSemana" style="background-color: ${alarma.dias.includes(1) ? alarma.color : ''};">L</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(2) ? alarma.color : ''};">M</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(3) ? alarma.color : ''};">X</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(4) ? alarma.color : ''};">J</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(5) ? alarma.color : ''};">V</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(6) ? alarma.color : ''};">S</div>
                            <div class="DiasSemana" style="background-color: ${alarma.dias.includes(7) ? alarma.color : ''};">D</div>`;
                contenido += `<div class="BotonEliminar" id="num ${alarma.num}"><i class="bx bxs-trash-alt"></i></div>`;
                contenido += '</div>';
    
                contenido += '</div>';
            }
            
            document.getElementById('ListadoEventos').innerHTML = contenido;
           
        } else {
            console.log('No hay datos en localStorage.');
        }
    }
    catch(e) {
        console.log('ERROR, Nada en localStorage: ' + e);
    }
}
Localidad();

function ActualizarHora() {
    let HoraActual = new Date();

    /* SEPARA COMPONENTES  */
    let horas = HoraActual.getHours();
    let minutos = HoraActual.getMinutes();
    let segundos = HoraActual.getSeconds();    
    /* SEPARA COMPONENTES  */

    /* FORMATEO  */
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    /* FORMATEO  */

    /* DECLARO  */
    let horasMinutos = document.getElementById('horasMinutos');
    let seconduos = document.getElementById('seconduos');
    let tiposHorita = document.getElementById('tiposHorita');
    
    /* DECLARO  */

    /* INSERTO  */
    horasMinutos.innerText = `${horas} : ${minutos}`;
    seconduos.innerText = segundos;
    if(horas < 12){
        tiposHorita.innerText = "a.m.";
    }
}


function Fecha() {
    let FechaActual = new Date();

    /* SEPARA COMPONENTES  */
        let anio = FechaActual.getFullYear();
        let mes = FechaActual.getMonth() + 1; // Meses comienzan desde 0, por lo que se suma 1
        let dia = FechaActual.getDate();
        let diaN = FechaActual.getDay() ;
            /* SEPARA COMPONENTES  */

    /* FORMATEO  */
        let MesReal =  Meses(mes);
        let DiaReal =  Dias(diaN);
    /* FORMATEO  */

    /* DECLARO  */
        let DiaN = document.getElementById('HDia');
        let Dia = document.getElementById('HNoDia');    
        let Meso = document.getElementById('HMes');
        let ANIO = document.getElementById('HYear');
    /* DECLARO  */

    /* INSERTO  */
        DiaN.innerText = DiaReal;
        Dia.innerText = dia;
        Meso.innerText = MesReal;
        ANIO.innerText = anio;
    /* INSERTO  */

    // let fechaHoraFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia} ${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}


function Meses(NoMes){
    const MESES = {
        1: 'Enero',
        2: 'Febrero',
        3: 'Marzo',
        4: 'Abril',
        5: 'Mayo',
        6: 'Junio',
        7: 'Julio',
        8: 'Agosto',
        9: 'Septiembre',
        10: 'Octubre',
        11: 'Noviembre',
        12: 'Diciembre'
    }

    let mese = MESES[NoMes];
    return mese;
} 


function Dias(NoDia){
    const DIAS = {
        1: 'Lunes',
        2: 'Martes',
        3: 'Miércoles',
        4: 'Jueves',
        5: 'Viernes',
        6: 'Sábado',
        0: 'Domingo'
    }

    let diad = DIAS[NoDia];
    return diad;
} 


function MandarJSON(nom, color, diasguar, horaI, ForaF){
   
    let NombreAlarma = nom;
    let Color = color;
    let DiasGuardados = [...diasguar];
    let HoraInicio = horaI;
    let HoraFinal = ForaF;

    /* JSON */
    let AlarmasGeneral = [];

    let alarmasJSON = JSON.parse(localStorage.getItem('todasAlarmas'));
    let posicion;
    if(alarmasJSON){
        posicion = alarmasJSON.length;
    }
    else{
        posicion = 0;
    }

    console.log(posicion);
    let numero = posicion+1;

    const Alarma = {
        nombre: NombreAlarma,
        color: Color, 
        dias: DiasGuardados,
        horaInicio: HoraInicio,
        horaFinal: HoraFinal,
        num: numero
    };

    if(alarmasJSON){

        alarmasJSON.push(Alarma);

        let datosJSON2 = JSON.stringify(alarmasJSON);
        localStorage.setItem('todasAlarmas', datosJSON2);


    } else{

        AlarmasGeneral.push(Alarma);

        let datosJSON2 = JSON.stringify(AlarmasGeneral);
        localStorage.setItem('todasAlarmas', datosJSON2);

    }
    /* JSON */

    ResetFormulario();

   console.log('click');
   Localidad();
   location.reload();
}


function ResetFormulario(){
  /* RESET FORMULARIO  */
  let entradas = document.getElementById('fname')
  entradas.value = '';

  let colores = document.getElementById('colorcito')
  colores.value = '#fca130';

  let checkDias = document.getElementsByClassName('DiasForm');
  for(let checkDia of checkDias){
      
      checkDia.checked = false;
  }

  let horasSets = document.getElementsByClassName('horas');
  for(let horasSet of horasSets){
      
      horasSet.value = '';
  }
  /* RESET FORMULARIO */
}


let ValidarDatos = function(){
    let Mensaje = document.getElementById('advertencia');

    let NombreAlarma = document.getElementById('fname').value;

    let Color = document.getElementById('colorcito').value;

    let DiasSemana = document.getElementsByClassName('DiasForm');
    let DiasGuardados = [];

    for (let i = 0; i < DiasSemana.length; i++) {
        
        if (DiasSemana[i].checked) {
            let sumaDia = parseInt((DiasSemana[i].value));
            DiasGuardados.push(sumaDia+1);
        }
    }

    let HoraInicio = document.getElementById('HoraInicio').value;
    let HoraFinal = document.getElementById('HoraFinal').value;

    if(NombreAlarma && (DiasGuardados.length >=1) && HoraInicio && HoraFinal){
        console.log('Datos CORRECTOS');
        
        MandarJSON(NombreAlarma, Color, DiasGuardados, HoraInicio, HoraFinal);
        Mensaje.classList.add('ocultar');
    }
    else{
        console.log('Datos INCORRECTOS');
        Mensaje.classList.remove('ocultar');
    }

   
}

document.getElementById('Guardado').addEventListener('click', function(){ValidarDatos()});







let cards = document.querySelectorAll('.BotonEliminar');

cards.forEach(function(card, posicion) {
    card.addEventListener('click', function() {
        Localidad();
        console.log('Elemento clickeado:');
        console.log('Elemento clickeado:', posicion);
        // Localidad();
       EliminarAlarma(posicion);
        
    });
});

function EliminarAlarma(pos){
    console.log('Elemento ELIMINADO:', pos);
    
    Localidad();
    let AlarmasJSON = JSON.parse(localStorage.getItem('todasAlarmas'));

    AlarmasJSON.splice(pos, 1);

    let datosJSON2 = JSON.stringify(AlarmasJSON);
    localStorage.setItem('todasAlarmas', datosJSON2);

    location.reload();
    
}
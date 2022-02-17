//variables

const moneda1 = document.getElementById("moneda1");
const moneda2 = document.getElementById("moneda2");

let cantidad1 = document.getElementById("cantidad1");
let cantidad2 = document.getElementById("cantidad2");

let elementoTarifa = document.getElementById("rate");



//eventos

moneda1.addEventListener("change", calcularConver);
moneda2.addEventListener("change", calcularConver);

cantidad1.addEventListener("input", calcularConver);
cantidad2.addEventListener("input", calcularConver);


//funcion de calculo

function calcularConver() {

 //valores de la Api

    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda1.value}`)
      .then(response => response.json())
      .then(data =>  {
        let tarifa = data.rates[moneda2.value];
        elementoTarifa.innerText = `1 ${moneda1.value} = ${tarifa} ${moneda2.value}`;

  //resultado Impreso en el segundo Input
        cantidad2.value = Math.round(cantidad1.value * tarifa);


    });
}



// Inserto Botones

$(".resultadoDiv").prepend(`
<input class="btn1 guardar" type="button" value="Guardar transacción">
<input class="btn1 mostrar" type="button" value="Mostrar transacción guardada">
`);





//Guardando los datos en el LocalStorage

    $(document).ready(function(){    
      $(".guardar").click(function(){      

        
        localStorage.setItem("Moneda Ingresada", moneda1.value);
        localStorage.setItem("Cantidad", cantidad1.value);
        localStorage.setItem("Moneda a convertir", moneda2.value);
        localStorage.setItem("Resultado De la Conversion", cantidad2.value);
        
      });   
});



//mostrar datos guardados

$(document).ready(function(){    
  $(".mostrar").click(function(){    

    let monedaIn = localStorage.getItem("Moneda Ingresada");
    let cant = localStorage.getItem("Cantidad");
    let monedaConv = localStorage.getItem("Moneda a convertir");
    let result = localStorage.getItem("Resultado De la Conversion");
    
      $(".resultadoDiv").prepend(`
      <div class="alert alert-danger" role="alert">
      ${monedaIn} ${cant} ${monedaConv} ${result}
      </div>
      `);
    

// animacion breve
    let textoGuardado = $(".alert");
    
    textoGuardado.animate({fontSize: '2em'}, "slow");
			$('.alert').hide(3000);
  });   
});




calcularConver();















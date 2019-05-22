

// ------------------------- LOADING ------------------------------
window.addEventListener("load",loading = () =>{

    let load = document.querySelector('#load');
    
    load.style.display = 'none';

});

// ------------------------- DropDown de Admin----------------------

var subMenu = document.querySelector('#submenu');

var dropdown = () => {

    let despliegue = document.querySelector('#drop');
    if (despliegue.style.display === 'none') {
        despliegue.style.display = 'flex';
    } else {
        despliegue.style.display = 'none';
    }
}

subMenu.addEventListener('click', dropdown);

// --------------------------- Buscador ---------------------------


const formulario = document.querySelector('#buscador');
const respuesta = document.querySelector('#res');

console.log(respuesta)
const buscar = () => {

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {

            res.innerHTML = '';

            let datos = JSON.parse(ajax.responseText);
            let busquedas = formulario.value.toLowerCase();

            for (let i of datos) {
                let cliente = i.clientes.toLowerCase();
                let producto = i.producto.toLowerCase();
                if (cliente.indexOf(busquedas) !== -1 || producto.indexOf(busquedas) !== -1) {
                    res.innerHTML += `
                <tr id="fila-cotiza" onclick="mostrarModal()">
                    <td>${i.codCotizacion}</td>
                    <td>${i.clientes}</td>
                    <td>${i.encargado}</td>
                    <td>${i.producto}</td>
                    <td class="table_des">${i.descripcion}</td>
                    <td><span class="estado blue">${i.estado}</span></td>
                    <td>${i.fecha}</td>
                </tr>
            `
                }
            }

            if (res.innerHTML === '') {
                res.innerHTML += `
            <tr>
                <td colspan="7" style="font-size:20px;">Producto no encontrado...</td>
            </tr>
        `
            }
        }
    };
    ajax.open('GET', 'js/cotizaciones.json', true);

    ajax.send();

}

formulario.addEventListener('keyup', buscar);

// -------------------- seleccion de cotizacion -------------



// ------------------------------ VENTANA MODAL -------------------------
var mostrarModal = () =>{

let modal = document.querySelector('#miModal');
let flex = document.querySelector('#flex');
let cerrar = document.querySelector('#close');

modal.style.display = 'block';

cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === flex) modal.style.display = 'none';
});
}
//   -----------------------------------------------------------------------
    

// ------------------- Imput search ------------------

var btnSearch = document.querySelector('#btn');
var x = 0;
let hojaSearch = document.createElement('style');
var inputSearch = document.querySelector('#buscador');

const show = () => {
    if (x == 0) {
        x = 1;
        hojaSearch.innerHTML = '.search__action>.buscador {width: 200px; padding: 0 7px;}.search__action>.search__icon {background-color: var(--color-secundary);}';
        document.head.appendChild(hojaSearch);
        inputSearch.setAttribute('autofocus', 'autofocus')
    } else {
        x = 0;
        document.head.removeChild(hojaSearch);
        inputSearch.removeAttribute('autofocus')
    }
}

btnSearch.addEventListener('click', show);
inputSearch.addEventListener('blur', show);


//  ----------------------- Graficos con JavaScript ----------------

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Cantidad de Productos'],
        ['Laptop', 11],
        ['SmartPhone', 14],
        ['Monitores', 2],
        ['Mouse', 2],
        ['Teclado', 7]
    ]);

    var options = {
        title: 'Productos más cotizados',
        height: 210,
        width: 335,
        'background': 'blue',
        'color': 'red',
        pieHole: 0.4,
    };

    var chart = new google.visualization.LineChart(document.querySelector('#chart'));
    var chart2 = new google.visualization.PieChart(document.querySelector('#chart2'));
    var chart3 = new google.visualization.PieChart(document.querySelector('#chart3'));

    chart.draw(data, options);
    chart2.draw(data, options);
    chart3.draw(data, options);


}
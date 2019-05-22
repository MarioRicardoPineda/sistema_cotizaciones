
// ------------------------- DropDown de Admin----------------------

var subMenu = document.querySelector('#submenu');
var padre = document.querySelector('#padre')
var dropdown = () => {

    let despliegue = document.querySelector('#drop');
    if (despliegue.style.display === 'none') {
        despliegue.style.display = 'flex';
    } else {
        despliegue.style.display = 'none';
    }
}

subMenu.addEventListener('click', dropdown);

// ------------------------------------------------------------------

// ------------------------------ VENTANA MODAL -------------------------

let modal = document.querySelector('#miModal');
let flex = document.querySelector('#flex');
let mostrar = document.querySelector('#mostrar');
let cerrar = document.querySelector('#close');

const mostrarModal = () => {
    modal.style.display = 'block';
}

mostrar.addEventListener('click', mostrarModal);
cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === flex) modal.style.display = 'none';
});

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

// ------------------------------ BUSCADOR DE PRODUCTOS MODAL ----------------------------

let buscador = document.querySelector('#buscador');
let tableModal = document.querySelector('#tableModal');


const searchPlus = () => {

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {

        if (ajax.readyState == 4 && ajax.status == 200) {

            tableModal.innerHTML = '';

            let productos = JSON.parse(ajax.responseText);
            let busquedas = buscador.value.toLowerCase();

            for (let i of productos) {
                let productoEncontrado = i.producto.toLowerCase();
                let marcaEncontrada = i.marca.toLowerCase();

                if (productoEncontrado.indexOf(busquedas) !== -1 || marcaEncontrada.indexOf(busquedas) !== -1) {

                    tableModal.innerHTML +=
                        `
                        <tr>
                            <td>${i.codigo}</td>
                            <td>${i.producto}</td>
                            <td>${i.marca}</td>
                            <td>
                                <input type="number" value="1">
                            </td>
                            <td>
                                <input type="number" placeholder="%" >
                            </td>
                            <td>
                                <i class="fas fa-dollar-sign margin"></i>${i.precio}</td>
                            <td>
                                <a href="#" >
                                    <i class="fas fa-cart-plus"></i>
                                </a>
                            </td>
                        </tr>

                    `
                }
            }

            if (tableModal.innerHTML === '') {
                tableModal.innerHTML +=
                    `
                        <tr >
                            <td colspan="8" style="font-size: 20px;">El Producto no esta disponible...</td>
                        </tr>

                    `
            }
        }
    };

    ajax.open('GET', 'js/compraProductos.json', true);

    ajax.send();
};

buscador.addEventListener('keyup', searchPlus);


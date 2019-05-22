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

// -------------------------- Buscador de Productos --------------------

const buscador = document.querySelector('#buscador');
const tabla = document.querySelector('#res');

const buscarProductos = () => {

    const resAjax = new XMLHttpRequest();

    resAjax.onreadystatechange = () => {

        if (resAjax.readyState == 4 && resAjax.status == 200) {

            tabla.innerHTML = '';

            let productos = JSON.parse(resAjax.responseText);
            let busquedaCliente = buscador.value.toLowerCase();

            for (let i of productos) {
                let producto = i.producto.toLowerCase();
                let marca = i.marca.toLowerCase();

                if (producto.indexOf(busquedaCliente) !== -1 || marca.indexOf(busquedaCliente) !== -1) {
                    res.innerHTML +=
                        `
                    <tr>
                        <td>${i.codigo}</td>
                        <td>${i.producto}</td>
                        <td>
                            <i class="fas fa-dollar-sign margin"></i>${i.precio}
                        </td>
                        <td>${i.stock}</td>
                        <td>${i.estado}</td>
                        <td>${i.marca}</td>
                        <td>${i.fabricante}</td>
                        <td>
                            <a href="#">
                                <i class="fas fa-cart-plus"></i>
                            </a>|
                            <a href="#">
                                <i class="fa fa-info"></i>
                            </a>|
                            <a href="#">
                                <i class="fa fa-trash-alt trash"></i>
                            </a>
                        </td>
                    </tr>

                    `
                }
            }

            if (tabla.innerHTML === '') {
                tabla.innerHTML +=
                    `
                        <tr >
                            <td colspan="8" style="font-size: 20px;">Producto no esta disponible...</td>
                        </tr>

                    `
            }
        }
    }

    resAjax.open('GET', 'js/productos.json', true);

    resAjax.send();
}

buscador.addEventListener('keyup', buscarProductos)
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

// -------------------------- Buscador de usuarios --------------------

const buscador = document.querySelector('#buscador');
const tabla = document.querySelector('#res');

const buscarUsuarios = () => {

    const resAjax = new XMLHttpRequest();

    resAjax.onreadystatechange = () => {

        if (resAjax.readyState == 4 && resAjax.status == 200) {

            tabla.innerHTML = '';

            let usuarios = JSON.parse(resAjax.responseText);
            console.log(usuarios)
            let busquedaUsuarios = buscador.value.toLowerCase();
            console.log(busquedaUsuarios)

            for (let i of usuarios) {
                let usuario = i.nombre.toLowerCase();
                let tipo = i.tipo.toLowerCase();

                if (usuario.indexOf(busquedaUsuarios) !== -1 || tipo.indexOf(busquedaUsuarios) !== -1) {
                    res.innerHTML +=
                    `
                    <tr>
                        <td>${i.id}</td>
                        <td>${i.nombre}</td>
                        <td>${i.email}</td>
                        <td>${i.password}</td>
                        <td>${i.tipo}</td>
                    </tr>

                    `
                }
            }

            if (tabla.innerHTML === '') {
                tabla.innerHTML +=
                    `
                        <tr >
                            <td colspan="8" style="font-size: 20px;">Usuario No Encontrado...</td>
                        </tr>

                    `
            }
        }
    }

    resAjax.open('GET', 'js/usuarios.json', true);

    resAjax.send();
}

buscador.addEventListener('keyup', buscarUsuarios)
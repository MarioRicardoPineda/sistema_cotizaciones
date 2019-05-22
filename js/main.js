
// Para mantener la clase active en el area en la que estoy
/* (function (d) {
    let tabs = Array.prototype.slice.apply(d.querySelectorAll('.tabs__link'));

    d.getElementById('tabs').addEventListener("click", e => {
        if (e.target.classList.contains('tabs__link')) {

            let i = tabs.indexOf(e.target);
            tabs.map(tab => tab.classList.remove('active'));
            tabs[i].classList.add('active');
        }
    });
})(document); */

//  Validacion de formulario

var boton = document.getElementById('boton');
var inputUser = document.getElementById('user');
var inputPass = document.getElementById('pass');
var b = 'borde';

const camposVacios = function () {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    if (user.length <= 0 && pass.length <= 0) {
        inputUser.classList.add(b);
        inputPass.classList.add(b);
    } else if (user.length <= 0) {
        inputUser.classList.add(b);
    } else if (pass.length <= 0) {
        inputPass.classList.add(b);
    }
}

var quitarMsg = function () {
    inputUser = document.getElementById('user');
    inputPass = document.getElementById('pass');
    var comodin = document.querySelector('#comodin').value;

    if (comodin == 1) {
        inputUser.classList.remove(b);
        inputPass.classList.remove(b);
    } else if (inputUser.classList.add(b)) {
        inputUser.classList.remove(b);
    } else if (inputPass.classList.add(b)) {
        inputPass.classList.remove(b);
    }
}

user.addEventListener('focus', quitarMsg);
pass.addEventListener('focus', quitarMsg);
boton.addEventListener('click', camposVacios);
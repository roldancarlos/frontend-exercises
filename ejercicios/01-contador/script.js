const buttonEl = document.querySelector(".boton")
const contadorEl = document.querySelector(".contador")
const resetEl = document.querySelector(".reset")

let contador = 0;

function actualizarContador() {
    contadorEl.textContent = contador.toString().padStart(3, "0")
}

buttonEl.addEventListener("click", () => {
    contador++;
    actualizarContador();
    
    contadorEl.classList.add("animacion");

    setTimeout(() => {
        contadorEl.classList.remove("animacion")
    }, 500);
});


resetEl.addEventListener("click", () => {
    contador = 0;
    actualizarContador();
    contadorEl.classList.remove("animacion");
});

actualizarContador();
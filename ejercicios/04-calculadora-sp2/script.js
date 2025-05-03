const botones = document.querySelectorAll(".num");
const pantalla = document.querySelector(".calculadora.p2");
const resultado = document.querySelector(".resultado")

let valor = "";
let signos = ["+", "-", "/", "*", "."];

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        if (boton.textContent === "C") {
            valor = "";
            pantalla.innerHTML = "0";
            return;
        }

        if (boton.textContent === "←") {
            valor = valor.slice(0, -1);
            pantalla.innerHTML = valor || "0";
            return;
        }

        if (boton.textContent === "=") {
            try {
                valor = eval(valor);
                valor = parseFloat(valor.toFixed(3));
                pantalla.innerHTML = valor;
                valor = valor.toString();
            } catch {
                pantalla.innerHTML = `Error`;
                valor = "";
            }
            return;
        }

        const nuevo = boton.textContent;
        const ultimo = valor.slice(-1)

        if (signos.includes(nuevo) && signos.includes(ultimo)) {
            return;
        }
        valor += boton.textContent;
        pantalla.innerHTML = valor;
    });
});

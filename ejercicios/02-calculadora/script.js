
const botones = document.querySelectorAll(".boton")
const pantalla = document.querySelector(".pantalla")
let entrada = "";
const operadores = ["+", "-", "*", "/"];

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (valor === "C") {
            entrada = "";
        } else if (valor === "=") {
            try {
                let resultado = eval(entrada);
                resultado = parseFloat(resultado.toFixed(2));
                entrada = resultado.toString();
            } catch {
                entrada = "Error";
            }
        } else {
            const ultimo = entrada[entrada.length - 1];


            if (operadores.includes(valor) && operadores.includes(ultimo)) {
                return;
            }

            entrada += valor;
        }

        pantalla.textContent = entrada;
    });
});

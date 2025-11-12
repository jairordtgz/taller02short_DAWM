/**
 * @file main.js
 * @description Main JavaScript file for the Coffee Sales Dashboard.
 */

// Formateador de moneda USD


const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

let loadData = () => {

    try {
        fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/main/Coffee/Coffe_sales.xml')
            .then(response => response.text())
            .then(xml => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml.trim(), 'application/xml');
                return doc;
            })
            .then(doc => {
                console.log(doc);

                let container = document.getElementById("transacciones");
                let transacciones = doc.getElementsByTagName("category");

                // Mostrar solo los primeros 20 elementos
                for (let i = 0; i < Math.min(20, transacciones.length); i++) {
                    let transaccion = transacciones[i];

                    let dia = transaccion.getElementsByTagName("Date")[0]?.textContent || "";
                    let tipo = transaccion.getElementsByTagName("coffee_name")[0]?.textContent || "";
                    let valor = transaccion.getElementsByTagName("money")[0]?.textContent || "";

                    container.innerHTML += `
                        <tr>
                            <td>${dia}</td>
                            <td>${tipo}</td>
                            <td>${fmtUSD.format(valor)}</td>
                        </tr>
                    `;
                }
            }).catch(err => console.error("Error al procesar el XML:", err));


    } catch (err) {
        console.error(err);
    }

}

window.addEventListener('DOMContentLoaded', loadData);

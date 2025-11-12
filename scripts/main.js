/**
 * @file main.js
 * @description Main JavaScript file for the Coffee Sales Dashboard.
 */

// Formateador de moneda USD


const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

let loadData = () => {

    try {
        fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml')
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

            for (let transaccion of transacciones ){

                let dia = transaccion.getElementsByTagName("Date")[0].textContent; 
                let tipo = transaccion.getElementsByTagName("coffee_name")[0].textContent; 
                let valor = transaccion.getElementsByTagName("money")[0].textContent; 

                container.innerHTML += `
                
                <tr> ${dia}</tr> 
                <tr> ${tipo}</tr> 
                <tr> ${valor} </tr> 
                
                `
            }
            })


    } catch (err) {
        console.error(err);
    }

}

window.addEventListener('DOMContentLoaded', loadData);

(() => {
    loadData(); 
})();
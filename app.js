var problemSolver = require("./src/problemSolver");

var readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function startQuestionary(){
    console.log("Bienvenido a nuestro buscador de palabras en la matriz de sopa de letras.");
    console.log("Por default la sopa de letras con la que corremos este ejemplo es: \nO,I,E\nI,I,X\nE,X,E");
    const ans = await askQuestion("y la palabra que buscamos es OIE. Quieres usar este ejemplo? (y | n): ");
    if(ans === "y"){
        const numberOfAppearances = problemSolver.createSopaDeLetrasBasedOnStringInput();
        console.log("Found :"+ numberOfAppearances + " times the word OIE.");
    }
    else{
        const ansFilas = await askQuestion("Has elegido proveer tu propia sopa de letras, ingresa el numero de Filas: ");
        const ansColumnas = await askQuestion("Ingresa el numero de columnas: ");
        const ansSopaDeLetras = await askQuestion("Ingresa la sopa de letras en el formato OIEIIXEXE: ");
        const ansPalabraABuscar = await askQuestion("Ingresa la palabra a buscar: ");

        const numberOfAppearances = problemSolver.createSopaDeLetrasBasedOnStringInput(ansFilas, ansColumnas, ansSopaDeLetras, ansPalabraABuscar);
        if(numberOfAppearances instanceof Error){
            console.log(numberOfAppearances.message);
        }
        else{
            console.log("Found :"+numberOfAppearances + " times the word: " + ansPalabraABuscar);
        }
    }
}

startQuestionary();

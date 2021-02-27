const { AssertionError } = require('assert');
const assert = require('assert');
var problemSolver = require("./problemSolver");

const sopasDeLetrasToTest = [
    { filas: 3, columnas: 3, sopaDeLetras: "OIEIIXEXE", Conteo: 3 },
    { filas: 1, columnas: 10, sopaDeLetras: "EIOIEIOEIO", Conteo: 4 },
    { filas: 5, columnas: 5, sopaDeLetras: "EAEAEAIIIAEIOIEAIIIAEAEAE", Conteo: 8 },
    { filas: 7, columnas: 2, sopaDeLetras: "OXIOEXIIOXIEEX", Conteo: 3 },
    { filas: 1, columnas: 1, sopaDeLetras: "e", Conteo: 0 }
]

describe("Testeo que todas las sopas de letras den el resultado esperado.", function() {
    it("Testeo los casos en el array. Y sus resultados esperados.", function() {
        sopasDeLetrasToTest.forEach(caso => {
            assert.equal((problemSolver.createSopaDeLetrasBasedOnStringInput(caso.filas, caso.columnas, caso.sopaDeLetras)), caso.Conteo);
        });
    });

    it("Testeo que me de error si la cantidad de filas multiplicada la cantidad de columnas no es igual a la cantidad de letras en la sopa", function() {
        assert(problemSolver.createSopaDeLetrasBasedOnStringInput(2, 3, "EOEO") instanceof Error);
    });

    it("Testeo que me de error si paso parametros incorrectos en fila o columna", function() {
        assert(problemSolver.createSopaDeLetrasBasedOnStringInput("E", "O", "EOEO") instanceof Error);
    });

    it("Testeo que me de error si paso una sopa de letras con menos de 1 letra", function() {
        assert(problemSolver.createSopaDeLetrasBasedOnStringInput(0, 0, "") instanceof Error);
    });
});
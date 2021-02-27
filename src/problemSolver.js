function createSopaDeLetrasBasedOnStringInput(filas = 3, columnas = 3, stringInput = "OIEIIXEXE", wordToFind = "OIE"){
    const f = parseInt(filas);
    const c = parseInt(columnas);
    const sopaDeLetras = [];
    
    if(stringInput.length !== f*c || !Number.isInteger(f + c) || !stringInput.length >= 1){
        return new Error("La cantidad de filas y columnas multiplicadas tiene que coincidir con la cantidad de letras en la sopa de letras, el minimo tamaño de la sopa de letras es 1.");
    }

    //construct the matrix
    for(let ci= 0; ci < c; ci++){
        sopaDeLetras[ci] = [];
        for(let fi = 0; fi < f; fi++){
            sopaDeLetras[ci].push(stringInput[(fi*c) + ci]); 
        }
    }
    const numberOfAppearances = findWordAndCount(wordToFind, sopaDeLetras, f, c);
    return numberOfAppearances;
}

function findWordAndCount(word, matrix, h, w){
    let counter = 0;
    const l = word.length;
    matrix.forEach((column, x) => {
        column.forEach((row, y) => {
            //only check the posible orientations from a position in the matrix if the given position is the starting point of the word we are searching
            if(row === word[0]){
                for(const orientation in checkOrientations){
                    if(checkOrientations[orientation](x, y, h, w, l) === true){
                        let posToMove = { x: x, y: y };
                        let lettersMatch = true;
                        for(let pos = 1; pos < word.length; pos++){
                            posToMove = orientationsMovements[orientation](posToMove.x , posToMove.y);
                            if(matrix[posToMove.x][posToMove.y] !== word[pos]){
                                lettersMatch = false;
                                break;
                            }
                        }
                        if(lettersMatch){
                            counter++;
                        }
                    }
                }
            }
        })
    });
    
    return counter;
}

//calculates the next square to check given starting point and an orientation
var orientationsMovements = {
    horizontal: function(x, y) { return { x: x + 1, y: y }; },
    horizontalBack: function(x, y) { return { x: x - 1, y: y }; },
    vertical: function(x, y) { return { x: x, y: y + 1 }; },
    verticalUp: function(x, y) { return { x: x, y: y - 1 }; },
    diagonal: function(x, y) { return { x: x + 1, y: y + 1 }; },
    diagonalBack: function(x, y) { return { x: x - 1, y: y + 1 }; },
    diagonalUp: function(x, y) { return { x: x + 1, y: y - 1 }; },
    diagonalUpBack: function(x, y) { return { x: x - 1, y: y - 1 }; }
};

var checkOrientations = {
    horizontal: function(x, y, h, w, l) { return w >= x + l; },
    horizontalBack: function(x, y, h, w, l) { return x + 1 >= l; },
    vertical: function(x, y, h, w, l) { return h >= y + l; },
    verticalUp: function(x, y, h, w, l) { return y + 1 >= l; },
    diagonal: function(x, y, h, w, l) { return (w >= x + l) && (h >= y + l); },
    diagonalBack: function(x, y, h, w, l) { return (x + 1 >= l) && (h >= y + l); },
    diagonalUp: function(x, y, h, w, l) { return (w >= x + l) && (y + 1 >= l); },
    diagonalUpBack: function(x, y, h, w, l) { return (x + 1 >= l) && (y + 1 >= l); }
};

module.exports = {
    createSopaDeLetrasBasedOnStringInput: createSopaDeLetrasBasedOnStringInput
}

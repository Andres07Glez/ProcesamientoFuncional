const { loadDataset, saveResults } = require('./io/fileManager');
const { computeStats } = require('./logic/stats');
const { transformText } = require('./logic/text');
const path = require('path');

//  CONSTANTES 
const DATASET_PATH = path.join(__dirname, '../data/dataset.csv');
const L = 15;          // Longitud fija definida
const PAD_CHAR = '*';  // Carácter de relleno

//  DEFINICIÓN DE COLUMNAS 
// NUM1: Price (Índice 4 en el CSV )
// NUM2: Quantity (Índice 5 en el CSV )
// TEXT: Item (Índice 3 en el CSV )

const main = () => {
    console.log("\t INICIO DEL PROGRAMA \n");

    // CARGA
    const rawLines = loadDataset(DATASET_PATH);
    const totalRows = rawLines.length;

    // MAPEO INICIAL (Raw String -> Objeto Potencial)
    // Usamos map con lambda
    const mappedData = rawLines.map(line => {
        const cols = line.split(','); 
        return {
            textRaw: cols[3], // Item
            num1Raw: cols[4], // Price
            num2Raw: cols[5]  // Quantity
        };
    });

    // FILTRADO (Validación)
    // Usamos filter con lambda
    const validData = mappedData.filter(row => {
        const isNum1Valid = !isNaN(parseFloat(row.num1Raw));
        const isNum2Valid = !isNaN(parseFloat(row.num2Raw));
        const isTextValid = row.textRaw && row.textRaw.trim().length > 0;

        return isNum1Valid && isNum2Valid && isTextValid;
    });

    const validCount = validData.length;
    const discardedCount = totalRows - validCount;

    console.log(`Total filas: ${totalRows}`);
    console.log(`Filas validas: ${validCount}`);
    console.log(`Filas descartadas: ${discardedCount}`);

    // PREPARACIÓN DE DATOS (Extracción con Map)
    // Convertimos a tipos finales para procesar
    const listNum1 = validData.map(r => parseFloat(r.num1Raw));
    const listNum2 = validData.map(r => parseFloat(r.num2Raw));
    const listText = validData.map(r => r.textRaw);

    // CALCULO ESTADISTICO (FP1)
    const statsNum1 = computeStats(listNum1);
    const statsNum2 = computeStats(listNum2);

    // TRANSFORMACION DE TEXTO (FP2)
    const transformedTexts = listText.map(t => transformText(t, L, PAD_CHAR));

    // Obtener n ejemplos para el reporte
    const examples = listText.slice(0, 10).map((original, i) => ({
        original: original,
        transformed: transformedTexts[i]
    }));

    // GENERAR SALIDA
    const resultObject = {
        dataset_info: {
            name: "Restaurant Business",
            columns: {
                NUM1: "Price",
                NUM2: "Quantity",
                TEXT: "Item"
            },
            params: { L, PAD_CHAR }
        },
        statistics: {
            NUM1_Price: statsNum1,
            NUM2_Quantity: statsNum2
        },
        text_transformation_examples: examples
    };

    // Imprimir estadisticas en consola
    console.log("\t ESTADÍSTICAS NUM1 (Price)");
    console.log(statsNum1);
    console.log("\t ESTADÍSTICAS NUM2 (Quantity)");
    console.log(statsNum2);

    // Guardar archivo final
    saveResults(resultObject, 'results.json');
};

// Ejecutar
main();
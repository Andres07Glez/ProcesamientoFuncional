const fs = require('fs');
const path = require('path');

// Cargar CSV y convertir a objetos crudos
const loadDataset = (filePath) => {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const lines = rawData.split('\n');
        
        // Asumimos que la primera línea es el header
        // Filtramos líneas vacías que puedan quedar al final del archivo
        return lines.slice(1).filter(line => line.trim() !== ''); 
    } catch (error) {
        console.error("Error leyendo el archivo:", error.message);
        return [];
    }
};

// Guardar resultados en JSON
const saveResults = (data, fileName) => {
    const outputPath = path.join(__dirname, '../../', fileName);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\nResultados guardados exitosamente en: ${fileName}`);
};

module.exports = { loadDataset, saveResults };
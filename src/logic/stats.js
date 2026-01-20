/**
 * @param {number[]} numbers - Lista de números validados.
 * @returns {Object} Objeto Stats.
 */
const computeStats = (numbers) => {
    if (numbers.length === 0) return null;

    // Suma (Usando reduce)
    const sum = numbers.reduce((acc, x) => acc + x, 0);

    // Promedio
    const mean = sum / numbers.length;

    //  Mínimo (Usando reduce)
    const min = numbers.reduce((acc, x) => (x < acc ? x : acc), numbers[0]);

    // Máximo (Usando reduce)
    const max = numbers.reduce((acc, x) => (x > acc ? x : acc), numbers[0]);

    // Mediana (Requiere ordenar una copia para no mutar el original)
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 
        ? sorted[mid] 
        : (sorted[mid - 1] + sorted[mid]) / 2;

    // Desviación Estándar (Reduce para sumar diferencias cuadradas)
    const variance = numbers.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / numbers.length;
    const std = Math.sqrt(variance);

    return {
        sum: Number(sum.toFixed(2)),
        mean: Number(mean.toFixed(2)),
        std: Number(std.toFixed(2)),
        median: Number(median.toFixed(2)),
        min: Number(min),
        max: Number(max)
    };
};

module.exports = { computeStats };
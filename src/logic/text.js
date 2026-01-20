/**
 * @param {string} text - Texto original.
 * @param {number} L - Longitud objetivo.
 * @param {string} PAD_CHAR - Carácter de relleno.
 * @returns {string} Texto transformado.
 */
const transformText = (text, L, PAD_CHAR) => {
    // Pipeline paso a paso:
    
    // Convertir a Mayúsculas
    let processed = text.toUpperCase();

    // Trim (inicio y fin)
    processed = processed.trim();

    // Colapsar espacios múltiples a uno solo (Regex)
    processed = processed.replace(/\s+/g, ' ');

    // Ajustar longitud fija
    if (processed.length > L) {
        // Recortar
        return processed.substring(0, L);
    } else if (processed.length < L) {
        // Rellenar (Padding al final)
        const padding = PAD_CHAR.repeat(L - processed.length);
        return processed + padding;
    }

    return processed;
};

module.exports = { transformText };
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directorioImagenes = path.join(__dirname, 'public');

function procesarDirectorio(directorio) {
    fs.readdirSync(directorio).forEach(archivo => {
        const rutaCompleta = path.join(directorio, archivo);
        const stat = fs.statSync(rutaCompleta);

        if (stat.isDirectory()) {
            procesarDirectorio(rutaCompleta);
        } else if (archivo.match(/\.(png|jpg|jpeg)$/i)) {
            const rutaSalida = rutaCompleta.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            sharp(rutaCompleta)
                .webp({ quality: 85 })
                .toFile(rutaSalida)
                .then(() => {
                    console.log(`Convertido: ${archivo} -> ${path.basename(rutaSalida)}`);

                    fs.unlinkSync(rutaCompleta);
                    console.log(`Eliminado: ${archivo}`);
                })
                .catch(err => {
                    console.error(`Error al procesar ${archivo}:`, err);
                });
        }
    });
}

console.log('Iniciando conversión y limpieza de imágenes...');
procesarDirectorio(directorioImagenes);
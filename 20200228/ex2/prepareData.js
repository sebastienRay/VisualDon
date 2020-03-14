import * as cards from "core-js";

const data = './data.json';


let filtered = data
    .map(d => ({ nom: d.name, nombre: d.positive_ratings }))
    .reduce((result, {nom, nombre}) => {
        const exist = result.find(d => d.nom === nom);
        if (Boolean(exist)) {
            const nouveauNombre = exist.nombre + nombre;
            return [
                ...result.filter(d => d.nom !== nom),
                { nom, nombre: nouveauNombre }
            ]
        }
        return [...result, {nom, nombre}]
    }, []);


console.log(JSON.stringify(result, null, 2));
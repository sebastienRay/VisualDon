

**D'où viennent les données (où, qui, pourquoi...)**

https://console.cloud.google.com/marketplace/details/noaa-public/noaa-earthquakes?filter=solution-type%3Adataset&id=5caa0e7e-a125-489f-afe2-480f51c77ed8

Cette base de donnée regroupe les tremblements de terre significatif depuis -2150, c'est à dire qui respecte un ou plusieurs des critères suivant:

1. Plus d'un million de $ de dommage
2. 10 morts ou plus
3. Magnitude de 7,5 ou plus
4. Le tremblement à générer un tsunami

Ces données ont été publié sur la plateforme cloud de google par la NOAA([National Center For Environmental Information](https://data.nodc.noaa.gov/cgi-bin/iso?id=gov.noaa.ngdc.mgg.hazards:G012153)) 

L'objectif de ce projet et de montré de façon interactive l'historique des tremblements de terre à travers le monde.

**Comment elles ont été transformées**

Fichier de base téléchargée en csv, puis transformée en JSON.

J'ai également utilisé un fichier fixData.js

```
const result = data.map(({ year, eq_primary, latitude, longitude }) => ({
  year: Number(year),
  eq_primary: Number(eq_primary),
  latitude: Number(latitude),
  longitude: Number(longitude),
}))
```

Afin de transformer les données en nombre.

**Un lien vers le code source de votre visualisation**

https://github.com/sebastienRay/VisualDon/tree/master/projet/earthquake

**Un lien vers votre visualisation publiée**

http://raydatavis.surge.sh/

**Quel scripte je dois utiliser pour recréer le site à partir de votre code**
npm run watch

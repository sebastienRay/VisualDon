**Expliquez à quoi sert le format `topojson` et en quoi il diffère du format `geojson`.**

Le format topo json, comme le format geojson sert a représenter des données géographique.

Afin de reduire la taille/poid du fichier, au lieux de contenir une serie de point, le fichier contient un ensemble d'arcs. Donc en gros c'est plus léger pasque les points sont "merge" dans des ensembles d'arc.
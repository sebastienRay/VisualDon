**Expliquez ce que font chacune des 4 fonctions `turf` utilisées dans l'exemple avec les bars autour de la HEIG.**

*Circle*: Créé un cercle définit par des coordonnées, un rayon et son unité. 

*bbox*: La bounding box créé une boite qui limite une zone géographique définie par un tableau:

- la longitude minimum
- la latitude minimum
- la longitude maximum
- la latitude minimum

*bboxPolygon*: nous permet de transformer notre bbox en polygone geojson

*distance*: permet de retourner la distance entre deux point dans une certaine unité
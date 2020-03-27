1. **Comment et pourquoi le code est t-il divisé en plusieurs fichier?**
   1. on sépare les différents éléments du graphique(scale, index) afin d'eviter de mélanger le code.
2. **Comment le nom du pays est t-il afficher quand la souris passe sur une bulle?**
   1. on utilise l'event mouseover pour créer un texte qui se trouve juste sur la souris avec le nom du pays. Pour cela on a besoin de trouver la souris dans le svg et on utilise une fonction de d3, mouse.


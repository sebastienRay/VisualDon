J'ai mis le bail dans le folder: 20200403

J'ai simplement utilisé les datas déjà extraites du jeu de donnée. J'ai fais cette requête:

#standardSQL
SELECT 
  latitude
  ,longitude
FROM `bigquery-public-data.noaa_significant_earthquakes.earthquakes`
ORDER BY year
LIMIT 10

donc c'est les 10 plus vieux séismes de tous les temps qui sont représenté sur la carte!!!! trop stylé
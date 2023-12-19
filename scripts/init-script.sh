#!/bin/bash
echo "********** Importation des données **********"
# Exécutez mongoimport
mongorestore --uri="mongodb://127.0.0.1:27017" --drop /data/sauvegarde
echo "********** Importation des données terminée **********" 
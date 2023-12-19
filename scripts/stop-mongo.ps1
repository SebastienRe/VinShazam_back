# remove-and-export.ps1
param (
    [string]$containerName
)





# Run the mongoexport command
docker exec $containerName mongodump --uri="mongodb://127.0.0.1:27017" --db shazamVin --out="/data/sauvegarde"
docker cp ${containerName}:/data/sauvegarde C:\projets\urbanisation\VinShazam_back\data
# Stop and remove the container
docker stop $containerName
docker rm $containerName
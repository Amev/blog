# blog

Essaie de creation de blog en React.js avec Flux/Fluxible pour le front, Socket.io pour les requêtes, Node.js / Express côté serveur et OrientDB pour la database.

Le projet tourne sous node.js (0.12.7) mais contient également des scripts (DockerFile et dockerCMDBlog.sh) pour être lancé depuis Docker.
Pour fonctionner le blog nécessite une base de données OrientDB fonctionnelle ainsi qu'un dossier config a la racine du projet contenant les fichiers suivants (adapter les fichiers selon les besoins):

/my/path/to/blog/config/configServer.json

```json
{
  "port": 3000,
  "serviceURL": "http://localhost:3000/",
  "medias": "/my/path/to/blog/medias/",
  "tokenSecret": "mySuperTokenSecret"
}
```

/my/path/to/blog/config/configDB.json

```json
{
	"host": "localhost",
	"port": 2424,
	"username": "root",
	"password": "root",
	"dbName": "myDbName"
}
```

Une fois les fichiers créés, pour mettre le serveur en route (sans Docker), run:

```
npm install
gulp
npm start
```

Ou (avec Docker):

```
docker build -t my-node-blog ./scripts/`
sh ./scripts/dockerCMDBlog.sh
```

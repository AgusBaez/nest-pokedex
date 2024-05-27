<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecute in Development mode

1. Clone this repository

2. Use comand for donwload package:
```
npm i
```

3. Install nest CLI:
```
npm i -g @nestjs/cli
```

4. Up database:
```
docker-compose up -d
```

5. CLone the archive __.env.template__ and rename to __env__

6. Complet data in .env

7. jecute the aplication whit the command :
```
npm run start:dev
```

8. Rebuild database whit seed:
```
http://localhost:3000/api/v2/seed
```

## Stack used in this proyect
 * MongoDB - Moongose - MongoAtlas.
 * Nest.
 * Typescript.
 *Joi
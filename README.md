---

RUN DOCKER CONTAINER:

RUN "docker compose up" to open the server and start using the api

update attribute "command" from docker-compose.yml to "npm run test" to run a mocha + chai-http test of the http requests

import g2i-api.postman.json file on postman to start testing the api.

---

REQUIREMENTS: (if you are not using docker)

RUN A LOCAL MONGODB SERVER AND ADD THE SERVER ROUTE INTO THE /.env ROUTE 'MONGO_DB_URI' ATTRIBUTE.

RUN 'npm run test' TO START THE MOCHA + CHAI-HTTP REQUEST TESTING FILE (LOCATED IN TESTS FOLDER).

RUN 'npm run start' TO START THE NODEJS SERVER.

USE THE FOLLOWING API KEY TO GET FULL EDIT AUTHORIZATION: 1f33d889-5f3e-4ca1-a1f5-42165edf6c7f

---

INSTRUCTIONS:

USE THIS API CALLING:

GET: LOCALHOST:localhost:3000/acronym?from='FROM_VARIABLE'&limit='LIMIT_VARIABLE'&search='SEARCH_VARIABLE'

POST: localhost:3000/acronym?key='KEY_VARIABLE'&value='VALUE_VARIABLE'

PUT: localhost:3000/acronym?key='KEY_VARIABLE'&value='VALUE_VARIABLE'

DELETE: localhost:3000/acronym?id='ID_VARIABLE'

IMPORTANT:
Api key must be included in the header, but not the query params.

---

NOTES:


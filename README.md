In the server folder install node_modules - "npm install" then
create .env file in server folder and add
DATABASE_URL=
"mysql://root:password@localhost:3306/ibm"

database user pass port databseName

PLATE_RECOGNIZER_TOKEN = "Token b52d5f066ed36e2b5738a3acce666d9df869650f"
then run command in server folder "npx prisma migrate dev --name test" and "npx prisma generate" and after that run "npm run build" to run server

In the front folder install node_module with "npm install" and run with "npm start";

In sql folder you will find all database tables with inserts.

To insert photo just click on button "CHOOSE FILES" and add photo with vehicle plate.

To change price on table need write price and press enter after that if you realy want change price press "OK" else "CANCEL";

I am very sorry, but everything could not be done.

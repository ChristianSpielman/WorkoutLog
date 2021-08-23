require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

// app.use(require("./middleware/validate-jwt"));
app.use("/journal", controllers.workoutLogController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

// app.listen(4000, () => {
//     console.log(`[Server]: App is listening on 4000.`);
// });
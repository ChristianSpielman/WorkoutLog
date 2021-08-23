const Express = require('express');
const EagerLoadingError = require('sequelize/lib/errors/eager-loading-error');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
// Import Log Model
const { LogModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey! This is a practice route!')
});

/* Log Create*/
router.post('/create', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description, 
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)

});
router.get('/about', (req, res) => {
    res.send('This is the about route!');
})

/* Get all Logs */
router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* Get Journals by User*/
router.get("/mine", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userLog = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* Get log by title */
router.get("/:description", async (req, res) => {
    const { description } = req.params;
    try {
        const results = await LogModel.findAll({
            where: { description: description }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/* Update a Journal */
router.put('/update/entryId', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner: userId
        }
    };

    const updateLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await LogModel.update(updateLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

/* Delete a Journal */
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try{
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed "});
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;
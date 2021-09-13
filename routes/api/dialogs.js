const express = require('express');
const Dialog = require('../../models/Dialog');
const auth = require('../../middleware/auth');

const router = express.Router();

// ROUTE:   GET api/dialogs/:id
// ACCESS:  Private
// DESC:    Get dialog data
router.get('/:id', auth, (req, res) => {
    
    const dialogId = req.params.id;
    
    Dialog.findById(dialogId)
    .then(dialog => {
        res.json(dialog);
    });

});

module.exports = router;
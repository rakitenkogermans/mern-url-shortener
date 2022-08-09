const {Router} = require('express');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = process.env.BASE_URL;
        const { from } = req.body;

        const code = shortid.generate();
        const exists = await Link.findOne({ from });

        if (exists) {
            return res.json({ link: exists });
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        });
        await link.save();

        res.status(201).json({ link });

    } catch {
        res.status(500).json({ message: 'Something went wrong. Please try again later.'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch {
        res.status(500).json({ message: 'Something went wrong. Please try again later.'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch {
        res.status(500).json({ message: 'Something went wrong. Please try again later.'});
    }
})

module.exports = router;

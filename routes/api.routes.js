const { Router } = require('express');
const Lead = require('../models/lead');
const router = Router();

router.get('/leads', async (req, res) => {
    const leads = await Lead.find();

    res.json(leads)
})


router.post('/leads/create', async (req, res) => {
    const lead = new Lead(req.body);

    await lead.save();

    res.json(lead);
});


router.put('/leads/:id', async (req, res) => {
    const id = req.params.id;

    const lead = await Lead.findByIdAndUpdate(id, req.body);

    res.json(lead);
});


router.delete('/leads/:id', async (req, res) => {
    const id = req.params.id;

    await Lead.findByIdAndRemove(id);

    const leads = await Lead.find();

    res.json(leads);
})


router.get('/leads/:id', async (req, res) => {
    const id = req.params.id;

    const lead = await Lead.findById(id);

    res.json(lead);
})


module.exports = router;

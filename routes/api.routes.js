const { Router } = require('express');
const Lead = require('../models/lead');
const Deal = require('../models/deal');
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


//Deals

router.post('/deals/create', async (req, res) => {
    const deal = new Deal(req.body);

    await deal.save();

    res.json(deal);
});

router.get('/deals', async (req, res) => {
    const deals = await Deal.find();

    res.json(deals)
})

router.get('/deals/:id', async (req, res) => {
    const id = req.params.id;

    const deals = await Deal.findById(id);

    res.json(deals);
})

router.put('/deals/:id', async (req, res) => {
    const id = req.params.id;

    const deal = await Deal.findByIdAndUpdate(id, req.body);

    res.json(deal);
});


router.delete('/deals/:id', async (req, res) => {
    const id = req.params.id;

    await Deal.findByIdAndRemove(id);

    const deals = await Deal.find();

    res.json(deals);
})

module.exports = router;

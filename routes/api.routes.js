const { Router } = require('express');
const Lead = require('../models/lead');
const Deal = require('../models/deal');
const Transaction = require('../models/transaction');
const { getTransactions } = require('../rest-controllers/transaction');
const { getLead, createLead, changeLead, deleteLead, getLeads } = require('../rest-controllers/leads');
const router = Router();

router.get('/leads', getLeads);
router.post('/leads/create', createLead);
router.put('/leads/:id', changeLead);
router.delete('/leads/:id', deleteLead);
router.get('/leads/:id', getLead);

//Deals
router.post('/deals/create', async (req, res) => {
    const deal = new Deal(req.body);

    await deal.save();

    const transaction = new Transaction({
        name: `Создание сделки от ${deal.createdAt}`,
        objectId: deal._id,
        authorId: req.body.author
    });

    await transaction.save();

    console.log(deal, transaction);

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
router.get('/deals/:id/transaction', async (req, res) => {
    const id = req.params.id;

    const transactions = await Transaction.find({ objectId: id });

    res.json(transactions);
})
router.put('/deals/:id', async (req, res) => {
    const id = req.params.id,
        prevVersion = await Deal.findById(id),
        checkUpdateFields = ['status', 'name', 'phone'],
        changedFields = [];

    checkUpdateFields.forEach(key => {
        if (String(req.body[key]) !== String(prevVersion._doc[key])) {
            changedFields.push({
                field: key,
                before: prevVersion._doc[key],
                after: req.body[key]
            });
        };
    });

    const deal = await Deal.findByIdAndUpdate(id, req.body);

    const transaction = new Transaction({
        name: `Редактирование сделки`,
        objectId: id,
        authorId: req.body.author,
        changed: {
            type: 'edit',
            fields: changedFields
        }
    });

    await transaction.save();

    res.json(deal);
});
router.delete('/deals/:id', async (req, res) => {
    const id = req.params.id;

    await Deal.findByIdAndRemove(id);

    const deals = await Deal.find();

    res.json(deals);
})

//transactions
router.get('/transactions', getTransactions)

module.exports = router;

const express = require('express');
const { connect } = require('mongoose');
const router = require('./routes/api.routes');
const routerAuth = require('./routes/api-auth.routes');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }))
app.use('/api', router);
app.use('/api/auth', routerAuth);

async function start() {
    try {
        await connect('mongodb+srv://root:f7QOms6zJfhlwhE9@cluster0.mvgul.mongodb.net/mern?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

    } catch (e) {
        console.log('Server error', e.message);
    }
}

start();

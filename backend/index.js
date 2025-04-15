const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.put('/numbers/:type', (req, res) => {
    const { type } = req.params;

    switch (type[0]) {
        case 'p': {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            const result = primes.slice(0, 3).sort((a, b) => a - b);
            return res.json({ numbers:primes });
        }
        case 'e': {
            const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
            const result = evens.slice(0, 3).sort((a, b) => a - b);
            return res.json({ numbers:evens });
        }
        case 'f': {
            const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
            const result = fibonacci.slice(0, 3).sort((a, b) => a - b);
            return res.json({ numbers:fibonacci });
        }
        case 'r': {
            const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
            const result = randomNumbers.sort((a, b) => a - b);
            return res.json({ numbers:randomNumbers });
        }
        default:
            return res.status(400).json({ error: 'Invalid type parameter' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
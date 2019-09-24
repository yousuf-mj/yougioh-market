const fs = require('fs');

interface EnvConfig {
    ygoDeck: ygoDeck;
    ebay: ebay;
}

interface ygoDeck {
    url: string;
}

interface ebay {
    apiKey: string;
}

const Env: EnvConfig = JSON.parse(fs.readFileSync('./env.json'));

export default Env;

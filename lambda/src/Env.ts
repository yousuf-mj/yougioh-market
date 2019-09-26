const fs = require('fs');

interface EnvConfig {
    ygoEndpoint: string;
    ebayApi: string;
    mysqlHost: string;
    mysqlPort: number;
    mysqlDb: string;
    mysqlUsername: string;
    mysqlPassword: string;
}

const Env: EnvConfig = JSON.parse(fs.readFileSync('./env.json'));

export default Env;

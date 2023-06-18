import { config as _config } from 'dotenv';
import { existsSync } from 'node:fs';
import { readFileSync, writeFileSync } from 'fs';
_config();

import { TopicCreateTransaction } from "@hashgraph/sdk";

// const ACCOUNT_ID = process.env.ACCOUNT_ID;
// const DER_ENCODED_PRIVATE_KEY = process.env.DER_ENCODED_PRIVATE_KEY;
// const client = Client.forTestnet().setOperator(ACCOUNT_ID, DER_ENCODED_PRIVATE_KEY);


async function createTopic(name,client) {
    console.log();
    let config = {};
    let txResponse = await new TopicCreateTransaction().execute(client);
    let receipt = await txResponse.getReceipt(client);
    let topicId = receipt.topicId;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (existsSync(process.cwd()+'\\hcs\\topicIDs\\config.JSON')) {
        config = JSON.parse(readFileSync(process.cwd()+'\\hcs\\topicIDs\\config.JSON'));
    }
    config[name] = `${topicId}`;
    config = JSON.stringify(config);
    writeFileSync(process.cwd()+'\\hcs\\topicIDs\\config.JSON', config);
}

export default createTopic;

// example call
// async function call(){
//     await createTopic("Alpha");
//     await createTopic("Beta");
//     client.close();
// }
// call();
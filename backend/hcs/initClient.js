import {Client} from '@hashgraph/sdk';
function initClient(){
    const ACCOUNT_ID = process.env.ACCOUNT_ID;
    const DER_ENCODED_PRIVATE_KEY = process.env.DER_ENCODED_PRIVATE_KEY;
    const client = Client.forTestnet().setOperator(ACCOUNT_ID, DER_ENCODED_PRIVATE_KEY);
    return client;
}

export default initClient;
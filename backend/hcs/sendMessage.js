import dotenv from "dotenv";

import { TopicMessageQuery, TopicMessageSubmitTransaction } from '@hashgraph/sdk';
dotenv.config();
// const ACCOUNT_ID = process.env.ACCOUNT_ID;
// const DER_ENCODED_PRIVATE_KEY = process.env.DER_ENCODED_PRIVATE_KEY;

// const client = Client.forTestnet().setOperator(ACCOUNT_ID, DER_ENCODED_PRIVATE_KEY);

async function sendMessage(body, topicID, client){
    let conn = new TopicMessageQuery().setTopicId(topicID)
    .subscribe(client, (message) => {
        console.log("document received at: " + message.consensusTimestamp.toDate());
    })

    let sendResponse = await new TopicMessageSubmitTransaction(
        {
            topicId : topicID,
            message: JSON.stringify(body),
        }
    ).execute(client);
    const getReceipt = await sendResponse.getReceipt(client);
    console.log("Submitted : " + new Date());
    conn.unsubscribe();
}

export default sendMessage;
// testing code

import topicCreate from './topicCreation.js';
import sendMessage from './sendMessage.js';
import getTopicId from './getTopicID.js';
import initClient from './initClient.js';

let client = initClient();


let call = async () => {
    await sendMessage("Hello Alpha!",getTopicId("investigation"),client);
    await sendMessage("Hello Beta!",getTopicId("sports"),client);
    await sendMessage("Hello Gamma!", getTopicId("elections"),client);

    client.close();
}
call();
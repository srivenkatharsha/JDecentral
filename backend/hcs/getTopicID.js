import { existsSync } from 'node:fs';
import { readFileSync } from 'fs';

function getTopicID(name){
    let config = {};
    if(existsSync(process.cwd()+'\\hcs\\topicIDs\\config.JSON')){
        config = JSON.parse(readFileSync(process.cwd()+'\\hcs\\topicIDs\\config.JSON'));
        return String(config[name]);
    }
    return "-1";
}

export default getTopicID;
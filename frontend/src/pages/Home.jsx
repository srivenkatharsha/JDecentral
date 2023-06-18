import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import NewsCard from '../components/NewsCard.jsx';
import Navbar from "../components/Navbar.jsx";
import axios from 'axios';
import { useEffect, useState } from "react";
import {checkUser} from "../utils/management.js"

const Home = () => {
    
    const [topicName, setTopicName] = useState("general");
    const [currentPageNumber, setcurrentPageNumber] = useState(0);
    const [length, setLength] = useState(0);
    // pageData is an Array of objects (objects contain headline, thumbnail image)
    const [pageData, setPageData] = useState([]);

    const handleTopicChange = e => {
        setTopicName(e.target.value);
        setcurrentPageNumber(0);
        setPageData([]);
    }

    useEffect(
        () => {
            async function fetchData(){
              if(!await checkUser()){
                window.location.href = "http://localhost:5173/login";
              } 
                // backend route for getting topicName
                const baseUrl = "http://localhost:3000/topicID";
                // object to be posted
                const obj = {"topicName" : topicName};
                const responseOfTopicName = await axios.post(baseUrl, obj);
                const data = await responseOfTopicName.data;
                const topic_id = data['topicID'];
                // getting all the messages present in the topic
                const responseOfMessages = await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/topics/${topic_id}/messages/`);
                const messagesData = await responseOfMessages.data;
                const messages = messagesData['messages'];
                setLength(messages.length);
                const elementsOfThePage = messages.slice(currentPageNumber * 6, (currentPageNumber * 6) + 6);
                let newElemets = elementsOfThePage.map(
                    element => {
                        const content = JSON.parse(Buffer.from(element.message, 'base64'));
                        const headline = content['headLine'];
                        const thumbnailImage = content['thumbnailImage'];
                        return {
                            topicName : topicName,
                            headLine : headline,
                            thumbnailImage : thumbnailImage,
                            consensus_timestamp : element['consensus_timestamp'],
                            sequence_number : element['sequence_number']
                        }
                    }
                )
                setPageData(
                    [...newElemets]
                );
            }
            fetchData();
        }, [currentPageNumber, topicName]
    );

    return (
        <div className="w-full h-full bg-white">
          <Navbar />
          <div className="pt-28 pb-10 mx-auto w-4/5">
            <InputLabel id="selector">Category</InputLabel>
            <Select variant="standard" labelId="selector" value={topicName} onChange={handleTopicChange}>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="gaming">Gaming</MenuItem>
              <MenuItem value="weather">Weather</MenuItem>
              <MenuItem value="national">National</MenuItem>
              <MenuItem value="local">Local</MenuItem>
            </Select>
            {pageData.length !== 0 ? (
              <div className="w-4/5 mt-10 grid grid-cols-3 gap-16 mx-auto pb-15">
                {pageData.map(entry => (
                  <NewsCard
                    key={entry['consensus_timestamp']}
                    topicName={entry['topicName']}
                    headLine={entry['headLine']}
                    src={entry['thumbnailImage']}
                    sequence_number={entry['sequence_number']}
                  />
                ))}
              </div>
            ) : (
              <p className="my-20">No content available. Refresh the page!</p>
            )}
            <div className="flex flex-row justify-center align-center py-10">
              <Button disabled={currentPageNumber === 0} onClick={() => setcurrentPageNumber(currentPageNumber - 1)}>
                &#60; Previous
              </Button>
              <p className="mx-10 my-auto">Page {length===0 ? 0 : currentPageNumber + 1} / {Math.ceil(length/6)}</p>
              <Button disabled={length - (currentPageNumber) * 6 <= 6} onClick={() => setcurrentPageNumber(currentPageNumber + 1)}>
                Next &#62;
              </Button>
            </div>
          </div>
        </div>
      )
}

export default Home;
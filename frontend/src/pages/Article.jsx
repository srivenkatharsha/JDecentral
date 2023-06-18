import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import axios from 'axios';
import { marked } from 'marked';
import { Buffer } from 'buffer';
import { useState, useEffect } from 'react';
import {checkUser} from "../utils/management.js"
import { useNavigate } from 'react-router-dom';

// @ts-ignore
window.Buffer = Buffer;

const Article = () => {
  const navigate = useNavigate();
  const { topic_name, sequence_number } = useParams("");
  const [headLine, setHeadLine] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [article_content, setArticleContent] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");

  useEffect(() => {
    async function fetchContent() {
      if(!await checkUser()){
        navigate("/login");
      } 
      try {
        const baseUrl = "http://localhost:3000/topicID";
        const obj = { "topicName": topic_name };
        const response = await axios.post(baseUrl, obj);
        const data = response.data;
        const topic_id = data['topicID'];

        const url = `https://testnet.mirrornode.hedera.com/api/v1/topics/${topic_id}/messages/${sequence_number}`;
        const response2 = await axios.get(url);
        const body = response2.data;
        const content = JSON.parse(Buffer.from(body["message"], 'base64'));
        setHeadLine(content['headLine']);
        setAuthor(content['userName']);
        setDate(content['date']);
        setArticleContent(marked.parse(content['content']));
        setThumbnailImage(content['thumbnailImage']);
      } catch (error) {
        console.error(error);
      }
    }

    fetchContent();
  }, [topic_name, sequence_number]);

  return (
    <>
      <Navbar />
      <div className='w-full h-full'>
        <div className='container mx-auto w-4/5'>
          <p className='text-4xl pt-24'>{headLine}</p>
          <div className='flex flex-row max-md:flex-col justify-between my-10'>
            <p className='italic'>Author: {author}</p>
            <p className='italic'>Date: {date}</p>
          </div>
          <img src={thumbnailImage} className='max-h-100 mx-auto rounded-lg' />
          <h1 className='my-14 pb-14' dangerouslySetInnerHTML={{ __html: article_content }} />
        </div>
      </div>
    </>
  );
};

export default Article;

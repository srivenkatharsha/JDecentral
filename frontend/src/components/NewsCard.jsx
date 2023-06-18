import { Card, CardMedia, CardContent} from "@mui/material";
import {Link} from "react-router-dom";

const NewsCard = ({topicName, src, headLine, sequence_number=0}) => {
  return (
    <div>
    <Card sx={{ maxWidth: 345, borderRadius: 5}}>
      <Link to={`/article/${topicName}/${sequence_number}`}>
        <CardMedia
          component="img"
          height="120"
          image={src}
          alt={headLine}
        />
        <CardContent>
          <p className="block text-lg text-black">
            {headLine}
          </p>
        </CardContent>
      </Link>
    </Card>
    </div>
  )
}

export default NewsCard;
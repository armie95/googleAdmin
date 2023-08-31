import "./mediacard.css";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material"; 

function MediaApp({company,img,price,name}) {
  

  return (       
            <Card sx={{ maxWidth: 250 }} key={name}>
              <CardMedia
                sx={{ height: 220 }}
                image={img}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {company}
                  Ceramic Shield front Glass back and aluminum design
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large">Buy Now ${price}</Button>
              </CardActions>
            </Card>
  );
}

export default MediaApp;

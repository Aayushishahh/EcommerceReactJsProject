import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Toolbar } from "@mui/material";
import { ICONS } from "../assests";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MediaCard(props) {
  const [data, setData] = useState("");
  const [cart, setCart] = useState("");

  const navigate = useNavigate();

  const { title, image, label, price, id, details, item } = props?.step;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setData(props?.step);
  }, []);

  const handleClick = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  return (
    <>
      <Toolbar />
      <Card
        maxWidth="false"
        sx={{
          boxShadow: "41px 5px 39px 0px rgba(0,0,0,0.1);",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          onClick={() => navigate(`/productdetails/${id}`, { state: { data } })}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <IconButton onClick={handleClick}>
              {isFavorite ? (
                <ICONS.favourite sx={{ color: "red" }} />
              ) : (
                <ICONS.favouriteborder sx={{ color: "black" }} />
              )}
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            endIcon={<ICONS.shoppingcart />}
            onClick={() =>
              navigate(`/productdetails/${id}`, { state: { data } })
            }
          >
            Buy
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

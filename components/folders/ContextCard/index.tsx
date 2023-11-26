import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ContextCard = () => {
  return (
    <Card elevation={1}>
      <CardContent sx={{ padding: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Contexte
        </Typography>
        <Typography variant="body2" fontWeight="bold" mb={3}>
          Nunc maximus, mi vitae elementum laoreet, dolor erat viverra velit,
          sed euismod arcu sapien non nunc. Duis venenatis eros sed sapien
          egestas, id convallis ante mollis. Proin interdum quam velit, in
          suscipit ipsum faucibus sit amet. Pellentesque luctus fringilla augue
          sed sollicitudin. Phasellus aliquam quam sit amet diam elementum
          ultrices. Nam sit amet augue id neque commodo rutrum sit amet ut
          lorem.
        </Typography>
        <Typography variant="body2" fontWeight="light">
          Nunc maximus, mi vitae elementum laoreet, dolor erat viverra velit,
          sed euismod arcu sapien non nunc. Duis venenatis eros sed sapien
          egestas, id convallis ante mollis. Proin interdum quam velit, in
          suscipit ipsum faucibus sit amet. Pellentesque luctus fringilla augue
          sed sollicitudin. Phasellus aliquam quam sit amet diam elementum
          ultrices. Nam sit amet augue id neque commodo rutrum sit amet ut
          lorem.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContextCard;

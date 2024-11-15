import { Box, Typography } from "@mui/material";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        width: '100%',
        marginTop: '20px',
      }}
    >
      <Typography variant="button">
        ® All rights reserved
      </Typography>
    </Box>
  )
}


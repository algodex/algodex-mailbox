import Typography from "@mui/material/Typography";
import React from "react";
import { colors } from "theme";

const ErrorMessage = ({ success, message }) => {
  return (
    <Typography
      variant="p"
      fontSize={"1.125rem"}
      fontWeight="700"
      fontStyle="italic"
      color={success ? "status.success" : "status.error"}
    >
      {message}
    </Typography>
  );
};

export default ErrorMessage;

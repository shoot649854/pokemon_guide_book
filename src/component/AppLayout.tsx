import { useEffect } from "react";
import { Box } from "@mui/material";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import { PokeCard } from "../page/PokeApp";

const AppLayout = () => {
  
  return (
    <Box
      sx={{
        backgroundColor: "#F4F1F1",
        maxHeight: "100vh",
        margin: "0 auto",
        "@media (max-width: 800px)": {
          minWidth: "960px"
        }
      }}
    >
        {/* Header */}
      <Box sx={{ margin: "0 80px", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;

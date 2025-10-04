import React, { useState } from "react";
import { Modal, IconButton, Box, Typography, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif, Title = "Coming Soon", Issuer, Date }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Thumbnail */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          "&:hover": { transform: "translateY(-5px)", "& .overlay": { opacity: 1 } },
        }}
      >
        {ImgSertif ? (
          <img
            src={ImgSertif}
            alt={Title}
            style={{ width: "100%", height: "auto", display: "block", cursor: "pointer" }}
            onClick={handleOpen}
          />
        ) : (
          <Box
            sx={{
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bg: "linear-gradient(135deg, #6366f1, #a855f7)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
            onClick={handleOpen}
          >
            Coming Soon
          </Box>
        )}

        {/* Hover overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <FullscreenIcon sx={{ color: "white", fontSize: 40 }} />
        </Box>
      </Box>

      {/* Info */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" color="white">{Title}</Typography>
        {Issuer && <Typography variant="body2" color="gray">{Issuer}</Typography>}
        {Date && <Typography variant="caption" color="gray">{Date}</Typography>}
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, sx: { backgroundColor: "rgba(0,0,0,0.9)" } }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", outline: "none" }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {ImgSertif ? (
            <img src={ImgSertif} alt={Title} style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain" }} />
          ) : (
            <Box
              sx={{
                width: 500,
                height: 350,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "linear-gradient(135deg, #6366f1, #a855f7)",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Coming Soon
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;


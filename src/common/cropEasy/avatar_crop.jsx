import { Avatar, Box } from "@mui/material";
import { UserContext } from "App";
import { useContext, useRef, useState } from "react";
import CropEasy from "./components/cropEasy";
import UpdateBadge from "./components/updateBadge";

function AvatarCrop({ file, setFile }) {
  const { user } = useContext(UserContext);
  const inputRef = useRef(null);

  const [photoURL, setPhotoURL] = useState(
    `data:image/jpeg;base64,${user?.fotoConv}`
  );
  const [openCrop, setOpenCrop] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return !openCrop ? (
    <>
      <input
        accept="image/*"
        id="profilePhoto"
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <UpdateBadge onClick={handleClick}>
          <Avatar
            src={photoURL}
            sx={{
              width: 250,
              height: 250,
              cursor: "pointer",
            }}
            onClick={() => setOpenCrop(true)}
          />
        </UpdateBadge>
      </Box>
    </>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
}

export default AvatarCrop;

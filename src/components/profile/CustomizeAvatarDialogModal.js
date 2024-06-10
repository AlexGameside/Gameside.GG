import { Grid, Typography } from "@mui/material";
import Avatar, { Piece } from "avataaars";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../context/NewStoreContext";
import DialogModal from "../../custom_components/DialogModal";
import createTheme from "../../utils/theme";
import useDraggableScroll from "use-draggable-scroll";
import NewCustomIconButton from "../../custom_components/NewCustomIconButton";
import { FaRandom } from "react-icons/fa";
import { generateRandomAvatarOptions } from "../../utils/generateRandomAvatarOptions";
import BadgeHover from "../match/components/badges/BadgeHover";
import { configs } from "../../utils/avatarConfig";
import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
import { setAvatar } from "../../utils/API";
import useAxios from "../../utils/useAxios";
import { ColorLens } from "@mui/icons-material";

const AvatarTypeButton = (props) => {
  const { label, onClick, selected } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid
      item
      sx={{
        borderRadius: 10,
        padding: 1,
        backgroundColor: selected ? theme.primary() : theme.iconBackground(),
        "&:hover": {
          cursor: "pointer",
          backgroundColor: selected
            ? theme.primary()
            : theme.iconBackground(true),
        },
      }}
      onClick={onClick}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Typography
          sx={{ fontSize: 11, color: theme.text(), fontWeight: 600 }}
          noWrap
        >
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};

const AvatarPieceContainer = (props) => {
  const { children, label, onClick, selected } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  const [hovered, setHovered] = useState(false);

  return (
    <Grid
      item
      sx={{
        padding: 1,
        borderRadius: 2,
        backgroundColor: theme.offWhite(),
        maxHeight: 70,
        maxWidth: 70,
        position: "relative",
        border: selected ? `4px solid ${theme.primary()}` : null,
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={{ xs: 1 }}
      >
        <Grid
          item
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? <BadgeHover label={label} /> : null}
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

const AvatarColorBox = (props) => {
  const { color } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid item sx={{ width: 50, height: 50, backgroundColor: color }}></Grid>
  );
};

const CustomizeAvatarDialogModal = (props) => {
  // variables
  const { onClose, open } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const avatarCopy = { ...store?.user?.avatar[0] };
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const api = useAxios();
  const dispatch = useContext(StoreDispatch);

  // state
  const [currentOptions, setCurrentOptions] = useState(avatarCopy);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [selected, setSelected] = useState("skin");
  const [saveLoading, setSaveLoading] = useState(false);

  // avatar type states
  const [skinOption, setSkinOption] = useState(null);
  const [topType, setTopType] = useState(null);
  const [hairColor, setHairColor] = useState(null);
  const [topColor, setTopColor] = useState(null);
  const [eyeType, setEyeType] = useState(null);
  const [eyebrowType, setEyebrowType] = useState(null);
  const [mouthType, setMouthType] = useState(null);
  const [facialHairType, setFacialHairType] = useState(null);
  const [facialHairColor, setFacialHairColor] = useState(null);
  const [clotheType, setClotheType] = useState(null);
  const [clotheColor, setClotheColor] = useState(null);
  const [graphicType, setGraphicType] = useState(null);
  const [accessoryType, setAccessoryType] = useState(null);

  // methods
  const handleClose = () => {
    setCurrentOptions(avatarCopy);
    setSelected("skin");
    setSaveDisabled(true);
    setSaveLoading(false);
    onClose();
  };

  const handleRandomize = () => {
    const randomOptions = generateRandomAvatarOptions();
    setTopType(randomOptions.topType);
    setEyeType(randomOptions.eyeType);
    setEyebrowType(randomOptions.eyebrowType);
    setAccessoryType(randomOptions.accessoriesType);
    setFacialHairType(randomOptions.facialHairType);
    setClotheType(randomOptions.clotheType);
    setMouthType(randomOptions.mouthType);
    setSkinOption(randomOptions.skinColor);
    setTopColor(randomOptions.hatColor);
    setHairColor(randomOptions.hairColor);
    setFacialHairColor(randomOptions.facialHairColor);
    setClotheColor(randomOptions.clotheColor);
    setGraphicType(randomOptions.graphicType);
    setCurrentOptions({ ...randomOptions });
  };

  const handleSave = () => {
    setSaveLoading(true);
    setAvatar(api, store?.user?.username, currentOptions).then((res) => {
      if (!res?.error) {
        let newUser = store?.user;
        newUser.avatar[0] = currentOptions;
        dispatch({ type: SET_USER, payload: { ...newUser } });
        setSaveLoading(false);
        setSaveDisabled(true);
      } else {
        setSaveLoading(false);
      }
    });
  };

  const getClothesColor = (color) => {
    switch (color) {
      case "Black":
        return "#262E33";
      case "Blue01":
        return "#65C9FF";
      case "Blue02":
        return "#5199E4";
      case "Blue03":
        return "#25557C";
      case "Gray01":
        return "#E6E6E6";
      case "Gray02":
        return "#929598";
      case "Heather":
        return "#3C4F5C";
      case "PastelBlue":
        return "#B1E2FF";
      case "PastelGreen":
        return "#A7FFC4";
      case "PastelOrange":
        return "#FFDEB5";
      case "PastelRed":
        return "#FFAFB9";
      case "PastelYellow":
        return "#FFFFB1";
      case "Pink":
        return "#FF488E";
      case "Red":
        return "#FF5C5C";
      case "White":
        return "#FFFFFF";
    }
  };

  // effects
  useEffect(() => {
    if (open) {
      const avatar = store?.user?.avatar[0];
      if (
        skinOption !== avatar.skinColor ||
        topType !== avatar.topType ||
        hairColor !== avatar.hairColor ||
        topColor !== avatar.hatColor ||
        eyeType !== avatar.eyeType ||
        eyebrowType !== avatar.eyebrowType ||
        mouthType !== avatar.mouthType ||
        facialHairType !== avatar.facialHairType ||
        clotheType !== avatar.clotheType ||
        clotheColor !== avatar.clotheColor ||
        graphicType !== avatar.graphicType ||
        accessoryType !== avatar.accessoriesType
      ) {
        setSaveDisabled(false);
      }
    }
  }, [
    skinOption,
    topType,
    hairColor,
    topColor,
    eyeType,
    eyebrowType,
    mouthType,
    facialHairType,
    facialHairColor,
    clotheType,
    clotheColor,
    graphicType,
    accessoryType,
  ]);

  return (
    <DialogModal
      title="Edit Avatar"
      onClose={handleClose}
      open={open}
      button={
        <NewPrimaryButton
          label="Save"
          disabled={saveDisabled}
          onClick={handleSave}
          loading={saveLoading}
        />
      }
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", overflow: "hidden" }}
        gap={{ xs: 2 }}
      >
        <Grid
          item
          sx={{
            backgroundColor: theme.offWhite(),
            borderRadius: 2,
            width: "100%",
            position: "relative",
          }}
        >
          <Grid item sx={{ position: "absolute", top: 5, right: 5 }}>
            <NewCustomIconButton label="Randomize" onClick={handleRandomize}>
              <FaRandom style={{ fontSize: 22, color: theme.text() }} />
            </NewCustomIconButton>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Avatar style={{ width: 250, height: 250 }} {...currentOptions} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            wrap="nowrap"
            gap={{ xs: 1 }}
            sx={{
              width: "100%",
              overflowX: "auto",
              paddingBottom: 2,
              boxSizing: "border-box",
            }}
            ref={ref}
            onMouseDown={onMouseDown}
          >
            <Grid item>
              <AvatarTypeButton
                label="Skin Tone"
                selected={selected === "skin"}
                onClick={() => setSelected("skin")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Hair and Hats"
                selected={selected === "hair_hat"}
                onClick={() => setSelected("hair_hat")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Hair Color"
                selected={selected === "hair_color"}
                onClick={() => setSelected("hair_color")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Hat Color"
                selected={selected === "hat_color"}
                onClick={() => setSelected("hat_color")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Eyes"
                selected={selected === "eyes"}
                onClick={() => setSelected("eyes")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Eyebrows"
                selected={selected === "eyebrows"}
                onClick={() => setSelected("eyebrows")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Mouth"
                selected={selected === "mouth"}
                onClick={() => setSelected("mouth")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Facial Hair"
                selected={selected === "facial_hair"}
                onClick={() => setSelected("facial_hair")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Clothes"
                selected={selected === "clothes"}
                onClick={() => setSelected("clothes")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Clothes Color"
                selected={selected === "clothes_color"}
                onClick={() => setSelected("clothes_color")}
              />
            </Grid>

            <Grid item>
              <AvatarTypeButton
                label="Accessories"
                selected={selected === "accessories"}
                onClick={() => setSelected("accessories")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            width: "100%",
            maxHeight: 350,
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: 6,
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {selected === "skin" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.skinColor?.map((skin) => (
                    <AvatarPieceContainer
                      label={skin}
                      onClick={() => {
                        setSkinOption(skin);
                        const newCurrentOptions = currentOptions;
                        currentOptions.skinColor = skin;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={skinOption === skin}
                    >
                      <Piece pieceType="skin" pieceSize="50" skinColor={skin} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "hair_hat" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.topType?.map((top) => (
                    <AvatarPieceContainer
                      label={top}
                      onClick={() => {
                        setTopType(top);
                        const newCurrentOptions = currentOptions;
                        currentOptions.topType = top;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={topType === top}
                    >
                      <Piece pieceType="top" pieceSize="50" topType={top} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "hair_color" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.hairColor?.map((color) => (
                    <AvatarPieceContainer
                      label={color}
                      onClick={() => {
                        setHairColor(color);
                        const newCurrentOptions = currentOptions;
                        currentOptions.hairColor = color;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={hairColor === color}
                    >
                      <Piece pieceType="top" pieceSize="50" hairColor={color} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "hat_color" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.hatColor?.map((color) => (
                    <AvatarPieceContainer
                      label={color}
                      onClick={() => {
                        setTopColor(color);
                        const newCurrentOptions = currentOptions;
                        currentOptions.hatColor = color;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={topColor === color}
                    >
                      <AvatarColorBox color={getClothesColor(color)} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "eyes" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.eyeType?.map((eye) => (
                    <AvatarPieceContainer
                      label={eye}
                      onClick={() => {
                        setEyeType(eye);
                        const newCurrentOptions = currentOptions;
                        currentOptions.eyeType = eye;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={eyeType === eye}
                    >
                      <Piece pieceType="eyes" pieceSize="120" eyeType={eye} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "eyebrows" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.eyebrowType?.map((type) => (
                    <AvatarPieceContainer
                      label={type}
                      onClick={() => {
                        setEyebrowType(type);
                        const newCurrentOptions = currentOptions;
                        currentOptions.eyebrowType = type;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={eyebrowType === type}
                    >
                      <Piece
                        pieceType="eyebrows"
                        pieceSize="120"
                        eyebrowType={type}
                      />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "mouth" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.mouthType?.map((mouth) => (
                    <AvatarPieceContainer
                      label={mouth}
                      onClick={() => {
                        setMouthType(mouth);
                        const newCurrentOptions = currentOptions;
                        currentOptions.mouthType = mouth;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={mouthType === mouth}
                    >
                      <Piece
                        pieceType="mouth"
                        pieceSize="120"
                        mouthType={mouth}
                      />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "facial_hair" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.facialHairType?.map((type) => (
                    <AvatarPieceContainer
                      label={type}
                      onClick={() => {
                        setFacialHairType(type);
                        const newCurrentOptions = currentOptions;
                        currentOptions.facialHairType = type;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={facialHairType === type}
                    >
                      <Piece
                        pieceType="facialHair"
                        pieceSize="60"
                        facialHairType={type}
                      />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "clothes" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.clotheType?.map((type) => (
                    <AvatarPieceContainer
                      label={type}
                      onClick={() => {
                        setClotheType(type);
                        const newCurrentOptions = currentOptions;
                        currentOptions.clotheType = type;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={clotheType === type}
                    >
                      <Piece
                        pieceType="clothe"
                        pieceSize="50"
                        clotheType={type}
                      />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "clothes_color" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.clotheColor?.map((color) => (
                    <AvatarPieceContainer
                      label={color}
                      onClick={() => {
                        setClotheColor(color);
                        const newCurrentOptions = currentOptions;
                        currentOptions.clotheColor = color;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={clotheColor === color}
                    >
                      <AvatarColorBox color={getClothesColor(color)} />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}

            {selected === "accessories" ? (
              <Grid item sx={{ width: "100%" }}>
                <Grid
                  container
                  justifyContent="start"
                  alignItems="center"
                  gap={{ xs: 1 }}
                >
                  {configs?.accessoriesType?.map((type) => (
                    <AvatarPieceContainer
                      label={type}
                      onClick={() => {
                        setAccessoryType(type);
                        const newCurrentOptions = currentOptions;
                        currentOptions.accessoriesType = type;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      selected={accessoryType === type}
                    >
                      <Piece
                        pieceType="accessories"
                        pieceSize="65"
                        accessoriesType={type}
                      />
                    </AvatarPieceContainer>
                  ))}
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </DialogModal>
  );
};

export default CustomizeAvatarDialogModal;

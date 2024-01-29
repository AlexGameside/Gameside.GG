import {
  Grid,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  Alert,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import Avatar, { Piece } from "avataaars";
import { generateRandomAvatarOptions } from "../utils/generateRandomAvatarOptions.js";
import {
  GlobalDispatchContext,
  GlobalStateContext,
  SET_AVATAR_OPTIONS,
} from "../context/StoreContext";
import { setAvatar } from "../utils/API.js";
import constants from "../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { configs } from "../utils/avatarConfig";
import useAxios from "../utils/useAxios.js";

const CustomizeAvatar = (props) => {
  const styles = {
    subTitle: {
      fontSize: 20,
      color: constants.newGray,
    },
    saveButton: {
      border: `2px solid ${constants.newGreen}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newGreen,
      "&:hover": {
        backgroundColor: constants.newGreen,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    cancelButton: {
      width: "100%",
      border: `2px solid ${constants.newGray}`,
      color: constants.newGray,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.white,
      "&:hover": {
        backgroundColor: constants.newGray,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    randomButton: {
      border: `2px solid ${constants.newOrange}`,
      width: "100%",
      color: constants.white,
      fontWeight: 900,
      borderRadius: 3,
      boxShadow: "0 0",
      backgroundColor: constants.newOrange,
      "&:hover": {
        backgroundColor: constants.newOrange,
        opacity: 0.7,
        color: constants.white,
        boxShadow: "0 0",
      },
      transition: "0.3s",
    },
    dropdown: {
      border: `2px solid ${constants.newOrange}`,
      borderRadius: 6,
      color: constants.newOrange,
      fontWeight: 900,
      width: "100%",
      padding: 2,
      fontSize: 16,
      color: constants.newOrange,
    },
    type: {
      fontWeight: 200,
      fontSize: 16,
      color: constants.newGray,
    },
  };

  const api = useAxios();

  const hatTypeOptions = () => {
    const hatType = [];

    configs?.topType?.map((top, i) => {
      hatType.push({ key: i, text: top, value: top });
    });
    return hatType;
  };

  const hatColorOptions = () => {
    const hatColor = [];

    configs?.hatColor?.map((hat, i) => {
      hatColor.push({ key: i, text: hat, value: hat });
    });
    return hatColor;
  };

  const accessoriesTypeOptions = () => {
    const accessoryType = [];

    configs?.accessoriesType?.map((accessory, i) => {
      accessoryType.push({ key: i, text: accessory, value: accessory });
    });
    return accessoryType;
  };

  const facialHairTypeOptions = () => {
    const facialType = [];

    configs?.facialHairType?.map((facialHair, i) => {
      facialType.push({ key: i, text: facialHair, value: facialHair });
    });
    return facialType;
  };

  const clothesTypeOptions = () => {
    const clothesType = [];

    configs?.clotheType?.map((clothe, i) => {
      clothesType.push({ key: i, text: clothe, value: clothe });
    });
    return clothesType;
  };

  const mouthTypeOptions = () => {
    const mouthTypes = [];

    configs?.mouthType?.map((mouth, i) => {
      mouthTypes?.push({ key: i, text: mouth, value: mouth });
    });
    return mouthTypes;
  };

  const skinColorOptions = () => {
    const skinTypes = [];

    configs?.skinColor?.map((color, i) => {
      skinTypes?.push({ key: i, text: color, value: color });
    });
    return skinTypes;
  };

  const hairColorOptions = () => {
    const hairColors = [];

    configs?.hairColor?.map((color, i) => {
      hairColors.push({ key: i, text: color, value: color });
    });
    return hairColors;
  };

  const facialHairColorOptions = () => {
    const facialHairColors = [];

    configs?.facialHairColor?.map((color, i) => {
      facialHairColors.push({ key: i, text: color, value: color });
    });
    return facialHairColors;
  };

  const clothesColorOptions = () => {
    const clothesColors = [];

    configs?.clotheColor?.map((color, i) => {
      clothesColors.push({ key: i, text: color, value: color });
    });
    return clothesColors;
  };

  const clothesLogoOptions = () => {
    const logos = [];

    configs?.graphicType?.map((logo, i) => {
      logos.push({ key: i, text: logo, value: logo });
    });
    return logos;
  };

  const eyeTypeOptions = () => {
    return [
      { key: 0, text: "Close", value: "Close" },
      { key: 1, text: "Cry", value: "Cry" },
      { key: 2, text: "Default", value: "Default" },
      { key: 3, text: "Dizzy", value: "Dizzy" },
      { key: 4, text: "EyeRoll", value: "EyeRoll" },
      { key: 5, text: "Happy", value: "Happy" },
      { key: 6, text: "Hearts", value: "Hearts" },
      { key: 7, text: "Side", value: "Side" },
      { key: 8, text: "Squint", value: "Squint" },
      { key: 9, text: "Surprised", value: "Surprised" },
      { key: 10, text: "Wink", value: "Wink" },
      { key: 11, text: "WinkWacky", value: "WinkWacky" },
    ];
  };

  const eyebrowTypeOptions = () => {
    return [
      { key: 0, text: "Angry", value: "Angry" },
      { key: 1, text: "AngryNatural", value: "AngryNatural" },
      { key: 2, text: "Default", value: "Default" },
      { key: 3, text: "DefaultNatural", value: "DefaultNatural" },
      { key: 4, text: "FlatNatural", value: "FlatNatural" },
      { key: 5, text: "RaisedExcited", value: "RaisedExcited" },
      { key: 6, text: "RaisedExcitedNatural", value: "RaisedExcitedNatural" },
      { key: 7, text: "SadConcerned", value: "SadConcerned" },
      { key: 8, text: "SadConcernedNatural", value: "SadConcernedNatural" },
      { key: 9, text: "UnibrowNatural", value: "UnibrowNatural" },
      { key: 10, text: "UpDown", value: "UpDown" },
      { key: 11, text: "UpDownNatural", value: "UpDownNatural" },
    ];
  };

  const { open, onClose, currentAvatarOptions } = props;

  const store = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  // state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(store?.avatarOptions);
  const [topType, setTopType] = useState(store?.avatarOptions?.topType);
  const [topColor, setTopColor] = useState(store?.avatarOptions?.topType);
  const [accessoriesType, setAccessoriesType] = useState(
    store?.avatarOptions?.accessoriesType
  );
  const [facialHairType, setFacialHairType] = useState(
    store?.avatarOptions?.facialHairType
  );
  const [clothesType, setClothesType] = useState(
    store?.avatarOptions?.clotheType
  );
  const [eyeType, setEyeType] = useState(store?.avatarOptions?.eyeType);
  const [eyebrowType, setEyebrowType] = useState(
    store?.avatarOptions?.eyebrowType
  );
  const [mouthType, setMouthType] = useState(store?.avatarOptions?.mouthType);
  const [skinColor, setSkinColor] = useState(store?.avatarOptions?.skinColor);
  const [hairColor, setHairColor] = useState(store?.avatarOptions?.hairColor);
  const [facialHairColor, setFacialHairColor] = useState(
    store?.avatarOptions?.facialHairColor
  );
  const [clothesColor, setClothesColor] = useState(
    store?.avatarOptions?.clotheColor
  );
  const [logo, setLogo] = useState(store?.avatarOptions.graphicType);

  const isSaveDisabled = () => {
    if (currentOptions === store?.avatarOptions) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setCurrentOptions(store?.avatarOptions);
    onClose();
  };

  const handleSaveAvatar = () => {
    setLoading(true);
    setAvatar(api, store?.user?.username, currentOptions).then((res) => {
      if (!res.error) {
        dispatch({
          type: SET_AVATAR_OPTIONS,
          payload: currentOptions,
        });
        setLoading(false);
        return;
      } else {
        setLoading(false);
        setError("Could not save avatar!");
        return;
      }
    });
  };

  const handleRandomizeAvatar = () => {
    const randomOptions = generateRandomAvatarOptions();
    setTopType(randomOptions.topType);
    setEyeType(randomOptions.eyeType);
    setEyebrowType(randomOptions.eyebrowType);
    setAccessoriesType(randomOptions.accessoriesType);
    setFacialHairType(randomOptions.facialHairType);
    setClothesType(randomOptions.clotheType);
    setMouthType(randomOptions.mouthType);
    setSkinColor(randomOptions.skinColor);
    setTopColor(randomOptions.hatColor);
    setHairColor(randomOptions.hairColor);
    setFacialHairColor(randomOptions.facialHairColor);
    setClothesColor(randomOptions.clotheColor);
    setLogo(randomOptions.graphicType);
    setCurrentOptions({ ...randomOptions });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ fontWeight: 900, fontSize: 28, color: constants.newGray }}
      >
        Customize Avatar{" "}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="start"
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {!error ? null : (
            <Grid item>
              <Alert sx={{ marginBottom: 2 }} severity="error">
                {error}
              </Alert>
            </Grid>
          )}
          <Grid item alignSelf="center">
            <Typography sx={styles.subTitle}>Current Avatar:</Typography>
            <Avatar
              style={{ width: 150, height: 150 }}
              avatarStyle="Circle"
              {...currentOptions}
            />
          </Grid>
          <Grid item alignSelf="center">
            <Button
              variant="contained"
              sx={styles.randomButton}
              onClick={handleRandomizeAvatar}
            >
              Randomize
            </Button>
          </Grid>

          <Grid item>
            <Grid container direction="row" columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justifyContent="start"
                  rowSpacing={{ xs: 1 }}
                >
                  <Grid item>
                    <Typography sx={styles.type}>Top Type: </Typography>
                  </Grid>
                  <Grid item>
                    <Dropdown
                      placeholder="Top Type"
                      options={hatTypeOptions()}
                      onChange={(e, data) => {
                        setTopType(data.value);

                        const newCurrentOptions = currentOptions;
                        currentOptions.topType = data.value;
                        setCurrentOptions({ ...newCurrentOptions });
                      }}
                      value={topType}
                      style={styles.dropdown}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    rowSpacing={{ xs: 1 }}
                  >
                    <Grid item>
                      <Typography sx={styles.type}>Top Color: </Typography>
                    </Grid>
                    <Grid item>
                      <Dropdown
                        placeholder="Top Color"
                        options={hatColorOptions()}
                        onChange={(e, data) => {
                          setTopColor(data.value);

                          const newCurrentOptions = currentOptions;
                          currentOptions.hatColor = data.value;
                          setCurrentOptions({ ...newCurrentOptions });
                        }}
                        value={topColor}
                        style={styles.dropdown}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Grid item>
                      <Typography sx={styles.type}>
                        Facial Hair Type:{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Dropdown
                        placeholder="Facial Hair Type"
                        options={facialHairTypeOptions()}
                        onChange={(e, data) => {
                          setFacialHairType(data.value);

                          const newCurrentOptions = currentOptions;
                          currentOptions.facialHairType = data.value;
                          setCurrentOptions({ ...newCurrentOptions });
                        }}
                        value={facialHairType}
                        style={styles.dropdown}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography sx={styles.type}>
                        Facial Hair Color:{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Dropdown
                        placeholder="Facial Hair Color"
                        options={facialHairColorOptions()}
                        onChange={(e, data) => {
                          setFacialHairColor(data.value);

                          const newCurrentOptions = currentOptions;
                          currentOptions.facialHairColor = data.value;
                          setCurrentOptions({ ...newCurrentOptions });
                        }}
                        value={facialHairColor}
                        style={styles.dropdown}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Accessories Type: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Accessories Type"
                  options={accessoriesTypeOptions()}
                  onChange={(e, data) => {
                    setAccessoriesType(data.value);

                    const newCurrentOptions = currentOptions;
                    currentOptions.accessoriesType = data.value;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={accessoriesType}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Eye Type: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Eye Type"
                  options={eyeTypeOptions()}
                  onChange={(e, data) => {
                    const newEyeType = data.value;
                    setEyeType(newEyeType);

                    const newCurrentOptions = currentOptions;
                    currentOptions.eyeType = newEyeType;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={eyeType}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Eyebrow Type: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Eyebrow Type"
                  options={eyebrowTypeOptions()}
                  onChange={(e, data) => {
                    const newEyebrowType = data.value;
                    setEyebrowType(newEyebrowType);

                    const newCurrentOptions = currentOptions;
                    currentOptions.eyebrowType = newEyebrowType;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={eyebrowType}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  columnSpacing={{ xs: 1, sm: 2 }}
                >
                  <Grid item>
                    <Grid item>
                      <Typography sx={styles.type}>Clothes Type: </Typography>
                    </Grid>
                    <Grid item>
                      <Dropdown
                        placeholder="Clothes Type"
                        options={clothesTypeOptions()}
                        onChange={(e, data) => {
                          setClothesType(data.value);

                          const newCurrentOptions = currentOptions;
                          currentOptions.clotheType = data.value;
                          setCurrentOptions({ ...newCurrentOptions });
                        }}
                        value={clothesType}
                        style={styles.dropdown}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography sx={styles.type}>Clothes Color: </Typography>
                    </Grid>
                    <Grid item>
                      <Dropdown
                        placeholder="Clothes Color"
                        options={clothesColorOptions()}
                        onChange={(e, data) => {
                          setClothesColor(data.value);

                          const newCurrentOptions = currentOptions;
                          currentOptions.clotheColor = data.value;
                          setCurrentOptions({ ...newCurrentOptions });
                        }}
                        value={clothesColor}
                        style={styles.dropdown}
                      />
                    </Grid>
                  </Grid>
                  {clothesType === "GraphicShirt" ? (
                    <Grid item>
                      <Grid item>
                        <Typography sx={styles.type}>Logo: </Typography>
                      </Grid>
                      <Grid item>
                        <Dropdown
                          placeholder="Logo"
                          options={clothesLogoOptions()}
                          onChange={(e, data) => {
                            setLogo(data.value);

                            const newCurrentOptions = currentOptions;
                            currentOptions.graphicType = data.value;
                            setCurrentOptions({ ...newCurrentOptions });
                          }}
                          value={logo}
                          style={styles.dropdown}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Mouth Type: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Mouth Type"
                  options={mouthTypeOptions()}
                  onChange={(e, data) => {
                    setMouthType(data.value);

                    const newCurrentOptions = currentOptions;
                    currentOptions.mouthType = data.value;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={mouthType}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Skin Color: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Skin Color"
                  options={skinColorOptions()}
                  onChange={(e, data) => {
                    setSkinColor(data.value);

                    const newCurrentOptions = currentOptions;
                    currentOptions.skinColor = data.value;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={skinColor}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="start"
              rowSpacing={{ xs: 1 }}
            >
              <Grid item>
                <Typography sx={styles.type}>Hair Color: </Typography>
              </Grid>
              <Grid item>
                <Dropdown
                  placeholder="Hair Color"
                  options={hairColorOptions()}
                  onChange={(e, data) => {
                    setHairColor(data.value);

                    const newCurrentOptions = currentOptions;
                    currentOptions.hairColor = data.value;
                    setCurrentOptions({ ...newCurrentOptions });
                  }}
                  value={hairColor}
                  style={styles.dropdown}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  sx={styles.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={isSaveDisabled()}
                  variant="contained"
                  size="large"
                  sx={styles.saveButton}
                  onClick={handleSaveAvatar}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeAvatar;

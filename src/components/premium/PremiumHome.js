import { Divider, Grid, Typography, useMediaQuery, Alert } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SET_USER,
  StoreContext,
  StoreDispatch,
} from "../../context/NewStoreContext";
import createTheme from "../../utils/theme";
import Header from "../../custom_components/Header";
import SectionHeader from "../../custom_components/SectionHeader";
import useDraggableScroll from "use-draggable-scroll";
import { FaPiggyBank, FaTrophy } from "react-icons/fa";
import { SiRiotgames } from "react-icons/si";
import { GiPresent } from "react-icons/gi";
import { AiOutlineCheck, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import uuid from "react-uuid";
import NewPrimaryButton from "../../custom_components/NewPrimaryButton";
import NewSignupLoginModal from "../../components/NewSignupLoginModal";

const PremiumItem = (props) => {
  const { icon, title, label } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        wrap="nowrap"
      >
        <Grid
          item
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: 80,
            height: 80,
            borderRadius: 100,
            backgroundColor: theme.border(),
            marginBottom: 1,
          }}
        >
          {icon}
        </Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.text(),
              textAlign: "center",
            }}
            noWrap
          >
            {title}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: theme.metaText(),
              textAlign: "center",
            }}
            noWrap
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const PremiumCard = (props) => {
  const { type, description, price, card, setSuccess, setError } = props;
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const isDesktop = useMediaQuery("(min-width:1025px)");
  const paypalPremiumOne = useRef();
  const paypalPremiumTwo = useRef();
  const paypalPremiumThree = useRef();
  const dispatch = useContext(StoreDispatch);

  const [openModal, setOpenModal] = useState(false);

  const getColor = () => {
    if (card === 1) {
      return theme.primary();
    }

    if (card === 2) {
      return theme.green();
    }

    if (card === 3) {
      return theme.gold();
    }
  };

  const setSubActive = () => {
    let newUser = store?.user;
    let newConnections = store?.user?.connections;
    newConnections[5].active = true;
    dispatch({ type: SET_USER, payload: { ...newUser } });
  };

  useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (_, actions, __) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "TknsGG One Month Premium",
                  amount: {
                    currency_code: "USD",
                    value: 4.99,
                  },
                  custom_id: store?.user?.username,
                  invoice_id: "monthly#" + uuid(),
                },
              ],
            });
          },
          onInit: (data, actions) => {
            actions.disable();

            if (store?.user) {
              actions.enable();
            }
          },
          onClick: () => {
            if (store?.user) {
              return;
            }

            setOpenModal(true);
          },
          onApprove: async (data, actions) => {
            await actions.order.capture();
            setSubActive();
            setError("");
            setSuccess(
              "Thank you for purchasing premium. Please allow 1-5 minutes for premium to show on your account."
            );
          },
          onCancel: () => {},
          onError: (err) => {
            setSuccess("");
            setError("Something went wrong. Please try again later.");
          },
        })
        .render(paypalPremiumOne.current);
    }, []);

    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (_, actions, __) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "TknsGG Three Months Premium",
                  amount: {
                    currency_code: "USD",
                    value: 12.99,
                  },
                  custom_id: store?.user?.username,
                  invoice_id: "quarterly#" + uuid(),
                },
              ],
            });
          },
          onInit: (data, actions) => {
            actions.disable();

            if (store?.user) {
              actions.enable();
            }
          },
          onClick: () => {
            if (store?.user) {
              return;
            }

            setOpenModal(true);
          },
          onApprove: async (data, actions) => {
            await actions.order.capture();
            setSubActive();
            setError("");
            setSuccess(
              "Thank you for purchasing premium. Please allow 1-5 minutes for premium to show on your account."
            );
          },
          onCancel: () => {},
          onError: (err) => {
            setSuccess("");
            setError("Something went wrong. Please try again later.");
          },
        })
        .render(paypalPremiumTwo.current);
    }, []);

    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (_, actions, __) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "TknsGG One Year Premium",
                  amount: {
                    currency_code: "USD",
                    value: 49.99,
                  },
                  custom_id: store?.user?.username,
                  invoice_id: "yearly#" + uuid(),
                },
              ],
            });
          },
          onInit: (data, actions) => {
            actions.disable();

            if (store?.user) {
              actions.enable();
            }
          },
          onClick: () => {
            if (store?.user) {
              return;
            }

            setOpenModal(true);
          },
          onApprove: async (data, actions) => {
            await actions.order.capture();
            setSubActive();
            setError("");
            setSuccess(
              "Thank you for purchasing premium. Please allow 1-5 minutes for premium to show on your account."
            );
          },
          onCancel: () => {},
          onError: (err) => {
            setSuccess("");
            setError("Something went wrong. Please try again later.");
          },
        })
        .render(paypalPremiumThree.current);
    }, []);

  return (
    <Grid
      item
      sx={{
        width: isDesktop ? 269 : "100%",
        backgroundColor: theme.cardDark(),
        borderRadius: 2,
        padding: 2,
        border: `1px solid ${theme.border()}`,
      }}
    >
      <NewSignupLoginModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        handleMenuClose={() => {}}
      />

      <Grid
        container
        sx={{ width: "100%" }}
        direction="column"
        alignItems="start"
        justifyContent="center"
        gap={{ xs: 2 }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="start"
            justifyContent="start"
          >
            <Grid item>
              <Typography
                sx={{ fontSize: 24, fontWeight: 600, color: theme.text() }}
              >
                {type}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{ fontSize: 15, fontWeight: 400, color: theme.metaText() }}
              >
                {description}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                sx={{ fontSize: 15, fontWeight: 400, color: theme.text() }}
              >
                One time payment of{" "}
                <span style={{ color: getColor() }}>${price}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          <Divider sx={{ backgroundColor: theme.border() }} />
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          {card === 1 ? (
            <>
              {store?.user?.connections[5]?.active === true ? (
                <NewPrimaryButton
                  label="Subscription Active"
                  disabled
                  fullWidth
                />
              ) : (
                <div ref={paypalPremiumOne}></div>
              )}
            </>
          ) : card === 2 ? (
            <>
              {store?.user?.connections[5]?.active === true ? (
                <NewPrimaryButton
                  label="Subscription Active"
                  disabled
                  fullWidth
                />
              ) : (
                <div ref={paypalPremiumTwo}></div>
              )}
            </>
          ) : (
            <>
              {store?.user?.connections[5]?.active === true ? (
                <NewPrimaryButton
                  label="Subscription Active"
                  disabled
                  fullWidth
                />
              ) : (
                <div ref={paypalPremiumThree}></div>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PremiumHome = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref, {
    direction: "horizontal",
  });
  const isDesktop = useMediaQuery("(min-width:1500px)");

  // state
  const [loading, setLoading] = useState(true);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showFourth, setShowFourth] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // methods

  // effects
  useEffect(() => {
    theme.changeWebsiteBackground();
  }, []);

  useEffect(() => {
    if (store?.user) {
      setLoading(false);
    }
  }, [store?.user]);

  useEffect(() => {
    theme.changeWebsiteBackground();
  }, [store.mode]);

  // styles
  const styles = {
    subtitle: {
      fontSize: 18,
      fontWeight: 400,
      color: theme.metaText(),
    },
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="start"
      direction="column"
      gap={{ xs: 4 }}
      sx={{
        minHeight: "100vh",
      }}
      wrap="nowrap"
    >
      <Grid item sx={{ width: "100%" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="start"
        >
          <Grid item>
            <Header label="Premium" />
          </Grid>
          <Grid item>
            <Typography sx={styles.subtitle}>
              Playing Valorant has never been THIS profitable.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <>
        <Grid
          item
          sx={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: theme.cardDark(),
            padding: 2,
            border: `1px solid ${theme.border()}`,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
            gap={{ xs: 2 }}
          >
            <Grid item>
              <SectionHeader label="Why go Premium?" />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                justifyContent={isDesktop ? "center" : "start"}
                alignItems="center"
                wrap="nowrap"
                gap={{ xs: 4 }}
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  paddingBottom: 2,
                  boxSizing: "border-box",
                }}
                ref={ref}
                onMouseDown={onMouseDown}
              >
                <PremiumItem
                  title="Earn Valorant Points"
                  label="Play ANYTHING. Earn VP."
                  icon={
                    <SiRiotgames
                      style={{ fontSize: 50, color: theme.text() }}
                    />
                  }
                />

                <PremiumItem
                  title="Lower Fees"
                  label="Pay less fees in cash matches."
                  icon={
                    <FaPiggyBank
                      style={{ fontSize: 50, color: theme.text() }}
                    />
                  }
                />

                <PremiumItem
                  title="First in line"
                  label="Priority signup for tournaments."
                  icon={
                    <FaTrophy style={{ fontSize: 50, color: theme.text() }} />
                  }
                />

                <PremiumItem
                  title="And More"
                  label="Benefit from many more features."
                  icon={
                    <GiPresent style={{ fontSize: 60, color: theme.text() }} />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ width: "100%" }}>
          {success ? (
            <Grid item sx={{ width: "100%", marginBottom: 2 }}>
              <Alert severity="success" onClose={() => setSuccess("")}>
                {success}
              </Alert>
            </Grid>
          ) : null}

          {error ? (
            <Grid item sx={{ width: "100%", marginBottom: 2 }}>
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </Grid>
          ) : null}

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
            gap={{ xs: 2 }}
          >
            <PremiumCard
              type="Monthly"
              description="One month of premium"
              price={4.99}
              card={1}
              setSuccess={setSuccess}
              setError={setError}
            />
            <PremiumCard
              type="Quarterly"
              description="Three months of premium"
              price={12.99}
              card={2}
              setSuccess={setSuccess}
              setError={setError}
            />
            <PremiumCard
              type="Annually"
              description="One year of premium"
              price={49.99}
              card={3}
              setSuccess={setSuccess}
              setError={setError}
            />
          </Grid>
        </Grid>

        <Grid item sx={{ flexGrow: 1 }}></Grid>

        <Grid
          item
          sx={{
            width: "100%",
            padding: 2,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="start"
            gap={{ xs: 1 }}
            sx={{ width: "100%" }}
          >
            <Grid item>
              <SectionHeader label="FAQ" />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setShowFirst(!showFirst)}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.text(),
                        }}
                      >
                        What is included with TknsGG Premium?
                      </Typography>
                    </Grid>

                    <Grid item>
                      {showFirst ? (
                        <AiOutlineUp
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      ) : (
                        <AiOutlineDown
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {showFirst ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Grid
                      container
                      direction="column"
                      alignItems="start"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Grid
                          container
                          justfiyContent="start"
                          alignItems="start"
                          wrap="nowrap"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <AiOutlineCheck
                              style={{ color: theme.text(), fontSize: 20 }}
                            />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.text(),
                                fontWeight: 400,
                              }}
                            >
                              Ability to gain Valorant Points from playing
                              scrims, tournaments, or cash matches.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          justfiyContent="start"
                          alignItems="start"
                          wrap="nowrap"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <AiOutlineCheck
                              style={{ color: theme.text(), fontSize: 20 }}
                            />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.text(),
                                fontWeight: 400,
                              }}
                            >
                              Pay less fees in cash matches.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          justfiyContent="start"
                          alignItems="start"
                          wrap="nowrap"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <AiOutlineCheck
                              style={{ color: theme.text(), fontSize: 20 }}
                            />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.text(),
                                fontWeight: 400,
                              }}
                            >
                              Priority when signing up for tournaments so you're
                              guaranteed a spot.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          justfiyContent="start"
                          alignItems="start"
                          wrap="nowrap"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <AiOutlineCheck
                              style={{ color: theme.text(), fontSize: 20 }}
                            />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.text(),
                                fontWeight: 400,
                              }}
                            >
                              Custom badge on your public profile, and
                              leaderboards.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Grid
                          container
                          justfiyContent="start"
                          alignItems="start"
                          wrap="nowrap"
                          gap={{ xs: 1 }}
                        >
                          <Grid item>
                            <AiOutlineCheck
                              style={{ color: theme.text(), fontSize: 20 }}
                            />
                          </Grid>

                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: 15,
                                color: theme.text(),
                                fontWeight: 400,
                              }}
                            >
                              Priority support in our discord.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Divider sx={{ backgroundColor: theme.border() }} />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setShowSecond(!showSecond)}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.text(),
                        }}
                      >
                        How do I gain Valorant Points with premium?
                      </Typography>
                    </Grid>

                    <Grid item>
                      {showSecond ? (
                        <AiOutlineUp
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      ) : (
                        <AiOutlineDown
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {showSecond ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: theme.text(),
                      }}
                    >
                      After every Cash Match, Scrim, or Tournament Match, every
                      premium player in the match, win or loss, will receive a
                      random amount of Valorant Points which can later be
                      withdrawn and redeemed in-game.
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Divider sx={{ backgroundColor: theme.border() }} />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setShowThird(!showThird)}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.text(),
                        }}
                      >
                        Will I keep getting charged every month/quarter/year
                        with premium?
                      </Typography>
                    </Grid>

                    <Grid item>
                      {showThird ? (
                        <AiOutlineUp
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      ) : (
                        <AiOutlineDown
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {showThird ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: theme.text(),
                      }}
                    >
                      No, premium payments are one time only. If you want to
                      renew your subscription, purchase again after it has
                      ended. You can view when your subscription will expire on
                      your profile.
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Divider sx={{ backgroundColor: theme.border() }} />
            </Grid>

            <Grid item sx={{ width: "100%" }}>
              <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                sx={{ width: "100%" }}
                gap={{ xs: 1 }}
              >
                <Grid
                  item
                  sx={{ width: "100%", "&:hover": { cursor: "pointer" } }}
                  onClick={() => setShowFourth(!showFourth)}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.text(),
                        }}
                      >
                        What if I have a question that is not listed here?
                      </Typography>
                    </Grid>

                    <Grid item>
                      {showFourth ? (
                        <AiOutlineUp
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      ) : (
                        <AiOutlineDown
                          style={{ fontSize: 20, color: theme.text() }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {showFourth ? (
                  <Grid item sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 400,
                        color: theme.text(),
                      }}
                    >
                      You can make a ticket in our discord server and the
                      support staff will answer your question!
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    </Grid>
  );
};

export default PremiumHome;


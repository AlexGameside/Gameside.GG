import { Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewTOS = () => {
  // variables
  const store = useContext(StoreContext);
  const theme = createTheme(store.mode);

  // styles
  const styles = {
    title: {
      fontSize: 36,
      fontWeight: 900,
      color: theme.text(),
    },
    card: {
      padding: 4,
      backgroundColor: theme.card(),
      borderRadius: 2,
    },
    header: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.text(),
    },
    otherText: {
      fontSize: 15,
      fontWeight: 400,
      color: theme.text(),
    },
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="start"
      justifyContent="center"
      rowSpacing={{ xs: 2 }}
      sx={{ width: "100%" }}
      id="top"
    >
      <Grid item sx={{ width: "100%" }}>
        <Paper elevation={0} sx={styles.card}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="start"
            rowSpacing={{ xs: 3 }}
            sx={{ width: "100%" }}
          >
            <Grid item>
              <Typography sx={styles.header}>
                1. ACCEPTING THESE TERMS
              </Typography>
              <Typography sx={styles.otherText}>
                This document, our rules, policies, and the other documents
                referenced make up our Terms of Service (“Terms”). The Terms are
                a legally binding contract between you and Tkns LLC. This
                contract sets out your rights and responsibilities when you use
                our website. Please read them carefully.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>2. CHANGES</Typography>
              <Typography sx={styles.otherText}>
                Tkns LLC may amend the Terms at any time by posting a revised
                version on our website. The revised version will be effective at
                the time we post it. If we change the Terms in a way that
                reduces your rights or increases your responsibilities, we will
                provide you with a notification.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>3. ACCESS</Typography>
              <Typography sx={styles.otherText}>
                You are granted a non-exclusive, limited, and revocable license
                to access the website and use its functionality on the condition
                that:
              </Typography>
              <Typography style={styles.otherText}>
                (a) You are over the age of 13 and have the consent of your
                parent and/or legal guardian to play;
                <Typography sx={styles.otherText}>
                  {" "}
                  (b) You only use the website for lawful purposes;
                </Typography>{" "}
                <Typography style={styles.otherText}>
                  (c) You do not engage in any improper, indecent or offensive
                  behavior while using the website;
                </Typography>{" "}
                <Typography sx={styles.otherText}>
                  (d) You are not breaking any law in your relevant jurisdiction
                  by accessing this website.
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                4. YOUR DETAILS AND VISITS TO THIS WEBSITE
              </Typography>
              <Typography sx={styles.otherText}>
                When you use this website, you agree to the processing of the
                information and details and you state that all information and
                details provided are true and correspond to reality.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>5. PROHIBITED USES</Typography>
              <Typography sx={styles.otherText}>
                You may not use, or encourage, promote, facilitate, instructor,
                induce others to use, the website or website services for any
                activities that violate any law, statute, ordinance, or
                regulation; for any other illegal or fraudulent purpose or any
                purpose that is harmful to others; or to transmit, store,
                display, distribute or otherwise make available content that is
                illegal, fraudulent or harmful to others.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>6. SECURITY</Typography>
              <Typography sx={styles.otherText}>
                TknsLLC ensures the protection and honesty of the data it
                gathers by utilizing fitting authoritative conventions,
                specialized shields, and actual security controls intended to
                restrict access, identify and forestall the unapproved access,
                inappropriate divulgence, adjustment, or obliteration of the
                data under its influence.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>7. TERMINATION</Typography>
              <Typography sx={styles.otherText}>
                <Typography sx={styles.otherText}>
                  7.1 Tkns LLC reserves the right to change, suspend, limit or
                  discontinue any of its services, in whole or in part at any
                  time for any reason, without notice (unless required by law).
                </Typography>
                <Typography sx={styles.otherText}>
                  7.2 Tkns LLC may refuse service to anyone and may terminate or
                  suspend your services and your access to the website in whole
                  or in part at any time, for any reason, without notice (unless
                  required by law).{" "}
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>8. DISCLAIMER</Typography>
              <Typography sx={styles.otherText}>
                You understand that the services and/or the game is not a game
                of luck therefore you are required to have and apply the
                necessary skill in order to succeed.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>9. LIMITATIONS</Typography>
              <Typography sx={styles.otherText}>
                In no event will Tkns LLC be liable to you for any indirect,
                incidental, special, consequential or punitive damages
                (including damages for loss of profits, goodwill, or any other
                intangible loss) arising out of or relating to your access to or
                use of, or your inability to access or use, the website or any
                materials or content available through the website, whether
                based on warranty, contract, tort (including negligence),
                statute, or any other legal theory, and whether or not Tkns LLC
                has been informed of the possibility of damage.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>10. IDEMNIFICATION</Typography>
              <Typography sx={styles.otherText}>
                You agree that you will be responsible for your use of the
                website, and you agree to defend and indemnify Tkns LLC from and
                against every claim, liability, damage, loss, and expense,
                including reasonable attorneys’ fees and costs, arising out of
                or in any way connected with: (i) your access to, use of, or
                alleged use of, the website; (ii) your violation of any portion
                of these Terms, any representation, warranty, or agreement
                referenced in these Terms, or any applicable law or regulation;
                (iii) your violation of any third party right, including any
                intellectual property right or publicity, confidentiality, other
                property, or privacy right; or (iv) any dispute or issue between
                you and any third party.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                11. CONDITIONS OF PARTICIPATION
              </Typography>
              <Typography sx={styles.otherText}>
                <Typography sx={styles.otherText}>
                  11.1 The prerequisite for using the gaming platform is
                  registered with the organizer. The registration is free of
                  charge. Multiple registrations by one game participant are not
                  permitted.
                </Typography>
                <Typography sx={styles.otherText}>
                  11.2 In order to register, the player must complete a
                  registration form. The player chooses a player name and a
                  password as access data. The player must provide the data
                  requested in the registration form completely and correctly.
                  It is prohibited to register using extraneous or otherwise
                  inaccurate information. The organizer shall confirm receipt of
                  the details submitted to the organizer with the registration
                  by sending an e-mail to the e-mail address provided by the
                  player during registration.
                </Typography>
                <Typography sx={styles.otherText}>
                  11.3. If the player subsequently wishes to participate in
                  games with monetary stakes, he must deposit means of payment
                  and corresponding payment data in the further course. This can
                  be done at any time and is also free of charge.
                </Typography>
                <Typography sx={styles.otherText}>
                  11.4. There is no entitlement to the conclusion of a contract
                  of use. The organizer can reject a registration without giving
                  reasons. In this case, the organizer will delete the
                  transmitted data immediately.
                </Typography>
                <Typography sx={styles.otherText}>
                  11.5 Only persons with unlimited legal capacity who are at
                  least 18 years (11.6) old are admitted to registration.
                </Typography>
                <Typography sx={styles.otherText}>
                  11.6. You are over the age of 13 and have the consent of your
                  parent and/or legal guardian to play. (11.7. does not apply)
                </Typography>
                <Typography sx={styles.otherText}>
                  11.7 The organizer will verify the age of the registered game
                  participants by appropriate means and block underage persons.
                  Minors have no right to win.{" "}
                </Typography>
                <Typography sx={styles.otherText}>
                  11.8 Any player may be blocked from the gaming platform by the
                  organiser for good cause. Good cause shall be deemed to exist,
                  in particular, if the virtual betting account is not covered,
                  if a credit check carried out has been negative, if the player
                  has registered several times, if the player has attempted to
                  influence the outcome of games by unfair means in the past or
                  if there has been any other serious breach of these General
                  Terms and Conditions, so that further participation in the
                  game by the player is no longer reasonable for the organiser.
                  In such a case, the stakes will be refunded.
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                12. PERFORMANCE OF GAMES OF SKILL
              </Typography>
              <Typography sx={styles.otherText}>
                12.1 Only players who have the skill level specified in the
                match announcement or a lower skill level may participate in the
                matches. The skill level of a player is determined on a
                game-by-game basis. It increases and decreases depending on the
                success of the participant in previous participations in the
                specific game. When participating for the first time, the player
                starts with the lowest skill level.
              </Typography>
              <Typography sx={styles.otherText}>
                12.2 In real-time games, a maximum of the number of participants
                specified in the game announcement will participate at the same
                time. In the case of certain real-time games, the game will not
                start until a sufficient number of players have registered for
                the game. The required number of players is specified in the
                game announcement. This is indicated to the player by the number
                of players required and the number of players already
                registered. Up to the start of the game, the player can revoke
                his participation in the real-time game at any time. Once the
                required number of players has been found, the game starts
                automatically, which is indicated by information on the screen
                and the transfer of the stake required for money games. The
                winner of the game is the player who has won the game according
                to the given game rules. After the end of the game, the winner
                is notified directly in the game about the outcome of the game
                and a possible prize.
              </Typography>
              <Typography sx={styles.otherText}>
                12.3 In the case of time-shifted games, each game participant
                who registers for a game round after the game has been announced
                will participate. Each individual game participant starts his
                personal game round immediately after his registration, so that
                all game participants of the gameplay at different times.
                Depending on the game type, the player is entitled to repeat or
                only one game participation. This distinction is tied to whether
                repeated participation in a game round provides a specific
                advantage. The number of players specified in the match
                announcement must participate in the staggered matches. In order
                to find the necessary players, a validity window is defined for
                each game offer, in which players can find each other. Once this
                number of participants has been reached and all players have
                completed their game round, the game is over and participation
                is no longer possible. The organizer then determines which game
                participant has achieved the best result, taking into account
                the rules of the game. However, the player is able to
                unsubscribe from this confirmation mail and only view the
                information online in the "game account".
              </Typography>
              <Typography sx={styles.otherText}>
                12.4 By participating in a game for which a fee is charged, the
                participants in the game make mutual declarations of intent by
                which a gaming contract is concluded. The organizer is the
                receiving agent for these declarations of intent of the
                respective other players. When the number of participants
                required by the game announcement has been reached, a game
                contract has been concluded between all participants. According
                to the concluded game contract, the winner of the game is the
                one who has achieved the best result according to the game rules
                specified by the organizer. In the case of a tie in points, the
                winner is the one who has presented the corresponding score or
                has been better in other provable game contents. This is
                described as the "challenge principle". In case of doubt, the
                organizer has the right to act as referee to determine the
                winner.{" "}
              </Typography>
              <Typography sx={styles.otherText}>
                12.7 If - for example, due to a malfunction - the match is not
                completed in accordance with the rules, the match shall be
                deemed not to have taken place. The organizer reserves the right
                to suspend, cancel or postpone the game in whole or in part
                without prior notice. This applies if the game cannot be played
                as scheduled for reasons unforeseeable by the organizer and
                beyond the organizer's control. Such circumstances include, but
                are not limited to, hardware or software failure, the occurrence
                of a computer virus or program error, unauthorized third party
                intervention, and mechanical, technical or legal problems beyond
                the control and influence of the Promoter. In such cases,
                players will be refunded any stakes paid. If the cancellation of
                the game is due to the culpable violation of rules by a game
                participant, the organizer expressly reserves the right to
                assert claims, in particular claims for damages. We cannot
                accept any responsibility for the processing of such personal
                data by third parties.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                13. PARTICIPATION FEES AND PRIZES
              </Typography>
              <Typography sx={styles.otherText}>
                13.1 If a participation fee is stated for a match in the
                invitation to tender, this will be debited from the virtual
                stake account of the match participant after the player has
                registered.
              </Typography>
              <Typography sx={styles.otherText}>
                13.2 Unless otherwise stated in the game announcement, the
                winner of a fee-based game receives 90% of the entry fees paid
                by the entirety of the participating game participants as
                winnings. 10% of the entry fees shall be paid to the organizer
                as a handling fee for the organization and processing of the
                game.
              </Typography>
              <Typography sx={styles.otherText}>
                13.3 An attempt will be made to credit the winnings to the
                player's virtual betting account held with reaver immediately
                after the result has been determined. If this is not possible
                directly for technical reasons, the credit will be carried out
                again and the winnings will be credited within 24 hours at the
                latest.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                14. GENERAL OBLIGATIONS OF THE PLAYERS
              </Typography>
              <Typography sx={styles.otherText}>
                14.1 Multiple registrations are not permitted.{" "}
              </Typography>
              <Typography sx={styles.otherText}>
                14.2 The password for the access-protected area of the
                organizer’s website must be kept strictly secret by the player
                and changed at regular intervals (every four weeks at the
                latest). If the player violates these duties of care and an
                unauthorized third party makes dispositions based on knowledge
                of the required password, the player shall be liable for any
                unauthorized use of his/her password made possible by his/her
                conduct and the associated use of the gaming platform. As soon
                as the player becomes aware that his password has become
                accessible to third parties, he is obliged to change his
                password immediately. If this is not possible, the organizer
                must be informed immediately.
              </Typography>
              <Typography sx={styles.otherText}>
                14.3 The aforementioned also applies to the transfer of access
                data to a third party. Passing on access data is generally not
                permitted and can lead to the blocking of the entire player
                account.
              </Typography>
              <Typography sx={styles.otherText}>
                14.4 Any change in the personal data of the player (in
                particular the account details, address, and e-mail address)
                must be reported immediately on the personal settings page.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>15. ENTIRE AGREEMENT</Typography>
              <Typography sx={styles.otherText}>
                This Agreement contains the entire agreement and understanding
                among the parties hereto with respect to the subject matter
                hereof, and supersedes all prior and contemporaneous agreements,
                understandings, inducements and conditions, express or implied,
                oral or written, of any nature whatsoever with respect to the
                subject matter hereof.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewTOS;

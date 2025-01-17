import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../context/NewStoreContext";
import createTheme from "../utils/theme";

const NewPrivacyPolicy = () => {
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
                1. General information and principles of data processing
              </Typography>
              <Typography sx={styles.otherText}>
                We are pleased that you are visiting our website. The protection
                of your privacy and the protection of your personal data, the
                so-called personal data, when using our website is an important
                concern for us. According to Art. 4 No. 1 of the GDPR, personal
                data is any information relating to an identified or
                identifiable natural person. This includes, for example,
                information such as your first and last name, your address, your
                telephone number, your e-mail address, but also your IP address.
                Data for which no reference to your person can be established,
                such as through anonymisation, is not personal data. Processing
                (e.g. collecting, storing, reading, querying, using,
                transmitting, deleting or destroying) according to Art. 4 No. 2
                DS-GVO always requires a legal basis or your consent. Processed
                personal data must be deleted as soon as the purpose of the
                processing has been achieved and there are no longer any legally
                prescribed retention obligations to uphold. Here you will find
                information about the handling of your personal data when
                visiting our website. In order to provide the functions and
                services of our website, it is necessary for us to collect
                personal data about you. We also explain to you the type and
                scope of the respective data processing, the purpose and the
                corresponding legal basis and the respective storage period.
                This data protection declaration only applies to this website.
                It does not apply to other websites to which we merely refer by
                means of a hyperlink. We cannot accept any responsibility for
                the confidential handling of your personal data on these
                third-party websites, as we have no influence on whether these
                companies comply with data protection regulations. Please inform
                yourself about the handling of your personal data by these
                companies directly on these websites.
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>2. responsible body</Typography>
              <Typography sx={styles.otherText}>
                Responsible for the processing of personal data on this website
                is: Gameside LLC 651 N. Broad St., Suite 206 Middletown DE 19709
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={styles.header}>
                3. provision and use of the website/server logfiles
              </Typography>
              <Typography sx={styles.otherText}>
                (a) the nature and extent of data processing If you use this
                website without transmitting data to us in any other way (e.g.
                by registering or using the contact form), we collect
                technically necessary data via server log files that are
                automatically transmitted to our server, including: IP address
                Date and time of the request Name and URL of the retrieved file
                Website from which the access is made (referrer URL) Access
                status/HTTP status code Browser type (b) Purpose and legal basis
                This processing is technically necessary in order to be able to
                display our website to you. We also use the data to ensure the
                security and stability of our website. The legal basis for this
                processing is Art. 6 (1) lit. f) DS-GVO. The processing of the
                aforementioned data is necessary for the provision of a website
                and thus serves to protect a legitimate interest of our company.
                c) Storage period As soon as the aforementioned personal data is
                no longer required to display the website, it will be deleted.
                The collection of the data for the provision of the website and
                the storage of the data in log files is mandatory for the
                operation of the website. Consequently, there is no possibility
                for the user to object to this aspect. Further storage may take
                place in individual cases if this is required by law. 4. use of
                cookies a) Nature, scope and purpose of data processing We use
                cookies. Cookies are small files that are sent by us to the
                browser of your terminal device during your visit to our website
                and stored there. Some functions of our website cannot be
                offered without the use of technically necessary cookies. Other
                cookies, on the other hand, enable us to perform various
                analyses. For example, some cookies can recognise the browser
                you are using when you visit our website again and transmit
                various information to us. We use cookies to facilitate and
                improve the use of our website. Among other things, cookies
                enable us to make our website more user-friendly and effective
                for you by, for example, tracking your use of our website and
                determining your preferred settings (e.g. country and language
                settings). If third parties process information via cookies,
                they collect the information directly from your browser.
                However, cookies do not cause any damage to your end device.
                They cannot execute programs or contain viruses. Various types
                of cookies are used on our website, the type and function of
                which are explained below. Temporary cookies/ session cookies On
                our website, so-called temporary cookies or session cookies are
                used, which are automatically deleted as soon as you close your
                browser. This type of cookie makes it possible to record your
                session ID. This allows various requests from your browser to be
                assigned to a common session and makes it possible to recognise
                your terminal device during subsequent visits to the website.
                Permanent cookies So-called permanent cookies are used on our
                website. Permanent cookies are cookies that are stored in your
                browser for a longer period of time and can transmit
                information. The respective storage period differs depending on
                the cookie. You can delete permanent cookies independently via
                your browser settings. Third-party cookies We use analytical
                cookies to monitor anonymised user behaviour on our website. We
                also use advertising cookies. These cookies allow us to track
                user behavior for advertising and targeted marketing purposes.
                Social media cookies allow us to connect to your social networks
                and share content from our website within your networks.
                Configuration of the browser settings Most web browsers are
                preset to automatically accept cookies. However, you can
                configure your browser so that it only accepts certain cookies
                or not at all. However, we would like to point out that you may
                then no longer be able to use all the functions of our website.
                You can also delete cookies already stored in your browser via
                your browser settings. Furthermore, it is possible to set your
                browser so that it notifies you before cookies are stored. Since
                the various browsers can differ in their respective functions,
                we ask you to use the respective help menu of your browser for
                the corresponding configuration options. Disabling the use of
                cookies may require the storage of a permanent cookie on your
                computer. If you subsequently delete this cookie, you will need
                to deactivate it again. (b) Legal basis Based on the purposes
                described, the legal basis for the processing of personal data
                using cookies is Art. 6 (1) lit. f) DS-GVO. If you have given us
                your consent to the use of cookies on the basis of a notice
                ("cookie banner") issued by us on the website, the legal basis
                is additionally Art. 6 (1) lit. a) DS-GVO. c) Storage period As
                soon as the data transmitted to us via the cookies is no longer
                required for the purposes described above, this information is
                deleted. Further storage may take place in individual cases if
                this is required by law. 5. data collection for the execution of
                pre-contractual measures and for the fulfilment of the contract
                (a) the nature and extent of data processing In the
                pre-contractual area and at the conclusion of the contract, we
                collect personal data about you. This concerns, for example,
                first and last name, address, e-mail address, telephone number
                or bank details. b) Purpose and legal basis of the data
                processing We collect and process this data exclusively for the
                purpose of executing the contract or fulfilling pre-contractual
                obligations. The legal basis for this is Art. 6 para. 1 lit b)
                DS-GVO. If you have also given your consent, the additional
                legal basis is Art. 6 para. 1 lit. a) DS-GVO. c) Storage period
                The data shall be deleted as soon as they are no longer
                necessary for the purpose for which they were processed. In
                addition, there may be legal obligations to retain data, for
                example, obligations to retain data under commercial or tax law
                in accordance with the German Commercial Code (HGB) or the
                German Fiscal Code (AO). If such retention obligations exist, we
                will block or delete your data at the end of these retention
                obligations. 6. order form There is an order form on our website
                that can be used for electronic pre-orders. (a) the nature and
                extent of data processing Our data collection is limited to the
                following data: • First and last name • Phone number • E-mail
                address • Account details • Name of the product (b) Purpose and
                legal basis The purpose of the data processing is to be able to
                process your order properly. The legal basis for this is Art. 6
                para. 1 lit. b) DS-GVO. The processing of the data serves the
                fulfilment of a contract, or is necessary for the implementation
                of a pre-contractual measure, which has taken place at the
                request of the data subject. c) Storage period The data will be
                deleted as soon as they are no longer needed to achieve the
                purpose of the processing. In addition, there may be legal
                obligations to retain data, for example, obligations to retain
                data under commercial or tax law in accordance with the German
                Commercial Code (HGB) or the German Fiscal Code (AO). If such
                retention obligations exist, we will block or delete your data
                at the end of these retention obligations. 7. registration
                possibility (a) the nature and extent of data processing You can
                register on our website. If you register, we collect and store
                the data you enter in the input mask (e.g. last name, first
                name, e-mail address). This data will not be passed on to third
                parties. b) Purpose and legal basis of the data processing Your
                registration is necessary for the use of certain content and
                services on our website or for the performance of a contract or
                for the implementation of pre-contractual measures. After
                registration, you are free to change the personal data provided
                during registration at any time or to have it completely deleted
                from the data stock of the controller. In the case of consent,
                the legal basis for processing is Art. 6 (1) a) DS-GVO. If your
                registration serves to prepare the conclusion of a contract,
                Art. 6 (1) (b) DS-GVO is an additional legal basis. c) Storage
                period The data collected during registration will be stored by
                us for as long as you are registered on our website and will
                then be deleted. Legal retention periods remain unaffected. In
                addition, your registered personal data will be deleted when you
                8. data transmission We will only share your personal
                information with third parties if: a) you have given your
                express consent to this in accordance with Art. 6 (1) a) DS-GVO.
                b) this is legally permissible and necessary according to Art. 6
                (1) lit. b) DS-GVO for the fulfilment of a contractual
                relationship with you or the implementation of pre-contractual
                measures. c) there is a legal obligation for the transfer
                according to Art. 6 Para. 1 lit. c) DS-GVO. We are legally
                obliged to transmit data to state authorities, e.g. tax
                authorities, social insurance agencies, health insurance
                companies, supervisory authorities and law enforcement agencies.
                d) the disclosure is necessary in accordance with Art. 6 Para. 1
                lit. f) DS-GVO for the protection of legitimate company
                interests, as well as for the assertion, exercise or defence of
                legal claims and there is no reason to assume that you have an
                overriding interest worthy of protection in the non-disclosure
                of your data. e) in accordance with Art. 28 DS-GVO, we make use
                of external service providers, so-called order processors, who
                are obliged to handle your data with care. We use such service
                providers in the areas of: • IT • Logistics • Telecommunications
                When transferring data to external bodies in third countries,
                i.e. outside the EU or the EEA, we ensure that these bodies
                treat your personal data with the same care as within the EU or
                the EEA. We only transfer personal data to third countries for
                which the EU Commission has confirmed an adequate level of
                protection or if we ensure the careful handling of the personal
                data through contractual agreements or other suitable
                guarantees. 9. application possibility a) Type and scope of data
                processing You can apply on our website or by e-mail. When you
                apply, we collect and store the data that you enter in the input
                mask or that you send us by e-mail. b) Purpose and legal basis
                We process your data only for the purpose of processing your
                application. Your data will not be passed on to third parties.
                The legal basis for the processing is Art. 88 (1) DS-GVO in
                conjunction with. § 26 BDSG and additionally Art. 6 para. 1 lit.
                b) DS-GVO. If you give us your consent to include you in our
                pool of applicants, the legal basis is Art. 6 (1) a) DS-GVO. c)
                Storage period If we are unable to offer you a position, we will
                store your data for a maximum of six months after the end of the
                application process, taking into account Section 61b (1) ArbGG
                in conjunction with Section 15 AGG. § 15 AGG. The start of the
                period is the receipt of the rejection letter. If you have given
                us permission to include you in our applicant pool, we will
                store your data for a maximum of two years. d) Data transfer
                Your data will only be disclosed to the departments involved in
                the decision-making process (responsible personnel or specialist
                departments, management, works council). In addition, we are
                obliged to disclose your data to public bodies and institutions
                (e.g. public prosecutor's office, police, supervisory
                authorities, tax office, social security institutions, etc.).
                Further data recipients may be those bodies for which you have
                given us your consent to transfer data. 10. comment function (a)
                the nature and extent of data processing You can comment on
                articles on our website. When you comment on a post, we collect
                and store the data you enter in the input mask. In addition to
                the comments you leave, information on the time of comment entry
                and possibly the user name (pseudonym) you have chosen will also
                be stored and published. Furthermore, the IP address assigned by
                the Internet service provider (ISP) of the person concerned is
                stored. A transfer to third parties does not take place. (b)
                Purpose and legal basis The data transmitted by you (e.g. the IP
                address) is used for security reasons and in the event that the
                person concerned infringes the rights of third parties by
                posting a comment or posts illegal content. No disclosure of
                this personal data collected will be made to third parties,
                unless such disclosure is required by law or is necessary for
                the legal defence of the controller. The legal basis for the
                processing of personal data transmitted when using the comment
                function is, if and insofar as your consent is given, Art. 6
                para. 1 lit. a) DS-GVO. You can revoke this consent at any time.
                The legality of the data processing operations already carried
                out remains unaffected by the revocation. Further legal basis is
                Art. 6 para. 1 lit. f) DS-GVO. We have a legitimate interest in
                processing if third party rights are violated or illegal content
                is posted. This is for security purposes in case someone writes
                unlawful content in comments and posts (insults, forbidden
                political propaganda, etc.). c) Storage period The comments and
                the associated data (e.g. IP address) are stored and remain on
                our website until the commented content has been completely
                deleted or the comments have to be deleted for legal reasons.
                11. contact form (a) the nature and extent of data processing On
                our website, we offer you the opportunity to contact us via a
                form provided. In the context of sending your request via the
                contact form, reference is made to this data protection
                declaration in order to obtain your consent. If you make use of
                the contact form, the following personal data will be processed:
                - salutation -first name - last name - title -Company - line of
                work - function - street - street number - postal code -Location
                - country - email address - telephone number - subject - Message
                content (b) Purpose and legal basis The specification of your
                e-mail address serves the purpose of sending you an answer to
                your inquiry by e-mail. When using the contact form, your
                personal data will not be passed on to third parties. The legal
                basis for the processing is consent in accordance with Art. 6
                Para. 1 lit. a) DS-GVO on the basis of the declaration of
                consent given voluntarily by you in the following and which can
                be revoked at any time for the future: c) Storage period The
                data you enter in the contact form will remain with us until you
                request us to delete it, revoke your consent to store it, or the
                purpose for storing the data no longer applies (e.g. after we
                have completed processing your request). Mandatory statutory
                provisions - in particular retention periods in accordance with
                the German Commercial Code (HGB) or the German Fiscal Code (AO)
                - remain unaffected by this. 12. contact possibilities by e-mail
                On our website you have the possibility to contact us by e-mail.
                (a) the nature and extent of data processing You can contact us
                by e-mail. Our data collection is limited to the e-mail address
                of the e-mail account used by you to contact us as well as the
                personal data provided by you as part of the contact. (b)
                Purpose and legal basis The purpose of the data processing is to
                be able to answer your request appropriately. The legal basis
                for this is Art. 6 para. 1 lit. f) DS-GVO. There is a legitimate
                interest in the processing of the above-mentioned personal data
                in order to be able to process your request appropriately. c)
                Storage period The duration of the storage of the above data
                depends on the background of your contact. Your personal data
                will be deleted regularly if the purpose of the communication no
                longer applies and storage is no longer necessary. This may
                result, for example, from the processing of your request. 13.
                newsletter (a) the nature and extent of data processing On our
                website there is the possibility to subscribe to a free regular
                e-mail newsletter. In order to be able to send you the
                newsletter regularly, we need your e-mail address. For the
                newsletter dispatch we use the so-called double opt-in
                procedure. This means that we will only send you an e-mail
                newsletter once you have expressly confirmed that you consent to
                receiving the newsletter. We will then send you a confirmation
                e-mail asking you to confirm that you wish to receive future
                newsletters from us by clicking on an appropriate link. This
                serves to ensure that only you, as the owner of the specified
                e-mail address, can subscribe to the newsletter. Your
                confirmation must take place promptly after receipt of the
                confirmation email, otherwise your newsletter registration will
                be automatically deleted from our database. When you subscribe
                to the newsletter, we collect and store the data you enter in
                the input mask (e.g. last name, first name, e-mail address).
                When you register for the newsletter, we also store your IP
                address entered by your Internet service provider (ISP) as well
                as the date and time of registration in order to be able to
                trace any possible misuse of your e-mail address at a later
                date. In the case of the confirmation e-mail sent for control
                purposes (double opt in e-mail), we also save the date and time
                of the click on the confirmation link and the IP address entered
                by the Internet service provider (ISP). (b) Purpose and legal
                basis The data collected by us when you register for the
                newsletter will be used exclusively for the purpose of
                advertising in the newsletter. The processing of your e-mail
                address for the newsletter dispatch is based, in accordance with
                Art. 6 Para. 1 lit. a) DS-GVO and § 7 Para. 2 No. 3 UWG, on the
                declaration of consent given voluntarily by you below, which can
                be revoked at any time for the future. In addition, the
                processing is based Art. 6 para 1 lit f) DS-GVO due to
                legitimate interests of us to document the proof of the required
                consent. c) Storage period Your e-mail address will be stored as
                long as you have subscribed to the newsletter. After
                unsubscribing from the newsletter, your email address will be
                deleted unless you have expressly consented to further use of
                your data. 14. tracking and analysis tools An exact overview of
                the web analytics and social media tools we use can be found
                here . 15. data security and backup measures We are committed to
                protecting your privacy and treating your personal data
                confidentially. To this end, we take extensive technical and
                organizational security precautions, which are regularly
                reviewed and adapted to technological progress. This includes,
                among other things, the use of recognized encryption methods
                (SSL or TLS). However, data disclosed unencrypted, for example,
                if this is done by unencrypted e-mail, can possibly be read by
                third parties. We have no influence on this. It is the
                responsibility of the respective user to protect the data
                provided by him or her against misuse by means of encryption or
                in any other way. 16. changes to the privacy policy We reserve
                the right at any time to update this statement as necessary.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPrivacyPolicy;

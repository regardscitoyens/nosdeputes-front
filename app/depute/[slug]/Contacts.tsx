import * as React from "react";

import {
  List,
  ListItem,
  Box,
  Paper,
  Stack,
  Typography,
  ListItemIcon,
} from "@mui/material";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  getActeurAdressesElectroniques,
  getActeurAdressesPostales,
} from "@/data/getActeurContacts";

/**
 * Types d'adresses existantes mais non affichées:
 *
 *  - 'Url sénateur': page peu mise a jour
 *  - 'Contact presse': seulement un acteur l'a
 *  - 'Télécopie': seul 3 deputés de la 16eme legislature consernés
 */

const internetPlatformsIcons = {
  "Site internet": PublicRoundedIcon,
  Twitter: XIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedInIcon,
};

const getHref = {
  "Site internet": (val: string) => `https://${val}`,
  Twitter: (val: string) => `https://x.com/${val}`,
  Facebook: (val: string) => `https://facebook.com/${val}`,
  Instagram: (val: string) => `https://instagram.com/${val}`,
  Linkedin: (val: string) => `https://linkedin.com/${val}`,
};

export default async function Contacts({ acteurUid }: { acteurUid: string }) {
  const [adressesElectroniques, adressesPostales] = await Promise.all([
    getActeurAdressesElectroniques(acteurUid),
    getActeurAdressesPostales(acteurUid),
  ]);

  const phoneAdresses = adressesElectroniques.filter(
    ({ typeLibelle }) => typeLibelle === "Téléphone"
  );

  const mailAdresses = adressesElectroniques.filter(
    ({ typeLibelle }) => typeLibelle === "Mèl"
  );

  const postalAdresses = adressesPostales.filter(({ typeLibelle }) =>
    typeLibelle.startsWith("Adresse ")
  );
  return (
    <Paper sx={{ p: 2, bgcolor: "grey.50", width: 300 }} elevation={0}>
      <Stack direction="column" spacing={1}>
        <Typography variant="subtitle1">Contacts</Typography>

        {/* Adresses physique */}
        <Box>
          <Typography variant="body2" fontWeight="light">
            Courier
          </Typography>
          <List>
            {postalAdresses.map(
              ({
                uid,
                intitule,
                numeroRue,
                nomRue,
                complementAdresse,
                codePostal,
                ville,
              }) => (
                <ListItem
                  key={uid}
                  disablePadding
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="light">
                    {intitule}
                  </Typography>
                  <Typography variant="caption">
                    {numeroRue} {nomRue}
                    <br />
                    {complementAdresse}
                    {complementAdresse && <br />}
                    {codePostal} {ville}
                  </Typography>
                </ListItem>
              )
            )}
          </List>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight="light">
            Email
          </Typography>
          <List>
            {mailAdresses.map(({ uid, valElec }) => (
              <ListItem
                key={uid}
                disablePadding
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="caption" fontWeight="light">
                  {valElec}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight="light">
            Téléphone
          </Typography>
          <List>
            {phoneAdresses.map(({ uid, valElec }) => (
              <ListItem
                key={uid}
                disablePadding
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="caption" fontWeight="light">
                  {valElec}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight="light">
            Internet
          </Typography>
          <List>
            {Object.keys(internetPlatformsIcons).flatMap((platform) =>
              adressesElectroniques
                .filter(({ typeLibelle }) => typeLibelle === platform)
                .map(({ uid, valElec }) => {
                  const Icon =
                    internetPlatformsIcons[
                      platform as keyof typeof internetPlatformsIcons
                    ];
                  const href =
                    valElec &&
                    getHref[platform as keyof typeof internetPlatformsIcons](
                      valElec
                    );
                  if (!href) {
                    return null;
                  }
                  return (
                    <ListItem
                      key={uid}
                      disablePadding
                      sx={{
                        mb: 1,
                      }}
                    >
                      <ListItemIcon sx={{ mr: 1, minWidth: 0 }}>
                        {<Icon fontSize="small" />}
                      </ListItemIcon>

                      <Typography
                        variant="caption"
                        fontWeight="light"
                        component="a"
                        target="_blank"
                        href={href}
                      >
                        {valElec}
                      </Typography>
                    </ListItem>
                  );
                })
            )}
          </List>
        </Box>
      </Stack>
    </Paper>
  );
}

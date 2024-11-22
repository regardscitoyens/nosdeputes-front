"use client";

import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { ClockMovingIcon } from "@/icons/ClockMovingIcon";

import throttle from "lodash/throttle";
import { WORDS_PER_MINUTES } from "../../../../../../components/const";
import { cleanText } from "../../../../../../components/folders/DebatTab/cleanText";
import { Paragraphe } from "@prisma/client";

const getDuration = (wordCount: number) =>
  Math.round(wordCount / WORDS_PER_MINUTES);

type DebateSummaryProps = {
  sections: Paragraphe[];
  wordsCounts: Record<string, number>;
};

const noop = () => {};

// From https://github.com/mui/material-ui/blob/8b66a36f3378d8c6c3554b44cd65fb2b61d28b64/docs/src/modules/components/AppTableOfContents.js
function useThrottledOnScroll(
  callback: ((args: any) => any) | null,
  delay: number
) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) {
      return undefined;
    }

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      if ("cancel" in throttledCallback) {
        throttledCallback.cancel();
      }
    };
  }, [throttledCallback]);
}

export function samePageLinkNavigation(event: React.MouseEvent<HTMLElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return true;
  }
  return false;
}

export const DebateSummary = (props: DebateSummaryProps) => {
  const { sections, wordsCounts } = props;
  const theme = useTheme();

  const [activeState, setActiveState] = React.useState<number | null>(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef<any>(null);
  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      // No id if we're near the top of the page
      if (document.documentElement.scrollTop < 200) {
        active = { id: null };
        break;
      }

      const item = sections[i];
      const node = document.getElementById(item.id.toString());

      if (process.env.NODE_ENV !== "production") {
        if (!node) {
          console.error(
            `Missing node on the item ${JSON.stringify(item, null, 2)}`
          );
        }
      }

      if (
        node &&
        node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.id) {
      setActiveState(active.id);
    }
  }, [activeState, sections]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(sections.length > 0 ? findActiveIndex : null, 166);

  const handleClick =
    (id: number) => (event: React.MouseEvent<HTMLElement>) => {
      // Ignore click events meant for native link handling, for example open in new tab
      if (samePageLinkNavigation(event)) {
        return;
      }

      // Used to disable findActiveIndex if the page scrolls due to a click
      clickedRef.current = true;
      unsetClickedRef.current = setTimeout(() => {
        clickedRef.current = false;
      }, 1000);

      if (activeState !== id) {
        setActiveState(id);
      }
    };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  return (
    <Accordion
      elevation={0}
      disableGutters
      defaultExpanded
      color="secondary"
      sx={{
        alignSelf: "flex-start",
        position: "sticky",
        top: 50,
      }}
    >
      <AccordionSummary
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Sommaire</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2} pb={3}>
          {sections.map(({ id, texte }, index) =>
            activeState === id || (activeState === null && index === 0) ? (
              <Box
                key={id}
                sx={{
                  backgroundColor: theme.palette.grey[900],
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  color="#fff"
                  component="a"
                  href={`#${id}`}
                  dangerouslySetInnerHTML={{ __html: cleanText(texte!) }}
                />
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <ClockMovingIcon sx={{ fontSize: "12px" }} fill="white" />
                  <Typography
                    color="#fff"
                    variant="caption"
                    fontWeight="light"
                  >
                    {getDuration(wordsCounts[id]) ?? "?"} minute
                    {getDuration(wordsCounts[id]) === 1 ? "" : "s"}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Typography
                key={id}
                component="a"
                href={`#${id}`}
                dangerouslySetInnerHTML={{ __html: cleanText(texte!) }}
                variant="body2"
                onClick={handleClick(id)}
              />
            )
          )}
        </Stack>
        {/* TODO: Ajouter ce message quand on a ajouté la page pour afficher le debat entier d'une seance. */}
        {/* <Typography variant="caption" fontWeight="light">
          Il s&apos;agit du sommaire concernant uniquement le dossier
          sélectionné ; pour accéder à l&apos;intégralité de la séance, veuillez
          cliquer ici
        </Typography> */}
      </AccordionDetails>
    </Accordion>
  );
};

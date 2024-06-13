import * as React from "react";

import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Stack from "@mui/material/Stack";
import { TimelineDot } from "@mui/lab";
import { cleanText } from "./cleanText";

interface ParoleItemProps {
  title: string | null;
  id?: string;
  withoutConnector?: boolean;
}

export default function SubSectionItem(props: ParoleItemProps) {
  const { title, withoutConnector, id } = props;

  return (
    <TimelineItem id={id}>
      <TimelineSeparator sx={{ minWidth: 50 }}>
        <TimelineDot />
        {!withoutConnector && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack direction="column" spacing={1}>
          <Typography
            variant="body2"
            fontWeight="light"
            component="h4"
            dangerouslySetInnerHTML={{ __html: cleanText(title ?? "") }}
          />
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
}

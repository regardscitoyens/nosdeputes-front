"use client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StatusChip from "@/components/StatusChip";
import LabelChip from "@/components/LabelChip";
import EnergyIcon from "@/icons/EnergyIcon";

export default function Page() {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h1">
          Title 1
        </Typography>
        <Typography fontWeight="bold" variant="h1">
          Title 1
        </Typography>
        <Typography fontWeight="regular" variant="h1">
          28px (h1)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h2">
          Title 2
        </Typography>
        <Typography fontWeight="bold" variant="h2">
          Title 2
        </Typography>
        <Typography fontWeight="regular" variant="h2">
          25px (h2)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h3">
          Title 3
        </Typography>
        <Typography fontWeight="bold" variant="h3">
          Title 3
        </Typography>
        <Typography fontWeight="regular" variant="h3">
          22px (h3)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h4">
          Title 4
        </Typography>
        <Typography fontWeight="bold" variant="h4">
          Title 4
        </Typography>
        <Typography fontWeight="regular" variant="h4">
          20px (h4)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="subtitle1">
          Subtitle
        </Typography>
        <Typography fontWeight="bold" variant="subtitle1">
          Subtitle
        </Typography>
        <Typography fontWeight="regular" variant="subtitle1">
          18px (subtitle1)
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography fontWeight="light" variant="body1">
          Body
        </Typography>
        <Typography fontWeight="regular" variant="body1">
          Body
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          Body
        </Typography>
        <Typography fontWeight="regular" variant="body1">
          16px (body1)
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography fontWeight="light" variant="body2">
          Small
        </Typography>
        <Typography fontWeight="regular" variant="body2">
          Small
        </Typography>
        <Typography fontWeight="bold" variant="body2">
          Small
        </Typography>
        <Typography fontWeight="regular" variant="body2">
          15px (body2)
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography fontWeight="light" variant="caption">
          Tiny
        </Typography>
        <Typography fontWeight="regular" variant="caption">
          Tiny
        </Typography>
        <Typography fontWeight="light" variant="caption">
          Tiny
        </Typography>
        <Typography fontWeight="bold" variant="caption">
          12px (caption)
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <StatusChip status="validated" label="Adopté" />
        <StatusChip status="review" label="1e lecture SE" />
        <StatusChip status="refused" label="Abrogé" />
        <StatusChip status="refused" label="Rejeté" />
        <StatusChip status="dropped" label="Non-soutenu" />
        <StatusChip status="review" label="1e lecture AN" />
        <StatusChip status="validated" label="Promulgué" />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <StatusChip size="small" status="validated" label="Adopté" />
        <StatusChip size="small" status="review" label="1e lecture SE" />
        <StatusChip size="small" status="refused" label="Abrogé" />
        <StatusChip size="small" status="refused" label="Rejeté" />
        <StatusChip size="small" status="dropped" label="Non-soutenu" />
        <StatusChip size="small" status="review" label="1e lecture AN" />
        <StatusChip size="small" status="validated" label="Promulgué" />
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <LabelChip label="Label" icon={<EnergyIcon />} />
        <LabelChip label="Label" onDelete={() => {}} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <LabelChip size="small" label="Label" />
        <LabelChip size="small" label="Label" onDelete={() => {}} />
      </Stack>
    </div>
  );
}

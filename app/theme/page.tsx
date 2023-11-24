import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h2">
          Title 2
        </Typography>
        <Typography fontWeight="bold" variant="h2">
          Title 2
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h3">
          Title 3
        </Typography>
        <Typography fontWeight="bold" variant="h3">
          Title 3
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="h4">
          Title 4
        </Typography>
        <Typography fontWeight="bold" variant="h4">
          Title 4
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography fontWeight="regular" variant="subtitle1">
          Subtitle
        </Typography>
        <Typography fontWeight="bold" variant="subtitle1">
          Subtitle
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
      </Stack>

      <Stack direction="row" spacing={2}>
        <Typography fontWeight="light" variant="caption">
          Tiny
        </Typography>
        <Typography fontWeight="regular" variant="caption">
          Tiny
        </Typography>
        <Typography fontWeight="bold" variant="caption">
          Tiny
        </Typography>
      </Stack>
    </div>
  );
}

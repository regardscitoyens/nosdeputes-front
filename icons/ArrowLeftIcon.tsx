import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const ArrowLeftIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.66562 9L9.03229 14.6L7.66667 16L0 8L7.66667 0L9.03229 1.4L3.66562 7H15.3333V9H3.66562Z"
          fill="#171B1E"
        />
      </svg>
    </SvgIcon>
  );
};

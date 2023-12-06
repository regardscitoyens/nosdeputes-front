import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const ArrowRightIcon = (props: SvgIconProps) => {
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
          d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
          fill="#171B1E"
        />
      </svg>
    </SvgIcon>
  );
};

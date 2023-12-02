import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function MinusIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path d="M0 7.83325V5.83325H14V7.83325H0Z" fill="#171B1E" />
      </svg>
    </SvgIcon>
  );
}

import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function LinkIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <path
          d="M6.3 11H3.5C2.53167 11 1.70625 10.6588 1.02375 9.97625C0.34125 9.29375 0 8.46833 0 7.5C0 6.53167 0.34125 5.70625 1.02375 5.02375C1.70625 4.34125 2.53167 4 3.5 4H6.3V5.4H3.5C2.91667 5.4 2.42083 5.60417 2.0125 6.0125C1.60417 6.42083 1.4 6.91667 1.4 7.5C1.4 8.08333 1.60417 8.57917 2.0125 8.9875C2.42083 9.39583 2.91667 9.6 3.5 9.6H6.3V11ZM4.2 8.2V6.8H9.8V8.2H4.2ZM7.7 11V9.6H10.5C11.0833 9.6 11.5792 9.39583 11.9875 8.9875C12.3958 8.57917 12.6 8.08333 12.6 7.5C12.6 6.91667 12.3958 6.42083 11.9875 6.0125C11.5792 5.60417 11.0833 5.4 10.5 5.4H7.7V4H10.5C11.4683 4 12.2937 4.34125 12.9762 5.02375C13.6587 5.70625 14 6.53167 14 7.5C14 8.46833 13.6587 9.29375 12.9762 9.97625C12.2937 10.6588 11.4683 11 10.5 11H7.7Z"
          fill="#171B1E"
        />
      </svg>
    </SvgIcon>
  );
}

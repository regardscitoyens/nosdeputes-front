import * as React from "react";

type CircleDivProps = {
  color: string;
  /**
   * The diameter of the circle (in px)
   * @default 16
   */
  size?: number;
  style?: React.CSSProperties;
};
export default function CircleDiv({ color, size = 16, style }: CircleDivProps) {
  return (
    <div
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

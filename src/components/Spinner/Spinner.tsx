/** @jsxImportSource @emotion/react */

interface Props {
  size: number;
  center?: boolean;
}

export const Spinner: React.FC<Props> = ({ size, center = false }) => {
  return (
    <div
      css={{
        margin: center ? "auto" : 0,
        "& > svg": {
          display: "block",
        },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${size}rem`}
        height={`${size}rem`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        role="img"
        data-testid="spinner"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.46511627906976744s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

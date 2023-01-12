import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode[];
  className?: string;
  childrenCount: number;
}

interface GridElementProps {
  childrenCount: number;
}

const GridElement = styled.div<GridElementProps>`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(
    ${(props) => (props.childrenCount < 5 ? 5 : "auto-fit")},
    minmax(200px, 1fr)
  );
  grid-gap: 2rem;
  margin-top: 2rem;
`;

export const Grid: React.FC<Props> = ({
  children,
  className,
  childrenCount,
}) => {
  return (
    <GridElement childrenCount={childrenCount} className={className}>
      {children}
    </GridElement>
  );
};

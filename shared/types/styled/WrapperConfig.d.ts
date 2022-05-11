type WrapperConfig = {
  sub?: string;
  as?: string;
  defaultCss?: (props: React.CSSProperties) => FlattenSimpleInterpolation;
  baseCss?: (props: React.CSSProperties) => FlattenSimpleInterpolation;
  children?: JSX.Element;
};

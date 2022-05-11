import React from "react";
import { Box, H1 } from "@bigcommerce/big-design";

export default function PageLayout({ title, children }): JSX.Element {
  return (
    <Box
      paddingHorizontal={{
        mobile: "none",
        tablet: "xLarge",
        desktop: "xxxLarge"
      }}
      paddingBottom={{ mobile: "small", tablet: "xLarge", desktop: "xxxLarge" }}
    >
      <H1>{title}</H1>

      {children}
    </Box>
  );
}

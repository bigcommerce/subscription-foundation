import React, { useEffect, useState } from "react";
import { Button, ButtonProps } from "@bigcommerce/big-design";

class AsyncButtonProps {
  handler?: () => Promise<any>;
}

const Products = (props: ButtonProps & AsyncButtonProps): JSX.Element => {
  const [loading, setLoading] = useState(null);
  const onClick = async () => {
    setLoading(true);
    try {
      if (props.handler) {
        await props.handler();
      }
      if (props.onClick) {
        await props.onClick(null);
      }
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    setLoading(props.isLoading);
  }, [props.isLoading]);
  return <Button {...props} isLoading={loading} onClick={onClick} />;
};

export default Products;

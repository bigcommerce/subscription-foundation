import ProductImagePayload from "@/shared/payloads/product/ProductImagePayload";
import { Flex, Link, Text } from "@bigcommerce/big-design";
import { truncate } from "lodash";
import styled from "styled-components";

const StyledImg = styled.img<{ size: string }>`
  border-radius: 6px;
  height: auto;
  max-height: ${props => props.size};
  max-width: ${props => props.size};
  width: auto;
  display: inline-block;
  align-items: center;
  background-color: #fff;
  border: 1px solid #d1d7e0;
  margin-right: 1.5rem;
`;

const ThumbnailWithName = ({
  image,
  name,
  size,
  onClick
}: {
  image: ProductImagePayload;
  name?: string;
  size?: string;
  onClick?: any;
}): JSX.Element => {
  const truncated = truncate(name, {
    length: 40
  });
  return (
    <Flex alignItems="center">
      <StyledImg
        size={size ? size : "3.2rem"}
        src={image?.url_thumbnail ?? "/images/default-product.svg"}
      />
      {!!name &&
        (onClick ? (
          <Link onClick={onClick}>{truncated}</Link>
        ) : (
          <Text>{truncated}</Text>
        ))}
    </Flex>
  );
};

export default ThumbnailWithName;

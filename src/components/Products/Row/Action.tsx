import { Button, Dropdown } from "@bigcommerce/big-design";
import {
  EditIcon,
  MoreHorizIcon,
  OpenInNewIcon
} from "@bigcommerce/big-design-icons";

const ProductRowAction = ({ product, store, setIsOpen }): JSX.Element => {
  return (
    <Dropdown
      maxHeight={250}
      items={[
        {
          content: "Edit",
          onItemClick: () => setIsOpen(product),
          hash: "edit",
          icon: <EditIcon />
        },
        {
          content: "View on Storefront",
          icon: <OpenInNewIcon />,
          onItemClick: () => window.open(store.url + product.custom_url.url)
        }
      ]}
      placement="bottom-start"
      toggle={
        <Button variant="subtle" iconOnly={<MoreHorizIcon title="Actions" />} />
      }
    />
  );
};

export default ProductRowAction;

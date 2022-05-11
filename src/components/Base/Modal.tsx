import withStyle from "@/frontend/hocs/withStyle";
import { Modal as BaseModal, ModalProps } from "@bigcommerce/big-design";

export const ModalBuilder = (defaultCss?: (props: any) => any) => {
  const StyledModal = withStyle<ModalProps & { children: any }>(BaseModal, {
    sub: "div",
    defaultCss
  });
  return StyledModal;
};

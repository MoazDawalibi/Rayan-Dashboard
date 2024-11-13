import { TYPE } from "../useProductType";
import { history } from "../../../../../history";

export const navigateToAllProducts = (productType) => {
  if (productType === TYPE.OWNER_PRODUCT) {
    history.goBack();
  }
  if (productType === TYPE.SHOP_PRODUCT) {
    history.goBack();
  }
};

import { ref } from "vue";
import { Enums } from "../assets/Constants";
export const is_expanded = ref(false);

/**
 * Phóng to thu nhỏ thanh sidebar
 * @param
 * @returns
 * Author : VMDANG (17/10/2022)
 */

export const toggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};

export const show_modal = ref(false);

/**
 * ẩn hiện modal
 * @param
 * @returns
 * Author : VMDANG (17/10/2022)
 */

export const toggleModal = () => {
  show_modal.value = !show_modal.value;
};

export const showToast = ref(false);
/**
 * ẩn hiện toast thành công
 * @param
 * @returns
 * Author : VMDANG (27/10/2022)
 */
export const openToast = () => {
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 1500);
};

export const isConfirm = ref(false);
export const toggleConfirm = () => {
  isConfirm.value = !isConfirm.value;
};

export const showError = (error) => {
  if (error?.response) {
    switch (error?.response?.status) {
      case Enums.StatusCode.BadRequest:
        return error.response.data.MoreInfo;

      case Enums.StatusCode.InternalServerError:
        return error.response.data.UserMsg;

      case Enums.StatusCode.NotFound:
        return error.response.data.UserMsg;
    }
  }
};

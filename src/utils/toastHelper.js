import Toast from 'react-native-toast-message';

export const showSuccessToast = (message) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showErrorToast = (message) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

export const showLoadingToast = (message) => {
  Toast.show({
    type: 'info',
    text1: 'Loading',
    text2: message,
    position: 'top',
    autoHide: false,
    topOffset: 50,
  });
};

export const hideToast = () => {
  Toast.hide();
};

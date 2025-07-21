import { ERROR_MESSAGE } from '@/constants/error';

export const displayErrorMessage = (statusCode?: number) => {
  switch (statusCode) {
    case 400:
      return { ...ERROR_MESSAGE.client, action: 'retry' };
    case 404:
      return { ...ERROR_MESSAGE.route, action: 'navigateBack' };
    case 500:
      return { ...ERROR_MESSAGE.server, action: 'retry' };
    default:
      return { ...ERROR_MESSAGE.unknown, action: 'navigateHome' };
  }
};

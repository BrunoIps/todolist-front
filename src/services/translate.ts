import i18n from '@mobile/i18n';
import { TOptions } from 'i18next';

const { t } = i18n.i18n;

export const translator = (key: string, options?: TOptions) => {
  try {
    if (t(key, options).split('[missing ')[1]) {
      return t('ERRORS.GENERIC.ERROR');
    }
  } catch (err) {
    return t('ERRORS.GENERIC.ERROR');
  }

  return t(key, options);
};

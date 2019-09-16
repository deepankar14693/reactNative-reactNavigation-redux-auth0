/* import i18n from 'react-native-i18n';
import XHR from 'i18next-xhr-backend';
import moment from 'moment';
import { getLocalStorageKey } from './common/utils';

function getLanguageUrl() {
  let subdomain = window.location.hostname.replace('.vicicentral.com', '');
  let timeStamp = moment().format("YYYYMMDDHH");
  return (subdomain.indexOf('simplify') !== -1) ? "https://appcenter.vicicentral.com/Content/locales2/apria/{{lng}}/{{ns}}.json?" + timeStamp : "https://appcenter.vicicentral.com/Content/locales2/default/{{lng}}/{{ns}}.json?" + timeStamp;
}
function getCurrentCulture() {
  return getLocalStorageKey('CurrentCulture') === null ? 'en' : getLocalStorageKey('CurrentCulture')
}

i18n
  .use(XHR)
  .init({
    fallbackLng: getCurrentCulture(),
    preload: ['en'],
    lng: getCurrentCulture(),
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    cache: {
      enabled: true
    },
    "backend": {
      "loadPath": getLanguageUrl(),
      crossDomain: true,
    },
    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });

export default i18n; */

const i18n = {
  t: function (key) { return key; }
};

export default i18n;
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale('pt-br');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const weekdays = dayjs.localeData().weekdays().map(day => capitalizeFirstLetter(day));
const weekdaysShort = dayjs.localeData().weekdaysShort().map(day => capitalizeFirstLetter(day));
const weekdaysMin = dayjs.localeData().weekdaysMin().map(day => capitalizeFirstLetter(day));

dayjs.updateLocale('pt-br', {
  weekdays: weekdays,
  weekdaysShort: weekdaysShort,
  weekdaysMin: weekdaysMin
});

export default dayjs;

import moment from 'moment';

export function useDate() {
  moment.updateLocale('pt-BR', {
    relativeTime: {
      future: 'em %s',
      past: '%s atrás',
      s: 'alguns segundos',
      ss: '%d segundos',
      m: 'um minuto',
      mm: '%d minutos',
      h: 'um hora',
      hh: '%d horas',
      d: 'um dia',
      dd: '%d dias',
      w: 'uma semana',
      ww: '%d semanas',
      M: 'um mês',
      MM: '%d meses',
      y: 'um ano',
      yy: '%d anos',
    },
  });

  function fromNow(date: string) {
    return moment(date).fromNow();
  }

  return { fromNow };
}

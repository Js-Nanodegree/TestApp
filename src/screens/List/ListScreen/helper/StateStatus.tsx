export default {
  'conn': {
    'error': false,
    'loading': false,
    'message': '',
    'time': Date.now(),
  },
  'diff': {
    'error': false,
    'loading': true,
    'message': '',
    'time': Date.now(),
  },
  'err': {
    'error': true,
    'loading': true,
    'message': 'Wait update data',
    'time': Date.now(),
  },
  'timeOut': {
    'error': true,
    'loading': false,
    'message': 'TimeNotOut',
    'time': Date.now(),
  },
};

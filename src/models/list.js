import api from '../api';

/**
 * Модель списка, реализован функционал загрузки и записи списка в стор
 * @type {{effects: (function(*): {loadList(*, *): Promise<void>}),
 * reducers: {setList(*, *=): *&{list: *}}, state: {list: *[]}}}
 */

export const list = {
  'effects': (dispatch) => ({
    async loadList(payload, rootState) {
      const loadedList = await api.getList();
      this.setList(loadedList.data);
    },
  }),
  'reducers': {
    setList(state, payload) {
      return {
        ...state,
        'list': payload,
      };
    },
  },
  'state': {
    'list': [],
  },
};

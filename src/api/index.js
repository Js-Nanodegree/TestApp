/* eslint-disable require-await */
import axios from 'axios';

/**
 * Класс использующий axios для взаимодействия с OpenAPI
 */

export default {
  async get(url, params) {
    return axios.get(url, {
      'headers': {'Accept': 'application/vnd.github.v3+json'},
      params,
    });
  },
  async git_events(page) {
    try {
      const {data} = await this.get('https://api.github.com/events', {'per_page': page});
      return {
        data,
        'error': false,
        'loading': false,
      };
    } catch (error) {
      return {
        'data': {},
        'error': error.toString(),
        'loading': false,
      };
    }
  },
};

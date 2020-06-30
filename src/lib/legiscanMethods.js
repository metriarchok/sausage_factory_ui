import { stringify } from 'query-string';
import { fetchUtils } from 'ra-core';
import apiUrl from '../config/apiUrl';
/**
 * Maps ls/{resource} requests from RestProvider to CloudFunction legiscan methods
 */

const httpClient = fetchUtils.fetchJson;
const getList = (resource, params) => {
  const { page } = { page: params.pagination.page, perPage: 50 };
  const { field, order } = params.sort || { field: 'relevance', order: 'DESC' };
  const query = {
    sort: JSON.stringify([field, order]),
    page: JSON.stringify(page),
    filter: JSON.stringify(params.filter)
  };
  const url = `${apiUrl}/${resource}?${stringify(query)}`;
  console.log(url);
  return httpClient(url).then(({ headers, json }) => {
    if (!headers.has('X-Total-Count')) {
      throw new Error(
        'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
      );
    }
    return {
      data: json.sort((a, b) => {
        const aField = a[field] instanceof Date ? new Date(a[field]) : a[field];
        const bField = b[field] instanceof Date ? new Date(b[field]) : b[field];
        if (aField > bField) return order === 'ASC' ? 1 : -1;
        if (aField < bField) return order === 'ASC' ? -1 : 1;
        return 0;
      }),
      total: parseInt(headers.get('X-Total-Count').split('/').pop(), 10)
    };
  });
};

const getOne = (resource, params) =>
  httpClient(`${apiUrl}/${resource}/${params.id.toString()}`).then(({ json }) => ({
    data: json
  }));

const create = (resource, params) => {
  console.log('ls create method');
  httpClient(`${apiUrl}/${resource}`, {
    method: 'POST',
    body: JSON.stringify(params.data)
  }).then(({ json }) => ({
    data: { ...params.data, id: json.id }
  }));
};

export default {
  getOne,
  getList,
  create
};

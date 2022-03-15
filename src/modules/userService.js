import { getData, sendData } from './helper';

export class UserService {
  constructor(url) {
    this._url = url;
  }

  getUsers() {
    return getData(this._url);
  }

  addUser(user) {
    return sendData(this._url + 1, {
      method: 'POST',
      body: user,
    });
  }

  removeUser(id) {
    return sendData(`${this._url}1/${id}`, {
      method: 'DELETE',
    });
  }

  changeUser(id, data) {
    return sendData(`${this._url}1/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }

  getUser(id) {
    return getData(`${this._url}1/${id}`);
  }

  editUser(id, user) {
    return sendData(`${this._url}1/${id}`, {
      method: 'PUT',
      body: user,
    });
  }

  filterUsers(filterOption) {
    return getData(`${this._url}1?${filterOption}=true`);
  }

  getSortUsers(sortOption) {
    return getData(
      `${this._url}1?_sort=${sortOption.name}&_order=${sortOption.value}`
    );
  }

  getSearchUsers(str) {
    return getData(`${this._url}1?name_like=${str}`);
  }
}

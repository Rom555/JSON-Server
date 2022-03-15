import { getData, sendData } from './helper';

export class UserService {
  constructor(url) {
    this._url = url;
  }

  getUsers() {
    return getData(this._url);
  }

  addUser(user) {
    return sendData(this._url, {
      method: 'POST',
      body: user,
    });
  }

  removeUser(id) {
    return sendData(`${this._url}/${id}`, {
      method: 'DELETE',
    });
  }

  changeUser(id, data) {
    return sendData(`${this._url}/${id}`, {
      method: 'PATCH',
      body: data,
    });
  }

  getUser(id) {
    return getData(`${this._url}/${id}`);
  }

  editUser(id, user) {
    return sendData(`${this._url}/${id}`, {
      method: 'PUT',
      body: user,
    });
  }

  filterUsers(filterOption) {
    return getData(`${this._url}?${filterOption}=true`);
  }

  getSortUsers(sortOption) {
    return getData(
      `${this._url}?_sort=${sortOption.name}&_order=${sortOption.value}`
    );
  }

  getSearchUsers(str) {
    return getData(`${this._url}?name_like=${str}`);
  }
}

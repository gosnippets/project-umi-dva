import request from 'umi-request';
import { User } from './types';

export class UserService {
  async all() {
    return request('/api/users');
  }

  async create(item: User) {
    return request('/api/users', {
      method: 'post',
      data: item,
    });
  }

  async delete(id: number) {
    return request(`/api/users/${id}`, {
      method: 'delete',
    });
  }

  async update(item: User) {
    return request(`/api/users/${item.id}`, {
      method: 'put',
      data: item,
    });
  }
}

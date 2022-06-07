import * as DataLoader from 'dataloader';
import { maps } from '../../shared/utils';
import { User } from './models/user.model';
import { UserService } from './user.service';

export function createUsersLoader(usersService: UserService) {
  return new DataLoader<string, User>(async (ids) => {
    const users = await usersService.findByIds(...ids);
    const userMaps = maps(users, (_) => _.id);
    return ids.map((id) => userMaps[id]);
  });
}

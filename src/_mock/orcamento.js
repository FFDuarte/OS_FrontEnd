



import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company:  sample([
    'Admin',
    'SubAdmin',
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['orcamento', 'servicos']),
  role: sample([
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
    'teste@gmail.com',
  ]),
}));

export default users;

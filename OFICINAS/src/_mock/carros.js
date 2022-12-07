import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name:  sample([
    'kvh8413',
    'khh4555',
    'faef564',
    '2f51aef',
    '23af178',
    'fafa222',
    'ffa22fa',
    '9660fff',
    'aqb2222',
    'awr1222'



  ]),
  company:  faker.name.findName(),
  status: sample(['ativo', 'concluido']),
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

  marca: sample([
    'Hyndai',
    'Ford',
    'VolksWagen',
    'Kia',
    'Fiat',
    'Nissan',
    'Toyota'
  ]),

  modelo: sample([
    'modelo'
    
  ]),
}));

export default users;

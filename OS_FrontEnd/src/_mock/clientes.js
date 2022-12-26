import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import {getAcessToken , getTenant_id} from '../utils/services/auth'


// ----------------------------------------------------------------------
var tenantId = getTenant_id()
var access_token = getAcessToken()

export function Associados() {
  
  const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
      const getData = async () => {
        const data = await api.get(`dashboard/${tenantId}/associados`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
          })
        

        setFetchedData(data.data);
      };
      getData();
    }, []);

    return fetchedData
}



export const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `data:image/jpeg;base64,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`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));






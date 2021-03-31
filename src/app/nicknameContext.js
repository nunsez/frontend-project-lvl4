import faker from 'faker';
import Cookies from 'js-cookie';
import { createContext } from 'react';

const nickname = Cookies.get('nickname') ?? faker.internet.userName();
Cookies.set('nickname', nickname, { expires: 1, sameSite: 'strict' });

const NicknameContext = createContext(nickname);

export default NicknameContext;

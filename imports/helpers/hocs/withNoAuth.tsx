import React, {FC} from 'react';
import {NotFound} from '../../ui/pages/NotFound/NotFound';
import {Loading} from '../../ui/components/Loading/Loading';
import {User} from '../types/types';
import { Cabinet } from '../../ui/pages/Cabinet/Cabinet';
import { Statistics } from '../../ui/components/ManagerCabinet/Statistics/Statistics';

export function WithNoAuth(Component: FC, user: User, loggingIn: boolean) {

  const userType = user?.profile?.userType;

  return !loggingIn
    ? !user
      ? function WithNoAuthComponent() {
          return <Component />;
        }
      : user.profile.userType === 'admin' ?
      function WithNoAuthComponent() {
        return <Component />;
      } :
      function notFound() {
        return userType !== undefined && userType !== 'manager' ? <Cabinet/> : userType === 'manager' ? <Statistics/> : <NotFound />;
      }
    : function loading() {
        return <Loading />;
      };
}

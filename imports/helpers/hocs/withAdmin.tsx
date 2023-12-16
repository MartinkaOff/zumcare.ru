import React, {FC} from 'react';
import {Loading} from '../../ui/components/Loading/Loading';
import {NoAccess} from '../../ui/pages/NoAccess/NoAccess';
import {User} from '../types/types';

export function WithAdmin(Component: FC, user: User, logginIn: boolean) {
  return !logginIn
    ? user?.profile?.userType === 'admin'
      ? function WithAdminComponent() {
          return <Component />;
        }
      : function noAccess() {
          return <NoAccess />;
        }
    : function loading() {
        return <Loading />;
      };
}

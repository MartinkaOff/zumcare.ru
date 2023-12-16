import React, {FC} from 'react';
import {NoAccess} from '../../ui/pages/NoAccess/NoAccess';
import {Loading} from '../../ui/components/Loading/Loading';
import {User} from '../types/types';

export function WithAuth(Component: FC, user: User, logginIn: boolean) {
  return !logginIn
    ? !!user
      ? function WithAuthComponent() {
          return <Component />;
        }
      : function noAccess() {
          return <NoAccess />;
        }
    : function loading() {
        return <Loading />;
      };
}

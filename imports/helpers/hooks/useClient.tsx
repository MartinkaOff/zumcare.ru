import { useTracker } from "meteor/react-meteor-data";
import { Clients } from "../../api/clients/Clients";
import { Client } from "../types";

export function useClient(userId?: string) {
    const {client, isClientLoading} = useTracker(() => {
      const subscription = !!userId
        ? Meteor.subscribe('clients.getByUserId', userId)
        : Meteor.subscribe('clients.user');
      const client = Clients.findOne() as Client;
      return {client, isClientLoading: !subscription.ready()};
    });
  
    return {client, isClientLoading};
  }
import {useTracker} from 'meteor/react-meteor-data';
import {PageElements} from '../../api/pageElements/PageElements';
import {PageElement} from '../types';

export function usePageElements() {
  const {pageElements, isPageElementsLoading} = useTracker(() => {
    const subscription = Meteor.subscribe('pageElements.all');
    const pageElements = PageElements.find().fetch() as PageElement[];
    return {pageElements, isPageElementsLoading: !subscription.ready()};
  });

  return {pageElements, isPageElementsLoading};
}

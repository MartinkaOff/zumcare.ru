import { useTracker } from 'meteor/react-meteor-data';
import { Certificates } from '../../api/certificates/Certificates';
import { Certificate } from '../types';

export function useCertificates(userId?: string) {
  const { certificates, isCertificatesLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('certificates.specialist_id', userId);
    const certificates = Certificates.find().fetch() as Certificate[];

    return { certificates, isCertificatesLoading: !subscription.ready() };
  });

  return { certificates, isCertificatesLoading };
}

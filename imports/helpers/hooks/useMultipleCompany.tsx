import { useTracker } from "meteor/react-meteor-data";
import { Сompanies } from '../../api/companies/Сompanies'
import { Company } from "../types";

export function useMultipleCompanies() {
    const { companies, isCompaniesLoading } = useTracker(() => {
        const subscription = Meteor.subscribe('companies');
        const companies = Сompanies.find().fetch() as Company[];
        return { companies, isCompaniesLoading: !subscription.ready() };
    });
    return { companies, isCompaniesLoading };
}
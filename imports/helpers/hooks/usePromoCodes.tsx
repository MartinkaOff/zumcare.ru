import { useTracker } from "meteor/react-meteor-data";
import { PromoCode } from "../types/types";
import { PromoCodes } from "../../api/promoCodes/PromoCodes";

export function usePromoCodes() {
  const { promoCodes, isPromoCodesLoading } = useTracker(() => {
    const subscription = Meteor.subscribe("promoCodes.all");
    const promoCodes = PromoCodes.find().fetch() as PromoCode[];

    return { promoCodes, isPromoCodesLoading: !subscription.ready() };
  });

  // const updatePromoCodes = (
  //   _id: string,
  //   code: string,
  //   discount: number,
  //   maxUses: number,
  //   startDate: Date,
  //   endDate: Date
  // ) => {
  //   Meteor.call(
  //     "promoCodes.update",
  //     _id,
  //     code,
  //     discount,
  //     maxUses,
  //     startDate,
  //     endDate
  //   );
  // };

  return { promoCodes, isPromoCodesLoading };
}

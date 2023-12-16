import { check, Match } from 'meteor/check';
import { Client, PromoCode } from '../../../helpers/types/types';
import { PromoCodes } from '../PromoCodes';

Meteor.methods({
  'promoCodes.insert'(data: PromoCode) {
    check(data, {
      code: String,
      discount: Number,
      maxUses: Number,
      startDate: Date,
      endDate: Date,
      firstUseDate: Match.Optional(Date),
      company: Match.Optional(String),
    });

    if (!data.firstUseDate) {
      data.firstUseDate = undefined;
    }

    PromoCodes.insert(data);
  },

  'promoCodes.remove'(_id: string) {
    check(_id, String);

    PromoCodes.remove(_id);
  },

  'promoCodes.apply'(code: string, userData: Client) {
    check(code, String);
    check(userData, {
      email: String,
      userId: String,
      company: Match.Optional(String),
    });

    const promoCode = PromoCodes.findOne({ code });
    if (!promoCode) {
      throw new Meteor.Error(
        'promo-code-not-found',
        'The promo code you entered is invalid.',
      );
    }

    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    if (!promoCode.lastResetDate || promoCode.lastResetDate < startMonth) {
      PromoCodes.update(
        { code },
        { $set: { usageCount: 0, lastResetDate: new Date() } },
      );
      promoCode.usageCount = 0;
    }

    // if (promoCode.usageCount >= 2) {
    //   throw new Meteor.Error(
    //     'promo-code-limit-reached',
    //     'The promo code you entered has reached its maximum usage limit.',
    //   );
    // }

    // const usageThisMonth = PromoCodes.find({
    //   code,
    //   firstUseDate: { $gte: startMonth, $lte: endMonth },
    // }).count();
    // if (usageThisMonth >= 2) {
    //   throw new Meteor.Error(
    //     'promo-code-limit-reached',
    //     'The promo code you entered has already been used twice this month.',
    //   );
    // }

    if (now < promoCode.startDate || now > promoCode.endDate) {
      throw new Meteor.Error(
        'promo-code-expired',
        'The promo code you entered has expired.',
      );
    }

    if (userData.company !== promoCode.company) {
      throw new Meteor.Error(
        'invalid-company',
        'The promo code is not applicable for the provided company.',
      );
    }

    if (!promoCode.firstUseDate) {
      PromoCodes.update({ code }, { $set: { firstUseDate: now } });
    }

    PromoCodes.update({ code }, { $inc: { usageCount: 1, maxUses: -1 } });

    return promoCode;
  },
});

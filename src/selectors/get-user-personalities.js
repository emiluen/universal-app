import _ from 'lodash';

import addMemberStatus from './add-member-status';

export default (personalities, member) => {
  const memberStatusPersonalities = addMemberStatus(personalities, member, true);
  const userPersonalities = memberStatusPersonalities.personalities
    .map((personality) => {
      // Keep all properties except 'types'
      const { types, ...personalityProps } = personality;

      return {
        ...personalityProps,
        type: _.first(personality.types),
      };
    });

  return userPersonalities;
};

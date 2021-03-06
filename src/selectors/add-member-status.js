export default (personalities, member, filterNonMembers = false) => {
  if (!personalities || !personalities.personalities) {
    if (filterNonMembers) {
      return {
        ...personalities,
        personalities: filterNonMembers ? [] : personalities.personalities,
      };
    }

    return personalities;
  }

  const personalitiesProjection = personalities.personalities.map((personality) => {
    let userPersonality = null;
    if (member && member.personalities) {
      userPersonality = member.personalities[personality.id];
    }

    return {
      ...personality,
      types: personality.types.map(group => ({
        ...group,
        typeMember: userPersonality ? group.id === userPersonality.typeId : false,
      })).filter(item => (!filterNonMembers || item.typeMember)),
      personalityMember: userPersonality ? !!userPersonality.typeId : false,
      isPrivate: userPersonality ? !!userPersonality.isPrivate : false,
    };
  }).filter(item => (!filterNonMembers || item.personalityMember));

  return {
    ...personalities,
    personalities: personalitiesProjection,
  };
};

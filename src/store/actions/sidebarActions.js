const setBadgeInvisible = data => {
  return {
    type: "SET_BADGE_INVISIBLE",
    profile: data.profile,
    stats: data.stats
  };
};

export { setBadgeInvisible };

const setBadgeInvisible = data => {
  console.log("Show New Badge Called", data);
  return {
    type: "SET_BADGE_INVISIBLE",
    profile: data.profile,
    stats: data.stats || true
  };
};

export { setBadgeInvisible };

const openDialog = (open, data, error) => {
  return {
    type: "OPEN_DIALOG",
    open,
    data,
    error
  };
};

export { openDialog };

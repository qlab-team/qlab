const openDialog = (open, data, error) => {
  console.log("Open Dialog Called", data);
  return {
    type: "OPEN_DIALOG",
    open,
    data,
    error
  };
};

export { openDialog };

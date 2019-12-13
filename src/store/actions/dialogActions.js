const openDialog = (open, data, error) => {
  console.log("Open Dialog Called");
  return {
    type: "OPEN_DIALOG",
    open,
    data,
    error
  };
};

export { openDialog };

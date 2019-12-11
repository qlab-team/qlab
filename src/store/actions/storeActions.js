const getStoreItems = () => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    return firestore
      .collection("store")
      .get()
      .then(collection => {
        let storeItems = collection.docs.map(doc => {
          return doc.data();
        });
        dispatch({ type: "GET_STORE_ITEMS", storeItems });
      });
  };
};

export { getStoreItems };

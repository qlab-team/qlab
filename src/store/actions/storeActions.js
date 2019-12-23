const getStoreItems = () => {
  return (dispatch, getState, { getFirestore }) => {
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

const purchaseItem = (data, auth) => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const user = state.user;

    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(collection => {
        // check if user has enough qPoints for this purchase
        let userHasEnoughQPoints =
          user.profile.q_points >= data.price ? true : false;
        if (!userHasEnoughQPoints) {
          dispatch({
            type: "OPEN_DIALOG",
            open: true,
            data,
            error: "You dont have enough qPoints for this purchase."
          });
        }
        // check if user has the item already (avoid duplicates)
        let userHasItem = false;
        const items = collection.docs[0].data().items;
        items.forEach(item => {
          if (item.item_id === data.id) userHasItem = true;
        });
        if (userHasItem) {
          dispatch({
            type: "OPEN_DIALOG",
            open: true,
            data,
            error: "You already have this item."
          });
        }
        if (!userHasItem && userHasEnoughQPoints) {
          firestore
            .collection("users")
            .doc(user.user_id)
            .update({
              items: firestore.FieldValue.arrayUnion({
                purchase_date: data.date,
                item_name: data.name,
                item_id: data.id,
                item_price: data.price
              }),
              q_points: user.profile.q_points - data.price
            })
            .then(() => {
              dispatch({
                type: "SET_BADGE_INVISIBLE",
                profile: false
              });
            });
        }
      })

      .catch(e => {
        console.error("err :", e);
      });
  };
};

export { getStoreItems, purchaseItem };

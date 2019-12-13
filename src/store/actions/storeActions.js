const getStoreItems = () => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get Store Items Called");
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

const purchaseItem = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Purchase Item Called");
    console.log(
      "Add Item Called",
      `user_qPoints: ${user.profile.q_points} item_price: ${data.itemPrice}`
    );
    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(collection => {
        // check if user has enough qPoints for this purchase
        let userHasEnoughQPoints =
          user.profile.q_points >= data.itemPrice ? true : false;
        if (!userHasEnoughQPoints) {
          console.log(
            "Not enough qPoints for this purchase.",
            `qPoints: ${user.profile.q_points}, item price: ${data.itemPrice}`
          );
          dispatch({
            type: "OPEN_DIALOG",
            open: true,
            data: null,
            error: "You dont have enough qPoints for this purchase."
          });
        }
        // check if user has the item already (avoid duplicates)
        let userHasItem = false;
        const items = collection.docs[0].data().items;
        items.forEach(item => {
          if (item.itemId === data.itemId) userHasItem = true;
        });
        if (userHasItem) {
          console.log("User already has this item.");
          dispatch({
            type: "OPEN_DIALOG",
            open: true,
            data: null,
            error: "You already have this item."
          });
        }
        if (!userHasItem && userHasEnoughQPoints) {
          firestore
            .collection("users")
            .doc(user.user_id)
            .update({
              items: firestore.FieldValue.arrayUnion({
                purchaseDate: data.purchaseDate,
                itemName: data.itemName,
                itemId: data.itemId,
                itemPrice: data.itemPrice
              }),
              q_points: user.profile.q_points - data.itemPrice
            });
          console.log(
            `Purchase complete. qPoints: ${user.profile.q_points -
              data.itemPrice}`
          );
        }
      })

      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getStoreItems, purchaseItem };

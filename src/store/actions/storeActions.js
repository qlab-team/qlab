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

const addBadge = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Add Badge Called");
    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(collection => {
        let userHasBadge = false;
        const badges = collection.docs[0].data().badges;
        badges.forEach(badge => {
          if (badge.itemId === data.itemId) userHasBadge = true;
        });
        if (!userHasBadge) {
          firestore
            .collection("users")
            .doc(user.user_id)
            .update({
              badges: firestore.FieldValue.arrayUnion({
                purchaseDate: data.purchaseDate,
                itemName: data.itemName,
                itemId: data.itemId
              })
            });
        }
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getStoreItems, addBadge };

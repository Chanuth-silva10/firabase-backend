
const express = require("express");
const router = express();

const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("userdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });

      return res.status(200).send({status: "Success", msg: "Data Saved"});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

router.get("/api/userDetail/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      const userDetail = await reqDoc.get();
      const response = userDetail.data();

      return res.status(200).send({status: "Success", data: response});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

router.get("/api/userDetails", (req, res) => {
  (async () => {
    try {
      const query = db.collection("userdetails");
      const response = [];

      await query.get().then((data) => {
        const docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            name: doc.data().name,
            mobile: doc.data().mobile,
            address: doc.data().address,
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({status: "Success", data: response});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

router.put("/api/update/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });
      return res.status(200).send({status: "Success", msg: "Data Updated"});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// delete
// delete
router.delete("/api/delete/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      await reqDoc.delete();
      return res.status(200).send({status: "Success", msg: "Data Removed"});
    } catch (error) {
      console.log(error);
      res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

module.exports = router;

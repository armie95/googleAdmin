require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = require("../firebaseConfig");

const firestore = admin.firestore();

/* CREATE new user */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, phone, address, email, password } = req.body;

    // If any fields are missing, return
    if (
      !first_name ||
      !last_name ||
      !phone ||
      !address ||
      !email ||
      !password
    ) {
      return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const usersCollection = firestore.collection("users");
    const existingUser = await usersCollection
      .where("email", "==", email)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUserRef = usersCollection.doc();

    await newUserRef.set({
      first_name,
      last_name,
      phone,
      address,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

/* LOGIN user */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verify the user's credentials using Firebase Admin SDK
    const usersCollection = admin.firestore().collection("users");
    const querySnapshot = await usersCollection
      .where("email", "==", email)
      .get();

    if (querySnapshot.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    // const storedPassword = existingUser.get("password");
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password Not Match" });
    }
    const token = jwt.sign({ email: userData.email }, process.env.JWT_KEY, {
      expiresIn: "1h", // Token expiration time
    });
    res.status(200).json({ token, role: userData.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

/* GET current user */
router.get("/current", async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Fetch user data from Firestore based on the decoded token's UID
    // const userDoc = await admin.firestore().collection("users").doc(decodedToken.email).get();

    const usersCollection = admin.firestore().collection("users");
    const querySnapshot = await usersCollection
      .where("email", "==", decodedToken.email)
      .get();

    if (querySnapshot.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    var mediaCard = [];
    if (userData.role === "user") {
      const mediaCollection = admin.firestore().collection("mobile");
      mediaCollection
        .get()
        .then((querySnapshot) => {
          const mediaCard = [];
          querySnapshot.forEach((doc) => {
            mediaCard.push(doc.data());
          });

          res.status(200).json({ userData, mediaCard: mediaCard });
        })
        .catch((error) => {
          res.status(500).json({ error: "Error fetching data" });
        });
    } else {
      res.status(200).json({ userData, message: "User role is not 'user'" });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;

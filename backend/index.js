// import { Express } from "express";
import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded())

const mongoUri = "mongodb+srv://bhattprakash5u:mernstacklogin@cluster0.n6ziqjm.mongodb.net/mern_login";
// mongoose.connect('mongodb://127.0.0.1:27017/myapp');

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connection succesfull');
}).catch(() => {
    console.log('error')
})



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("User", userSchema);
// ... other middleware and routes ...





// app.post("/register", (req, res) => {

//     const { name, email, password } = req.body;

//     User.findOne({ email: email }, (err, user) => {
//         // check for existing users with same emails
//         if (user) {
//             res.send({ message: "user already exist" });
//         } else {
//             const user = new User({
//                 name, email, password
//             })

//             user.save(err => {
//                 if (err) {
//                     res.send(err);
//                 } else {
//                     res.send({ message: "succesfully registerd" })
//                 }
//             })
//         }

//     })
// })



// Route for user registration
app.post("/register", async (req, res) => {
    // Extract data from the request body
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists in the database
        const user = await User.findOne({ email: email });

        if (user) {
            // If user exists, send a message indicating that the user is already registered
            res.send({ message: "User already exists" });
        } else {
            // If user does not exist, create a new user instance with the provided data
            const newUser = new User({
                name,
                email,
                password
            });

            // Save the new user to the database
            await newUser.save();

            // Send a success message after successful registration
            res.send({ message: "Successfully registered. Please login now." });
        }
    } catch (error) {
        // If there is any error during the registration process, handle it and send an error response
        res.status(500).send({ message: "Internal server error" });
    }
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user based on the email provided
        const user = await User.findOne({ email: email });

        if (!user) {
            // If the user does not exist, send a response indicating the user is not registered
            return res.send({ message: "User not registered" });
        }

        // If the user exists, check if the provided password matches the stored password
        if (password === user.password) {
            return res.send({ message: "User logged in successfully", user: user });
        } else {
            // If the password does not match, send a response indicating the password is incorrect
            return res.send({ message: "Password doesn't match" });
        }
    } catch (err) {
        // Handle any database error that occurred during the query
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
    }
});


// app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "user logged in succefully", user: user })
//             }else{
//                 res.send({message : "password does't match"})
//             }
//         } else {
//             res.send({ message: "user not registerd" });
//         }
//     })
// })


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
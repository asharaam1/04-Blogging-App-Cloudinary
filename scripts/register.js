import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { auth, db } from "./firebaseconfig.js";

const form = document.querySelector('#form');
const email = document.querySelector('#registerEmail');
const password = document.querySelector('#registerPassword');
const fullName = document.querySelector('#fullName');




let userProfilePicUrl = ""

//! Cloudnairy Image Upload
let myWidget = cloudinary.createUploadWidget({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        userProfilePicUrl = result.info.secure_url
    }
})
document.getElementById("upload_widget").addEventListener("click", function (event) {
    event.stopPropagation()
    myWidget.open();
}, false);


form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(email.value);
    console.log(password.value);
    console.log(fullName.value);

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);

            try {
                const docRef = await addDoc(collection(db, "users"), {
                    fullName: fullName.value,
                    email: email.value,
                    profileImage: userProfilePicUrl,
                    uid: user.uid
                });
                console.log("Document written with ID: ", docRef.id);
                alert('Register Successfully');
            } catch (e) {
                console.error("Error adding document: ", e);
                alert('Error: ', e);
            }


        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            p.innerHTML = errorMessage
        });


})
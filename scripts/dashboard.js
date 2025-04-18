import { updateProfileImage, getDataFromFirestore } from "./app.js"
import { auth, db } from "./firebaseconfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";




//! Elements (continued)
const loginBtn = document.querySelector('#login-btn');
const loginUser = document.querySelector('#login-user');
const logoutBtn = document.querySelector('#logout-btn');
const form = document.querySelector('#form');



//! Header Responsive
const menuButton = document.getElementById('menu-button');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.querySelector('.mobile-menu');

// Open Sidebar
menuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

// Close Sidebar
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});
//! end

let allBlogs = [];



let uploadedImageUrl = "";

//! Cloudinary Upload Widget
const myWidget = cloudinary.createUploadWidget({
    cloudName: '',  //your_cloud_name
    uploadPreset: ''   //Your_preset
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        uploadedImageUrl = result.info.secure_url;
    }
});
document.getElementById("upload_widget").addEventListener("click", function (e) {
    e.preventDefault();
    myWidget.open();
}, false);



let userDataArray = [];

//! Form Submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    try {
        const docRef = await addDoc(collection(db, "usersblog"), {
            title: title,
            description: content,
            blogImg: uploadedImageUrl,
            createdAt: new Date(),
            uid: auth.currentUser.uid,
        });

        allBlogs.push(docRef)

        console.log("Document written with ID: ", docRef.id);
        window.location = "dashboard.html";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

console.log(allBlogs);


//! Fetch User Data
async function loginUserData(uid) {
    userDataArray = [];
    try {
        const q = query(collection(db, "usersblog"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            userDataArray.push(doc.data());
        });

        console.log("Updated userDataArray:", userDataArray);
        return userDataArray;

    } catch (e) {
        console.error("Error fetching user blogs: ", e);
    }
}

//! Render User Blogs
export async function renderLoginUserBlogs(userData) {
    console.log(userData);

    const divData = document.getElementById("div-data");
    divData.innerHTML = "";

    let users = await getDataFromFirestore();

    userData.forEach((post) => {
        const createdAt = new Date(post.createdAt.seconds * 1000).toLocaleString();
        const divHTML = `
            <div>
                <div class="flex space-x-4">
                    <img alt="User Profile Image " class="w-10 h-10 object-cover rounded-full me-2" height="100"
                        src="${users.profileImage}"
                        width="100" />
                    <div>
                        <span class="text-yellow-500">${users.fullName}</span>
                        <p class="text-gray-400">Lorem ipsum dolor sit </p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <img alt="Blog Image" class="w-24 h-24 object-cover" height="100"
                        src="${post.blogImg}"
                        width="100" />
                    <div>
                        <span class="text-yellow-500">VSCode</span>
                        <h2 class="text-xl font-bold">${post.title || "Untitled Post"}</h2>
                        <p class="text-gray-400">${post.description}</p>
                    </div>
                </div>
            </div>
        `;
        divData.innerHTML += divHTML;
    });
}

//! Logout
logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            console.log("User sign-out successful");
            window.location.replace("index.html");
            loginBtn.classList.remove('hidden');
            loginUser.classList.add('hidden');
        })
        .catch((error) => {
            console.log(error);
        });
});



//! Auth State Change
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const uservalue = await loginUserData(uid);
        renderLoginUserBlogs(uservalue);

        let users = await getDataFromFirestore();
        loginBtn.classList.add('hidden');
        loginUser.classList.remove('hidden');

        // Update profile image
        updateProfileImage(users.profileImage);

        console.log(uploadedImageUrl);

        loginUser.addEventListener("click", (e) => {
            e.preventDefault();
            window.location = "index.html";
        });
    } else {
        loginBtn.classList.remove('hidden');
        loginUser.classList.add('hidden');

        loginBtn.addEventListener("click", (e) => {
            window.location = "login.html";
        });
    }
});
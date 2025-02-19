import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const loginBtn = document.querySelector('#login-btn')
const loginUser = document.querySelector('#login-user')
// const userProfileImage = document.querySelectorAll('#user-profile-img')
const logoutBtn = document.querySelector('#logout-btn')



// //! Header Responsive
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
// //! end



logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("user Sign-out successful ");
            e.preventDefault();
            window.location.replace("index.html"); // Redirect and replace the current page
            loginBtn.classList.remove('hidden'); // hiding logout btn 
            loginUser.classList.add('hidden'); // showing login btn
        })
        .catch((error) => {
            console.log(error);
        });
});



// Function to update the profile image source for all elements with the same ID
function updateProfileImage(url) {
    const profileImages = document.querySelectorAll('#user-profile-img');
    profileImages.forEach(img => {
        img.src = url;
    });
}
function updateProfileName(text) {
    const userName = document.querySelectorAll('#user-profile-name')
    userName.forEach(img => {
        img.innerHTML = text;
    });
}



onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
        let users = await getDataFromFirestore()
        console.log(users);
        loginBtn.classList.add('hidden') //hiding login btn 
        loginUser.classList.remove('hidden') // showing logout btn


        updateProfileImage(users.profileImage);
        updateProfileName(users.fullName)


        loginUser.addEventListener("click", (e) => {
            e.preventDefault();
            window.location = "singleuser.html"
        })
    } else {
        loginBtn.classList.remove('hidden') //hiding logout btn 
        loginUser.classList.add('hidden') // showing login btn

        loginBtn.addEventListener("click", (e) => {
            window.location = "login.html"
        })
    }
});


async function getDataFromFirestore() {
    let user = null
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data()
    });

    return user
}


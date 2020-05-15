// DOM Elements
const mainPage = document.querySelector('.main-page');
const loginPage = document.querySelector('.login-page');
const signupPage = document.querySelector('.signup-page');
const middleContent = document.querySelector('.main-btn');
const btnTop = document.querySelector('.btn-top');
const newsFeedPage = document.querySelector('.feeds-page');
const loginModal = document.querySelector('.login-modal');
const modalX = document.querySelector('.login-modal i');
const loginFormBtn = document.querySelector('.login-form-btn');
const signUpFormBtn = document.querySelector('.signup-form-btn');
const signUpBtn = document.querySelector('.to-sign-up-page');
const postBtn = document.querySelector('.post-btn');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const postModalX = document.querySelector('.modal-header i');
const modalPostBtn = document.querySelector('.modal-header button');
const modalFooterPlus = document.querySelector('.modal-footer span');
const modalInput = document.querySelector('.modal-input');
const user = document.querySelector('.user');
const sidebar = document.querySelector('.sidebar');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const xBtn = document.querySelector('.sidebar-header i');
const toggle = document.querySelector('.toggle');
const circle = document.querySelector('.circle');
const pstBttn = document.querySelector('.posting-btn');
const logOutBtn = document.querySelector('.logout');

/**************************************/
/**************************************/

// Main page
const goToLoginPage = () => {
	mainPage.style.display = 'none';
	loginPage.style.display = 'grid';
};


// Login page
modalX.addEventListener('click', () => {
	loginModal.style.display = 'none';
});

loginFormBtn.addEventListener('click', () => {
	const loginUserEmail = document.getElementById("login-email");
	const loginUserPass = document.getElementById("login-pass");

	const email = loginUserEmail.value;
	const pass = loginUserPass.value;

	//document.getElementById("display-name").innerHTML = user.displayName;
	//document.getElementById("sidebar-display-name").innerHTML = user.displayName;

	if (email !== '' && pass !== '') {
		//code for auth userPost
		auth.signInWithEmailAndPassword(email, pass).then(user => {
			
			database.collection('usernames').doc(user.user.uid).get().then(doc => {
				document.getElementById("display-name").innerHTML = `@${doc.data().name}`;
				document.getElementById("sidebar-display-name").innerHTML = `@${doc.data().name}`;
			});
			document.getElementById('sidebar-display-email').innerHTML = 
			`
				email:${email}
			`;
			loginPage.style.display = 'none';
			mainPage.style.display = 'none';
			newsFeedPage.style.display = 'block';
		}).catch(err => {
		alert(err.message);
		});
	} 
	else
	{
		loginModal.style.display = 'block';
	}
});


//for Signup
signUpBtn.addEventListener('click', () => {
	loginPage.style.display = 'none';
	signupPage.style.display = 'block';
});

// Signup form
signUpFormBtn.addEventListener('click', () => {
	const signUpName = document.getElementById("signUp-name");
	const signUpEmail = document.getElementById("signUp-email");
	const signUpPassword = document.getElementById("signUp-pass");
	const signUpForm = document.querySelector('.signup-form');

	const name = signUpName.value;
	const email = signUpEmail.value;
	const pass = signUpPassword.value;

	//create user
	auth.createUserWithEmailAndPassword(email, pass).then(cred => {
		return database.collection('usernames').doc(cred.user.uid).set({
			name: name
		})
	}).then(() => {
		document.getElementById('sidebar-display-email').innerHTML = 
		`
				email:${email}
		`;
		document.getElementById("display-name").innerHTML = `@${name}`;
		document.getElementById("sidebar-display-name").innerHTML = `@${name}`;
		signupPage.style.display = 'none';
		newsFeedPage.style.display = 'block';
		signUpForm.reset();
	}).catch(err => {
		alert(err.message);
	});
});

// News feed page
// Post modal
postBtn.addEventListener('click', () => {
	modal.style.display = 'block';
	modalWrapper.classList.add('modal-wrapper-display');
});

const changeOpacity = x => {
	modalPostBtn.style.opacity = x;
	modalFooterPlus.style.opacity = x;
};

postModalX.addEventListener('click', () => {
	modal.style.display = 'none';
	modalWrapper.classList.remove('modal-wrapper-display');

	if (modalInput.value !== '') {
		modalInput.value = '';
		changeOpacity(0.5);
	}
});

modalInput.addEventListener('keypress', e => {
	if (e.target.value !== '') {
		changeOpacity(1);
	}
});

modalInput.addEventListener('blur', e => {
	if (e.target.value === '') {
		changeOpacity(0.5);
	}
});

// Sidebar
user.addEventListener('click', () => {
	sidebar.classList.add('sidebar-display');
	sidebarWrapper.classList.add('sidebar-wrapper-display');
});

xBtn.addEventListener('click', () => {
	sidebar.classList.remove('sidebar-display');
	sidebarWrapper.classList.remove('sidebar-wrapper-display');
});

// dark mode
const darkElements1 = document.querySelectorAll('.dark-mode-1');
const darkElements2 = document.querySelectorAll('.dark-mode-2');
const lighTexts = document.querySelectorAll('.light-text');
const borders = document.querySelectorAll('.border');
const para = document.querySelectorAll('.p4');

toggle.addEventListener('click', () => {
	circle.classList.toggle('move');
	Array.from(darkElements1).map(darkEl1 => darkEl1.classList.toggle('dark-1'));
	Array.from(darkElements2).map(darkEl2 => darkEl2.classList.toggle('dark-2'));
	Array.from(lighTexts).map(lighText => lighText.classList.toggle('light'));
	Array.from(borders).map(border => border.classList.toggle('border-color'));
});
Array.from(lighTexts).map(p4 => p4.classList.toggle('p4'));

//FireBase
const dbPosts = document.querySelector('#userPost');
const postToSend = document.querySelector('#post-data');
dbPosts.innerHTML = '';
let html = '';

pstBttn.addEventListener('click', () =>{
	const postData = document.getElementById("post-text");
	const postPic = document.getElementById("post-image");
	const postText = postData.value;
	const postImage = postPic.value;

	//const username = document.querySelector('#display-name');

	var user = firebase.auth().currentUser;

	database.collection('usernames').doc(user.uid).get().then(doc => {
		const postName = doc.data().name;
		console.log(postName);
		if (postText !== '')
		{
			database.collection('userposts').add({
				name: postName,
				text: postText,
				url: postImage,
				likes: 0
			})
			alert("Posted!");

			postToSend.text.value = '';
			postToSend.image.value = '';
		
			modal.style.display = 'none';
			modalWrapper.classList.remove('modal-wrapper-display');

			if (modalInput.value !== '') {
				modalInput.value = '';
				changeOpacity(0.5);
			}
		}
		else
		{
			alert("Please enter text to post");
		}
	});
	const postForm = document.querySelector('.post-content-modal');
	postForm.reset();

});

database.collection('userposts').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	html = '';
	changes.forEach(change => {
		if (change.type == 'added')
		{
			displayPosts(change.doc);
		}
	})
	dbPosts.innerHTML = html;
})

function displayPosts (doc)
{
	
	let dbName = doc.data().name;
	let dbText = doc.data().text;
	let dbImg = doc.data().url;
	let dbLikes = doc.data().likes;

	if (dbImg != '')
	{
		html +=
		`
		<div class="post-user-info light-text">
			<div class="post-content " id="listings">   
    			<div class="post-user-info light-text" id="result">
           	   		<h4 class="light-text">@${dbName}</h4>
					<i class="fas fa-check-circle"></i>
        	    </div>
            	<p class="post-text light-text">
				${dbText}
           		</p>
            	<div class="post-img">
            		<img src="${dbImg}" />
            	</div>
            	<div class="post-icons">
                	<i id="like-btn" class="far fa-heart" onclick='
						toggleLike("${dbLikes}", "${dbName}", "${dbText}", "${dbImg}", "${doc.id}");
					'>  ${dbLikes}</i>
        		</div>
			<br><br>
        	</div>
		</div>
		`
	}
	else
	{
		html +=
		`
		<div class="post-user-info ">
			<div class="post-content" id="listings">   
    			<div class="post-user-info " id="result">
           	   		<h4 ">@${dbName}</h4>
					<i class="fas fa-check-circle"></i>
        	    </div>
            	<p class="post-text ">
				${dbText}
           		</p>
            	<div class="post-icons">
                	<i id="like-btn" class="far fa-heart" onclick='
						toggleLike("${dbLikes}", "${dbName}", "${dbText}", "${dbImg}", "${doc.id}");
					'>  ${dbLikes}</i>
        		</div>
			<br><br>
        	</div>
		</div>
		`
	}
}

function toggleLike (dbLikes, dbName, dbText, dbImg, docId, heart)
{
	dbLikes++;
	database.collection('userposts').doc(docId).set({
		name: dbName,
		text: dbText,
		url: dbImg,
		likes: dbLikes
	});
	
	database.collection('userposts').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added')
		{
			displayPosts(change.doc);
		}
	})
	dbPosts.innerHTML = html;
	})
}

/*
const toggleLike=()=> {  
	var heart= document.querySelector('#like-btn');
	if(heart.classlist.contains("far")){ 
  		heart.classList.remove("far");
  		heart.classList.add("fas");
	}
}*/

// LOGOUT
logOutBtn.addEventListener('click', () => {
	auth.signOut();
	mainPage.style.display = 'grid';
	newsFeedPage.style.display = 'none';
});

//auth changes

auth.onAuthStateChanged(user => {
	middleContent.addEventListener('click', e => {
		if (user)
		{
			database.collection('usernames').doc(user.uid).get().then(doc => {
				document.getElementById("display-name").innerHTML = `@${doc.data().name}`;
				document.getElementById("sidebar-display-name").innerHTML = `@${doc.data().name}`;
			});
			document.getElementById('sidebar-display-email').innerHTML = 
			`
				email:${user.email}
			`;	
			loginPage.style.display = 'none';
			mainPage.style.display = 'none';
			newsFeedPage.style.display = 'block';
			sidebar.classList.remove('sidebar-display');
			sidebarWrapper.classList.remove('sidebar-wrapper-display');
		}
		else
		{
			if (e.target.classList[1] === 'main-btn') {
				goToLoginPage();
			}
		}
	});
});
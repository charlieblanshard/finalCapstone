let faveList = [];
let imageList = [];

function loadPage() {
  if (localStorage.getItem("saved") == null) {
    localStorage.setItem("saved", JSON.stringify(faveList));
  }
  if (localStorage.getItem("savedComments") == null) {
    localStorage.setItem("savedComments", JSON.stringify(commentList));
  } else {
    commentList = JSON.parse(localStorage.getItem("savedComments"));
    commentList.forEach((newSave) => {
      commentsTable.innerHTML += `<tr><td>${newSave.name}:<div id="commentsBody">${newSave.comment}</div></tr>`;
    });
  }
}

function loadSaved() {
  if (localStorage.getItem("saved") == null) {
    savedPages.innerHTML = `<p>No pages saved</p>`;
    localStorage.setItem("saved", JSON.stringify(faveList));
  } else {
    savedPages.innerHTML = "";
    faveList = JSON.parse(localStorage.getItem("saved"));
    faveList.forEach((newSave) => {
      savedPages.innerHTML += `<li>${newSave.name} <a href="${newSave.pageLink}">Visit Page</a></li>`;
    });
  }
  if (localStorage.getItem("savedImages") == null) {
    savedImg.innerHTML = `<p>No images saved</p>`;
    localStorage.setItem("savedImages", JSON.stringify(imageList));
  } else {
    savedImg.innerHTML = "";
    imageList = JSON.parse(localStorage.getItem("savedImages"));
    imageList.forEach((newSave) => {
      savedImg.innerHTML += `<img class="saveImagePage" src="${newSave}">`;
    });
    deleteImage();
  }
}

function Page(name, pageLink) {
  this.name = name;
  this.pageLink = pageLink;
}

function savePage() {
  faveList = JSON.parse(localStorage.getItem("saved"));
  let newPage = new Page(
    document.getElementById("heading").innerHTML,
    window.location.href
  );
  faveList.push(newPage);
  localStorage.setItem("saved", JSON.stringify(faveList));
  totalSaved();
}

//Clear all content from page
function clearPage() {
  localStorage.removeItem("saved");
  localStorage.removeItem("savedImages");
  location.reload();
}

//Delete Image from Save for Later Page
function deleteImage() {
  document.querySelectorAll(".saveImagePage").forEach((item) => {
    item.addEventListener("click", (event) => {
      let clickImage = event.target.closest("img");
      let index = imageList.indexOf(clickImage.src);
      imageList.splice(index, 1);
      localStorage.setItem("savedImages", JSON.stringify(imageList));
      loadSaved();
    });
  });
}

function totalSaved() {
  let imageListLength = imageList.length;
  let faveListLength = faveList.length;
  faveList = JSON.parse(localStorage.getItem("saved"));
  imageList = JSON.parse(localStorage.getItem("savedImages"));
  let savedTotal = imageListLength + faveListLength;
  if (savedTotal > 1) {
    alert(`You have ${savedTotal} saved items.`);
  } else {
    alert(`You have ${savedTotal} saved item.`);
  }
}

///Gallery
function addListener() {
  document.querySelectorAll("img").forEach((item) => {
    item.addEventListener("click", (event) => {
      let clickImage = event.target.closest("img");
      imageList.push(clickImage.src);
      localStorage.setItem("savedImages", JSON.stringify(imageList));
      totalSaved();
    });
  });
}
addListener();

// Recipe Pages

//Show Comments Section
function displayCommentOption() {
  if (hiddenForm.style.display == "none") {
    hiddenForm.style.display = "none";
  } else {
    hiddenForm.style.display = "block";
  }
}

//Add comments
let commentList = [];

function Comment(name, comment) {
  this.name = name;
  this.comment = comment;
}

function saveComment() {
  commentList = JSON.parse(localStorage.getItem("savedComments"));
  let newComment = new Comment(
    document.getElementById("nameOfUser").value,
    document.getElementById("userComment").value
  );
  commentList.push(newComment);
  localStorage.setItem("savedComments", JSON.stringify(commentList));
}

//Feedback Page Alert
function feedbackAlert() {
  alert("Thanks for submitting your feedback ♥");
}

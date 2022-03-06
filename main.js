let btn = document.querySelector('input[name="res"]');
let error = document.querySelector(".error");
let userSection = document.querySelector(".user");
// User info
let userAvatar = document.querySelector(".user-avatar");
let userName = document.querySelector(".username");
let userBio = document.querySelector(".bio");
let userNickName = document.querySelector(".nickname");
let userAge = document.querySelector(".age");
let userRepos = document.querySelector(".reois");
let userGists = document.querySelector(".gists");

btn.addEventListener("click", function () {
  let inputValue = document.querySelector('input[name="req"]').value;

  if (inputValue == "") {
    error.innerText = "Pls put the username ";
    userSection.style.display = "none";
  }
  let errorUrl = "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting";
  let url = `https://api.github.com/users/${inputValue}`;
  fetch(url).then((res) =>
    res.json().then((data) => {
      if (inputValue == "") return;
      if (data.documentation_url == errorUrl) {
        error.innerText = "api rate limiting";
      }
      if (data.message) {
        userSection.style.display = "none";
        error.innerText = "User Profile Not Found";
      } else {
        error.innerText = " ";
        userAvatar.innerHTML = `<img src="${data.avatar_url}" alt="userAvatar">`;
        userName.innerText = data.login;
        userBio.innerText = data.bio;
        userNickName.innerText = data.name;
        var time = new Date(`${data.created_at}`);
        userAge.innerText = time.toDateString();
        userRepos.innerText = data.public_repos;
        userGists.innerText = data.public_gists;
        userSection.style.display = "flex";
      }
    })
  );
});

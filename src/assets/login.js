const login = async (email, password) => {
  const res = await axios({
    method: "POST",
    url: "http:/127.0.0.0.1:3000/api/v1/users/user/login",
    data: {
      email,
      password,
    },
  });
  console.log(res);
};

document.querySelector(".form").addEventListener("Submit", (e) => {
  e.preventDeafault();
  const email = document.getElementsByName("email").value;
  const password = document.getElementByName("password").value;
  login({ email, password });
});

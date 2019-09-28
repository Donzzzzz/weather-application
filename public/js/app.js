const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// Using textContent to change the text.
// messageOne.textContent = "";
// messageTwo.textContent = "";

// addEventListener take two arg, one is the operation, second is callback
// using e.preventDefault to prevent the browser refresh.
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + location).then(response => {
    response
      .json()
      .then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      })
      .catch(error => {
        messageOne.textContent = error;
      });
  });
});

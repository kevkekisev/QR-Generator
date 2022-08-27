const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

function clearQr() {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
}

function onCodeGenerateSubmit(e) {
  e.preventDefault();

  clearQr();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQR(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
}

function generateQR(url, size) {
  const qrCode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
}

function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}
function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function createSaveBtn(saveUrl) {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
}

hideSpinner();

form.addEventListener("submit", onCodeGenerateSubmit);


const ACCESS_KEYS = [
  "CLUB-1234",
  "VIP-5678",
  "FORM-9999"
];

function checkKey() {
  const key = document.getElementById("accessKey").value.trim();
  const statusEl = document.getElementById("status");
  const formBox  = document.getElementById("formMaker");

  if (!key) {
    statusEl.innerText = "Please enter your access key.";
    statusEl.style.color = "#ff7cff";
    return;
  }

  
  if (!ACCESS_KEYS.includes(key)) {
    statusEl.innerText = "Invalid access key.";
    statusEl.style.color = "#ff5c7a";
    formBox.style.display = "none";
    return;
  }

  const now = Date.now();
  const storageKey = "key_" + key;

 
  const storedExpire = localStorage.getItem(storageKey);

  
  if (storedExpire && now > Number(storedExpire)) {
    statusEl.innerText = "Key expired.";
    statusEl.style.color = "#ff5c7a";
    formBox.style.display = "none";
    return;
  }

  
  if (!storedExpire) {
    const expireAt = now + (60 * 60 * 1000); 
    localStorage.setItem(storageKey, expireAt);
  }


  statusEl.innerText = "Access granted.";
  statusEl.style.color = "#38d39f";
  formBox.style.display = "block";
}
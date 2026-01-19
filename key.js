
const VALID_KEYS = ["CLUB-1234", "VIP-5678", "FORM-9999"];

let expireWatcher = null;

function checkKey() {
  const key = document.getElementById("accessKey").value.trim();
  const status = document.getElementById("status");
  const formBox = document.getElementById("formMaker");

  if (!key) {
    status.textContent = "Enter access key.";
    formBox.style.display = "none";
    return;
  }

  if (!VALID_KEYS.includes(key)) {
    status.textContent = "Invalid key.";
    formBox.style.display = "none";
    return;
  }

  const now = Date.now();
  const storeKey = "expire_" + key;
  const savedExpireAt = localStorage.getItem(storeKey);

  
  if (savedExpireAt && now >= Number(savedExpireAt)) {
    status.textContent = "Key expired.";
    formBox.style.display = "none";
    return;
  }

  
  let expireAt = savedExpireAt ? Number(savedExpireAt) : (now + 60 * 1000);
  if (!savedExpireAt) localStorage.setItem(storeKey, String(expireAt));

  
  status.textContent = "Access granted.";
  formBox.style.display = "block";

  
  if (expireWatcher) clearInterval(expireWatcher);

 
  expireWatcher = setInterval(() => {
    const t = Date.now();
    if (t >= expireAt) {
      clearInterval(expireWatcher);
      expireWatcher = null;
      status.textContent = "Key expired.";
      formBox.style.display = "none";
    }
  }, 500);
}

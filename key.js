
function getValidKeys(){
  try{
    return JSON.parse(localStorage.getItem("ADMIN_KEYS")) || [];
  }catch{
    return [];
  }
}

let expireWatcher = null;

function checkKey(){
  const keyInput = document.getElementById("accessKey");
  const statusEl = document.getElementById("status");
  const formBox  = document.getElementById("formMaker");

  const key = keyInput.value.trim();

  if(!key){
    statusEl.textContent = "Please enter an access key.";
    formBox.style.display = "none";
    return;
  }

  const VALID_KEYS = getValidKeys();

  if(!VALID_KEYS.includes(key)){
    statusEl.textContent = "Invalid access key.";
    statusEl.style.color = "#ff5c7a";
    formBox.style.display = "none";
    return;
  }

  const now = Date.now();
  const storeKey = "EXPIRE_" + key;
  const savedExpire = localStorage.getItem(storeKey);


  if(savedExpire && now >= Number(savedExpire)){
    statusEl.textContent = "Key expired.";
    statusEl.style.color = "#ff5c7a";
    formBox.style.display = "none";
    return;
  }

  
  let expireAt;
  if(!savedExpire){
    expireAt = now + (60 * 1000); 
    localStorage.setItem(storeKey, String(expireAt));
  }else{
    expireAt = Number(savedExpire);
  }

  
  statusEl.textContent = "Access granted.";
  statusEl.style.color = "#38d39f";
  formBox.style.display = "block";

  
  if(expireWatcher) clearInterval(expireWatcher);

  expireWatcher = setInterval(()=>{
    if(Date.now() >= expireAt){
      clearInterval(expireWatcher);
      expireWatcher = null;
      statusEl.textContent = "Key expired.";
      statusEl.style.color = "#ff5c7a";
      formBox.style.display = "none";
    }
  }, 500);
}

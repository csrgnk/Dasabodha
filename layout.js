// Load Header
fetch('/header.html')
.then(r=>r.text())
.then(d=>document.getElementById('site-header').innerHTML=d);

// Load Footer
fetch('/footer.html')
.then(r=>r.text())
.then(d=>document.getElementById('site-footer').innerHTML=d);

// Add Share Buttons Automatically
document.addEventListener("DOMContentLoaded", function(){

const shareBox = document.createElement("div");
shareBox.innerHTML = `
<div style="text-align:center;margin-top:30px;">
<button onclick="shareWhatsApp()" style="background:#25D366;color:#fff;padding:8px 16px;border:none;border-radius:25px;margin:5px;">WhatsApp</button>
<button onclick="shareFacebook()" style="background:#1877F2;color:#fff;padding:8px 16px;border:none;border-radius:25px;margin:5px;">Facebook</button>
<button onclick="shareTwitter()" style="background:#000;color:#fff;padding:8px 16px;border:none;border-radius:25px;margin:5px;">Twitter</button>
<button onclick="copyURL()" style="background:#FF9800;color:#fff;padding:8px 16px;border:none;border-radius:25px;margin:5px;">Copy Link</button>
</div>
`;

document.querySelector(".post-content").appendChild(shareBox);

});

// Share Functions
function getShareText(){
return document.title + " - " + window.location.href;
}

function shareWhatsApp(){
window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`,'_blank');
}

function shareFacebook(){
window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,'_blank');
}

function shareTwitter(){
window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`,'_blank');
}

function copyURL(){
navigator.clipboard.writeText(getShareText());
alert("Link copied!");
}

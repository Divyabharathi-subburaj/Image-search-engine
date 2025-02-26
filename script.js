const accesskey = "ZhToDTKxiVLHVGS2Er6MaBqg7e32adY570KHklnm8pE"; 
const searchform = document.getElementById("search-form"); 
const searchbox = document.getElementById("search-box"); 
const searchresult = document.getElementById("search-result"); 
const showmorebtn = document.getElementById("show-more-btn"); 
let keyword = ""; 
let page = 1; 
async function searchImages() { 
keyword = searchbox.value; // Get the value from the search box 
if (!keyword) { 
alert("Please enter a search keyword."); 
return; 
}
const url = 
`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_
 page=12`; 
try { 
const response = await fetch(url); 
const data = await response.json(); 
if (page === 1) { 
searchresult.innerHTML = ""; // Clear previous results 
} 
const results = data.results; 
if (results.length === 0) { 
alert("No images found."); 
} 
results.map((result) => { 
const image = document.createElement("img"); 
image.src = result.urls.small; 
const imageLink = document.createElement("a"); 
imageLink.href = result.links.html; 
imageLink.target = "_blank"; 
imageLink.appendChild(image); 
searchresult.appendChild(imageLink); 
}); 
if (results.length > 0) { 
showmorebtn.style.display = "block"; 
} else { 
showmorebtn.style.display = "none"; 
} 
} catch (error) { 
console.error("Error fetching data:", error); 
alert("There was an error fetching images. Please try again later."); 
} 
} 
searchform.addEventListener("submit", (e) => { 
e.preventDefault(); 
page = 1; // Reset to first page for new search 
searchImages(); 
}); 
showmorebtn.addEventListener("click", () => { 
page++; // Increase page number for next set of results 
searchImages(); 
}); 

function createNewListElement(title, text, url, imgLink = "https://i.imgur.com/yJXzdMP.jpeg") {
    let parentElement = document.getElementsByClassName("user-items-list-simple")[0];
    let listElement = document.getElementsByClassName("list-item")[0].cloneNode(true);

    //New image
    let img = document.createElement('img');
    img.src = imgLink;
    img.style = "width: 100%; object-fit: cover;";
    img.classList.add('list-image');
    listElement.childNodes[1].childNodes[1].childNodes[1].replaceWith(img.cloneNode(true));

    //New header
    listElement.childNodes[3].childNodes[1].childNodes[1].textContent = title;
    
    //New Description
    listElement.childNodes[3].childNodes[1].childNodes[3].textContent = text;

    //New URL
    listElement.childNodes[3].childNodes[3].childNodes[1].childNodes[1].attributes["href"].nodeValue = url;

    //Finito
    parentElement.appendChild(listElement);
}

document.addEventListener("DOMContentLoaded", () => {
    //This is manual rn but in the future it'll be automatic
    let page = "opinion";    
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://khranicle.vercel.app/api/getArticleData/?beat=${page}`)}`, {
        method: 'GET'
    }).then(res => res.json())
        .then(({ contents }) => {
            for(let { title, desc, url, image } of JSON.parse(contents).reverse()) createNewListElement(title, desc, url, image);
            document.getElementsByClassName("list-item")[0].remove();
        });
});
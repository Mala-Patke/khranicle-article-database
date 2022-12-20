function createNewListElement(title, text, url, imgLink = "https://i.imgur.com/yJXzdMP.jpeg") {
    let parentElement = document.getElementsByClassName("user-items-list-simple")[0];
    let listElement = document.getElementsByClassName("list-item")[0].cloneNode(true);

    //New image
    listElement.childNodes[1].childNodes[1].childNodes[1].attributes["data-src"].nodeValue = imgLink;

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
    fetch("https://khranicle.vercel.app/api/getArticleData/?beat=opinion")
        .then(res => res.json())
        .then(data => {
            for(let { title, desc, url } of data) {
                createNewListElement(title, desc, url)
            }
        })
});
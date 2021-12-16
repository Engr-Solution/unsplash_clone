let searchString = location.search.split('=').pop();
const accessKey = 'zgDRVPo5DrYsscZlyAQ-QdKl2IbHFJkzPHg2uXjsM_c';
const randomImageURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const searchedImageURL = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchString}&per_page=50`;
let gallery = document.querySelector('#gallery');
let allImages; 
let currentImage = 0;

const getRandomImages = () => {
    fetch(randomImageURL)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        getImage(allImages);
    })
}
// 
const getSearchImages = () => {
    fetch(searchedImageURL)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        getImage(allImages);
    })
}
// 
const getImage = (data) => {
    data.forEach((item, index) => {
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'img';

        gallery.appendChild(img);

        img.addEventListener('click', () => {
            currentImage = index;
            showLightBox(item);
        })
    });
}

// 
const showLightBox = (item) => {
    const lightbox = document.querySelector('.lightBox');
    const downloadBtn = document.querySelector('.download');
    const closeBtn = document.querySelector('.delete');
    const img = document.querySelector('.lightBox_img');

    lightbox.classList.remove('hide');
    downloadBtn.querySelector('a').href = item.links.html;
    img.src = item.urls.regular;

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hide');
    })
}

const next = document.querySelector('.next');
next.addEventListener('click', () => {
    if(currentImage < allImages.length - 1) currentImage++;
    else currentImage = 0;
    showLightBox(allImages[currentImage]);
})
const prev = document.querySelector('.prev');
prev.addEventListener('click', () => {
    if(currentImage > 0) currentImage--;
    else currentImage = allImages.length - 1;
    showLightBox(allImages[currentImage]);
})

if(searchString == '') getRandomImages();
else getSearchImages();


// function generateMeme() {
  
//   const memetitle = document.querySelector(".meme-title");
//   const memeimg = document.querySelector(".meme-img");
//   const authoroutput = document.querySelector(".author span");
//   // Your meme generation code goes here
//   fetch("https://meme-api.com/gimme/wholesomememes")
//     .then((res) => res.json())
//     .then((data) => {
//       const { author, title, url } = data;
//       memetitle.innerText = title;
//       memeimg.src = url;
//       authoroutput.innerText = author;
//       console.log(author, title, url);
//     });
// }

// generateMeme()


let previousMeme = null;
let likedMemes = [];

function generateMeme() {
  const memeTitle = document.querySelector(".meme-title");
  const memeImg = document.querySelector(".meme-img");
  const authorOutput = document.querySelector(".author span");
  const historyList = document.querySelector(".history-list");

  if (memeTitle.textContent !== "Click the above button to get new memes") {
    previousMeme = {
      title: memeTitle.textContent,
      img: memeImg.src,
      author: authorOutput.textContent
    };
    displayPreviousMeme();
  }

  memeTitle.textContent = "Loading...";
  memeImg.src = "loading-spinner.gif"; // Placeholder loading spinner image
  authorOutput.textContent = "Loading...";

  fetch("https://meme-api.com/gimme/wholesomememes")
    .then((res) => res.json())
    .then((data) => {
      const { author, title, url } = data;
      memeTitle.textContent = title;
      memeImg.src = url;
      authorOutput.textContent = author;

      // Add to history
      const historyItem = document.createElement("li");
      historyItem.innerHTML = `
        <p><strong>${title}</strong></p>
        <img src="${url}" alt="${title}" style="width: 100px; border-radius: 5px;">
        <p>Author: ${author}</p>
      `;
      historyList.prepend(historyItem);
    })
    .catch((error) => {
      memeTitle.textContent = "Error loading meme!";
      memeImg.src = "error-image.png"; // Placeholder error image
      authorOutput.textContent = "N/A";
      console.error("Error fetching meme:", error);
    });
}

function displayPreviousMeme() {
  const previousMemeContainer = document.querySelector(".previous-meme");
  const previousMemeTitle = document.querySelector(".previous-meme-title");
  const previousMemeImg = document.querySelector(".previous-meme-img");
  const previousAuthor = document.querySelector(".previous-author span");

  if (previousMeme) {
    previousMemeContainer.style.display = "block";
    previousMemeTitle.textContent = previousMeme.title;
    previousMemeImg.src = previousMeme.img;
    previousAuthor.textContent = previousMeme.author;
  } else {
    previousMemeContainer.style.display = "none";
  }
}

function likeMeme() {
  const memeTitle = document.querySelector(".meme-title").textContent;
  const memeImg = document.querySelector(".meme-img").src;
  const author = document.querySelector(".author span").textContent;
  const likedList = document.querySelector(".liked-list");

  const likedMeme = {
    title: memeTitle,
    img: memeImg,
    author: author
  };

  likedMemes.push(likedMeme);

  const likedItem = document.createElement("li");
  likedItem.innerHTML = `
    <p><strong>${memeTitle}</strong></p>
    <img src="${memeImg}" alt="${memeTitle}" style="width: 100px; border-radius: 5px;">
    <p>Author: ${author}</p>
  `;
  likedList.prepend(likedItem);
}

function shareMeme() {
  const memeImg = document.querySelector(".meme-img").src;
  const shareData = {
    title: 'Meme',
    text: 'Check out this cool meme!',
    url: memeImg
  };

  try {
    navigator.share(shareData)
      .then(() => console.log('Meme shared successfully'))
      .catch((error) => console.log('Error sharing meme:', error));
  } catch (error) {
    console.log('Share API not supported', error);
  }
}

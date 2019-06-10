// selected html elements
const ul = document.querySelector('ul');
const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
const refreshButton = document.querySelector('#refresh');
let marginLeft = 0;

// Breaking Bad quote API source
const api = `https://breaking-bad-quotes.herokuapp.com/v1/quotes/20`;

// Retrieve API data
fetch(api)
.then((response) => {   
    return response.json();
})
.then((data) => {
    // check margins to determine ul placement
    checkPosition();

    // Create a new li element parent with div and p children for each quote
    data.forEach((quote) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const div = document.createElement('div');

        // set each p text content with quote
        p.textContent = `${quote.quote}`;

        // set each div with quote's author
        div.textContent = `- ${quote.author}`;
        ul.append(li);
        li.append(p);
        li.append(div);       
    });
});

const checkPosition = () => {
    // if ul is utmost left, disable previousButton
    if(marginLeft === 0) {
        previousButton.style.pointerEvents = 'none';
    } else {
        previousButton.style.pointerEvents = 'auto';
    }

    // if ul is utmost right, disable nextButton
    if(marginLeft <= -1900) {
        nextButton.style.pointerEvents = 'none';
    } else {
        nextButton.style.pointerEvents = 'auto';
    }
}

const next = () => {
    // move ul margin-left -100%;  
    marginLeft -= 100;
    checkPosition();
    ul.style.marginLeft = `${marginLeft}%`;  
}

const previous = () => {
    // move ul margin-left +100%;  
    marginLeft += 100;
    checkPosition();
    ul.style.marginLeft = `${marginLeft}%`;
}

// handlers
nextButton.addEventListener('click', () => {
    next();
});

previousButton.addEventListener('click', () => {
    previous();
});

refreshButton.addEventListener('click', () => {
    location.reload();
});

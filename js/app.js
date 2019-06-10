// selected html elements
const ul = document.querySelector('ul');
const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
const refreshButton = document.querySelector('#refresh');
let marginLeft = 0;

// Breaking Bad quote API source
const api = `https://breaking-bad-quotes.herokuapp.com/v1/quotes/20`;

const fetchFunction = () => {
    // Retrieve API data
    fetch(api)
        .then((response) => {   
            return response.json();
        })
        .then((data) => {
            // check margins to determine ul placement
            checkPosition();

            // replace text content when reloading quotes
            if(ul.children.length > 0) {
                let pArr = [...ul.querySelectorAll('p')];
                let divArr = [...ul.querySelectorAll('div')];

                data.forEach((quote) => {
                    // replace p text content when reloading quotes
                    pArr[data.indexOf(quote)].textContent = `${quote.quote}`;
                    // replace div text content when reloading quotes
                    divArr[data.indexOf(quote)].textContent = `${quote.author}`;   
                }); 
            } else {
            // Create a new li element parent with div and p children for each quote on initial load
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
            }
        });
}

window.addEventListener('load', ()=> {
    fetchFunction();
})


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
    fetchFunction();
});

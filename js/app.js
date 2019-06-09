// selected html elements
const ul = document.querySelector('ul');
const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
let marginLeft = 0;

// Breaking Bad quote API source
const api = `https://breaking-bad-quotes.herokuapp.com/v1/quotes/20`;

// Retrieve API data
fetch(api)
.then(function(response) {   
    return response.json();
})
.then(function(data) {
    // check margins to determine ul placement
    checkPosition();

    // Create a new li element parent with div and p children for each quote
    data.forEach(function(quote) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        let div = document.createElement('div');

        // set each p text content with quote
        p.textContent = `${quote.quote}`;

        // set each div with quote's author
        div.textContent = `- ${quote.author}`;
        ul.append(li);
        li.append(p);
        li.append(div);       
    });
});

function checkPosition() {
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

function next() {
    // move ul margin-left -100%;  
    marginLeft -= 100;
    checkPosition();
    ul.style.marginLeft = `${marginLeft}%`;  
    console.log(marginLeft);
}

function previous() {
    // move ul margin-left +100%;  
    marginLeft += 100;
    checkPosition();
    ul.style.marginLeft = `${marginLeft}%`;
}

// handlers
nextButton.addEventListener('click', function() {
    next();
});

previousButton.addEventListener('click', function() {
    previous();
});

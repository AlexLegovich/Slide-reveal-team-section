
const teamData = [
  {
    name: 'Chris Ellis',
    bio: 'Chris Ellis founded Bijou Wine in 2013 after twenty-five years in the wine industry. Previously he has worked as Export Director for a large French wine producer and was a founder shareholder of Western Wines. He has also consulted to a number of vineyards, wine producers, distributors and retailers. Chris was at the forefront of the retail wine revolution and has been heavily involved in both production and sales and marketing. He created, sourced and developed brands such as Kumala and Isla Negra and was the first person to bring in brands such as Cono Sur to the European Market.'
  },
  {
    name: 'Edward Vellacott',
    bio: 'English by birth, Edward was brought up in the South of France from the age of nine. After completing his French Baccalaureate he returned to the UK to study Management and Spanish at the University of Leeds, the highlight of which was spending a year working in the export division of a Spanish winery in Madrid.  Edward’s trustworthy personality allied with his interpersonal and communication skills continuously help him build strong cross-cultural relationships. He passed WSET Level 3 with Merit and will shortly complete the Diploma course.'
  },
  {
    name: 'Emily West',
    bio: 'Emily has over a decade of experience in marketing and brand development within agencies, as a consultant and in-house. She has previously planned and executed the marketing strategy for a new global skin clinic, curated art galleries and worked as an art dealer internationally, and has consulted on marketing and culture for brands such as MTV, Post Office, Casio and Kit Heath. Emily enjoys photography and has shot with brands such as DeBeers, Lofbergs and Charity Bank. She is training for her WSET and, when not working, enjoys walks with her miniature dachshund, Mayer (a nod to legendary guitarist, John).'
  },
  {
    name: 'Hélène Temmerman',
    bio: 'Hélène was born and raised in Belgium where she graduated as a bio engineer specializing in Agronomy. To pursue her passion for wine she has worked in countries such as Italy, France, and Croatia to research sustainability practices in the wine sector and to gain practical experience. Her additional Master’s in International Food and Beverage management at the business school of ESCP in Turin and Paris and her previous experience as business manager gave her in-depth knowledge of the commercial aspects of the wine market. Hélène has completed her WSET diploma.'
  },
  {
    name: 'Lecia Long',
    bio: ''
  }
];


// Variables

const slider = $('#slider')
const overlay = $('.main-overlay')


// Scrollbar width

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}


// Body lock and unlock

function lockBody() {
  const body = document.body
  const scrollbarWidth = getScrollbarWidth()
  body.style.overflow = 'hidden'
  body.style.paddingRight = `${scrollbarWidth}px`
}

function unlockBody() {
  const body = document.body
  body.style.overflow = ''
  body.style.paddingRight = ''
}





let sliderWidth = window.innerWidth <= 992 ? '100%' : 700
slider.slideReveal({
  trigger: $('.team__item-image'),
  position: 'right',
  push: false,
  overlay: true,
  position: 'right',
  overlayColor: 'rgba(0,0,0,0)',
  width: sliderWidth,
  speed: 600,

  show: function () {
    lockBody()
    overlay.addClass('active')
  },
  hide: function () {
    unlockBody()
    overlay.removeClass('active')
  },
})

$('.close-reveal').on('click', function () {
  slider.slideReveal('hide')
})








// Data changes

const teamImages = document.querySelectorAll('.team__item-image img');
const revealImage = document.querySelector('.reveal__image img');

const revealTitle = document.querySelector('.reveal__title');
const revealPosition = document.querySelector('.reveal__position');
const revealText = document.querySelector('.reveal__text');

teamImages.forEach((image) => {
  image.addEventListener('click', () => {

    revealImage.src = image.src;

    const teamItem = image.closest('.team__item');
    const name = teamItem.querySelector('.team__item-name');
    const position = teamItem.querySelector('.team__item-position');

    const nameText = name.textContent.trim(); 
    const positionText = position.textContent.trim();

    revealTitle.textContent = nameText;
    revealPosition.textContent = positionText;

    const memberData = teamData.find(person => person.name === nameText); 
    if (memberData) {
      revealText.textContent = memberData.bio
    } else {
      revealText.textContent = 'No biography available.'
    }
  });
})

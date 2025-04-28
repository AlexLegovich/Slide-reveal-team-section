
const teamData = [
  {
    name: 'Chris Ellis',
    text: 'Chris Ellis founded Bijou Wine in 2013 after twenty-five years in the wine industry. Previously he has worked as Export Director for a large French wine producer and was a founder shareholder of Western Wines. He has also consulted to a number of vineyards, wine producers, distributors and retailers. Chris was at the forefront of the retail wine revolution and has been heavily involved in both production and sales and marketing. He created, sourced and developed brands such as Kumala and Isla Negra and was the first person to bring in brands such as Cono Sur to the European Market.'
  },
  {
    name: 'Edward Vellacott',
    text: 'English by birth, Edward was brought up in the South of France from the age of nine. After completing his French Baccalaureate he returned to the UK to study Management and Spanish at the University of Leeds, the highlight of which was spending a year working in the export division of a Spanish winery in Madrid.  Edward’s trustworthy personality allied with his interpersonal and communication skills continuously help him build strong cross-cultural relationships. He passed WSET Level 3 with Merit and will shortly complete the Diploma course.'
  },
  {
    name: 'Emily West',
    text: 'Emily has over a decade of experience in marketing and brand development within agencies, as a consultant and in-house. She has previously planned and executed the marketing strategy for a new global skin clinic, curated art galleries and worked as an art dealer internationally, and has consulted on marketing and culture for brands such as MTV, Post Office, Casio and Kit Heath. Emily enjoys photography and has shot with brands such as DeBeers, Lofbergs and Charity Bank. She is training for her WSET and, when not working, enjoys walks with her miniature dachshund, Mayer (a nod to legendary guitarist, John).'
  },
  {
    name: 'Hélène Temmerman',
    text: 'Hélène was born and raised in Belgium where she graduated as a bio engineer specializing in Agronomy. To pursue her passion for wine she has worked in countries such as Italy, France, and Croatia to research sustainability practices in the wine sector and to gain practical experience. Her additional Master’s in International Food and Beverage management at the business school of ESCP in Turin and Paris and her previous experience as business manager gave her in-depth knowledge of the commercial aspects of the wine market. Hélène has completed her WSET diploma.'
  }
];



let missingMessage = 'Info will be added later'




// Add overlay to DOM

const overlay = document.createElement('div')
overlay.classList.add('main-overlay')
document.body.appendChild(overlay)

// Create sidebar

const sidebar = document.createElement('div')
sidebar.classList.add('sidebar')
document.body.appendChild(sidebar)


sidebar.innerHTML = `<div class="close-sidebar">
      </div>
      <div class="sidebar__image">
        <img src="" alt="Image" />
      </div>
      <h4 class="sidebar__title">Title</h4>
      <p class="sidebar__position">position</p>
      <div class="sidebar__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
        voluptatum quas cum placeat reprehenderit at distinctio saepe, numquam
        culpa reiciendis beatae? Quisquam adipisci autem ipsum fuga nisi minus
        id quibusdafm.
      </div>`

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



const sideBarWidthDesktop = 600;
const position = 'right'
const isPushing = false;



let sidebarWidth = window.innerWidth <= 640 ? '100%' : sideBarWidthDesktop
$(sidebar).slideReveal({
  trigger: $('.team__item'),
  position: position,
  push: isPushing,
  overlay: true,
  overlayColor: 'rgba(0,0,0,0)',
  width: sidebarWidth,

  show: function () {
    lockBody();
    overlay.classList.add('active')

  },
  hide: function () {
    unlockBody();
    overlay.classList.remove('active')

  },
})

$('.close-sidebar').on('click', function () {
  $(sidebar).slideReveal('hide')
})




// Data changes

const teamItems = document.querySelectorAll('.team__item');
const sidebarImage = document.querySelector('.sidebar__image img');

const sidebarTitle = document.querySelector('.sidebar__title');
const sidebarPosition = document.querySelector('.sidebar__position');
const sidebarText = document.querySelector('.sidebar__text');

teamItems.forEach((item) => {
  item.addEventListener('click', () => {

    const image = item.querySelector('.team__item-image img');
    sidebarImage.src = image.src;

    const name = item.querySelector('.team__item-name');
    const position = item.querySelector('.team__item-position');

    const nameText = name ? name.textContent.trim() : '';
    const positionText = position ? position.textContent.trim() : '';

    if(sidebarTitle){
      sidebarTitle.textContent = nameText;
    }

    if (!positionText) {
      sidebarPosition.style.display = 'none';
    } else {
      sidebarPosition.style.display = '';
      sidebarPosition.textContent = positionText;
    }

    // if(sidebarPosition){
    //   sidebarPosition.textContent = positionText;
    // }

    const memberData = teamData.find(member => member.name === nameText); 
    if (memberData) {
      sidebarText.textContent = memberData.text;
    } else {
      sidebarText.textContent = missingMessage;
    }
  });
});


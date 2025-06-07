//Create overlay
const overlay = document.createElement('div')
overlay.classList.add('main-overlay')
document.body.appendChild(overlay)

//========================================================================================================================================================

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

//========================================================================================================================================================

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

//========================================================================================================================================================

//Slide reveal

let sidebarWidth = window.innerWidth <= 640 ? '100%' : sideBarWidthDesktop
$(sidebar).slideReveal({
  trigger: $('.team__item'),
  position: position,
  push: isPushing,
  overlay: true,
  overlayColor: 'rgba(0,0,0,0)',
  width: sidebarWidth,

  show: function () {
    lockBody()
    overlay.classList.add('active')
  },
  hide: function () {
    unlockBody()
    overlay.classList.remove('active')
  },
})

$('.close-sidebar').on('click', function () {
  $(sidebar).slideReveal('hide')
})


//Slide size update on resize

function updateSidebarWidth() {
  const newSidebarWidth =
    window.innerWidth <= 640 ? '100%' : sideBarWidthDesktop
  $(sidebar).css('width', newSidebarWidth)
  console.log(newSidebarWidth)
}

window.addEventListener('resize', updateSidebarWidth)

//========================================================================================================================================================

// Data changes
const teamItems = document.querySelectorAll('.team__item')
const sidebarImage = document.querySelector('.sidebar__image img')

const sidebarTitle = document.querySelector('.sidebar__title')
const sidebarPosition = document.querySelector('.sidebar__position')
const sidebarText = document.querySelector('.sidebar__text')

teamItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('.team__item-image .tn-atom')
    sidebarImage.src = image.style.backgroundImage.slice(5, -2)

    const name = item.querySelector('.team__item-name .tn-atom')
    const position = item.querySelector('.team__item-position .tn-atom')

    const nameText = name ? name.textContent.trim() : ''
    const positionText = position ? position.textContent.trim() : ''

    if (sidebarTitle) {
      sidebarTitle.textContent = nameText
    }

    if (!positionText) {
      sidebarPosition.style.display = 'none'
    } else {
      sidebarPosition.style.display = ''
      sidebarPosition.textContent = positionText
    }

    const memberData = teamData.find((member) => member.name === nameText)
    if (memberData) {
      sidebarText.textContent = memberData.text
    } else {
      sidebarText.textContent = missingMessage
    }
  })
})

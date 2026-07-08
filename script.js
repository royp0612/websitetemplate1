const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      // Reveal once, then stop observing to avoid repeated animation work.
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
  }
);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const cards = document.querySelectorAll('.card');

function setCardFaceState(card, isFlipped) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');

  if (!front || !back) {
    return;
  }

  front.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
  front.style.opacity = isFlipped ? '0' : '1';
  back.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)';
  back.style.opacity = isFlipped ? '1' : '0';
}

cards.forEach((card) => {
  setCardFaceState(card, false);

  card.addEventListener('click', () => {
    const isFlipped = !card.classList.contains('flipped');
    card.classList.toggle('flipped', isFlipped);
    setCardFaceState(card, isFlipped);
  });
});

const dropdown = document.querySelector('.dropdown');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

if (dropdown && dropdownButton) {
  const setDropdownOpen = (isOpen) => {
    dropdown.classList.toggle('open', isOpen);
    dropdownButton.setAttribute('aria-expanded', String(isOpen));
  };

  dropdownButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    setDropdownOpen(!isOpen);
  });

  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      setDropdownOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
    }
  });

  dropdownLinks.forEach((link) => {
    link.addEventListener('click', () => setDropdownOpen(false));
  });
}
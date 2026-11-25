const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const modal = $('#modal');
const toast = $('#toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

$('#createClubBtn').addEventListener('click', () => modal.classList.add('open'));
$('#modalClose').addEventListener('click', () => modal.classList.remove('open'));
$('.modal-backdrop').addEventListener('click', () => modal.classList.remove('open'));

$('#clubForm').addEventListener('submit', event => {
  event.preventDefault();
  modal.classList.remove('open');
  event.target.reset();
  showToast('Club submitted for admin review');
});

$$('.heart').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '♥' : '♡';
    showToast(button.classList.contains('liked') ? 'Club added to favorites' : 'Club removed from favorites');
  });
});

$$('.rsvp-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('joined');
    button.textContent = button.classList.contains('joined') ? 'Going ✓' : 'RSVP';
    showToast(button.classList.contains('joined') ? 'You’re on the guest list!' : 'RSVP cancelled');
  });
});

$('#searchBtn').addEventListener('click', () => {
  const query = $('#searchInput').value.trim().toLowerCase();
  if (!query) {
    showToast('Enter a club or event to search');
    return;
  }
  const clubMatch = $$('.club-card').find(card => card.dataset.name.toLowerCase().includes(query) || card.dataset.category.toLowerCase().includes(query));
  const eventMatch = $$('.event-card').find(card => card.dataset.name.toLowerCase().includes(query));
  if (clubMatch) { clubMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }); clubMatch.style.outline = '3px solid #ee774b'; setTimeout(() => clubMatch.style.outline = '', 1800); }
  else if (eventMatch) { eventMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }); eventMatch.style.outline = '3px solid #ee774b'; setTimeout(() => eventMatch.style.outline = '', 1800); }
  else showToast(`No results found for “${$('#searchInput').value.trim()}”`);
});

$('#searchInput').addEventListener('keydown', event => { if (event.key === 'Enter') $('#searchBtn').click(); });

$('#menuBtn').addEventListener('click', () => $('.nav-links').classList.toggle('open'));
$$('.nav-links a').forEach(link => link.addEventListener('click', () => $('.nav-links').classList.remove('open')));

$('#notificationBtn').addEventListener('click', () => showToast('You’re all caught up!'));
$('#profileBtn').addEventListener('click', () => showToast('Profile menu coming soon'));
$('#adminBtn').addEventListener('click', () => showToast('Admin dashboard demo ready'));
$('#prevEvent').addEventListener('click', () => $('#eventList').scrollBy({ left: -300, behavior: 'smooth' }));
$('#nextEvent').addEventListener('click', () => $('#eventList').scrollBy({ left: 300, behavior: 'smooth' }));

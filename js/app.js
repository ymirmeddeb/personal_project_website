document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  var searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action to avoid submitting a form if there is one
      searchPages();
    }
  });
});

function searchPages() {
  var input = document.getElementById('searchInput');
  var filter = input.value.toUpperCase();
  var ul = document.querySelector('.navbar');
  var li = ul.getElementsByTagName('li');
  var pageFound = false; // Flag to check if we found a page

  // Loop through all list items, and redirect to the page that matches the search query
  for (var i = 0; i < li.length; i++) {
    var a = li[i].getElementsByTagName("a")[0];
    var txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      window.location.href = a.href; // Redirect to the matched page
      pageFound = true; // We found a page, so set the flag
      break; // Break the loop after finding the first match
    }
  }

  // If no page is found, you could alert the user or handle it differently
  if (!pageFound) {
    alert('No matching page found.');
  }
}


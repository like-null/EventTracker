// Listen for the popstate event
window.addEventListener('popstate', function(event) {
  // Get the URL of the search results page
  var searchUrl = window.location.href;

  // Get the referrer URL
  var referrer = document.referrer;

  // Get the time spent on the website
  var timeSpent = new Date() - performance.timing.navigationStart;

  // Create a custom event with the search URL, referrer URL, and time spent
  var customEvent = new CustomEvent('userNavigatedBack', {
    detail: {
      searchUrl: searchUrl,
      referrer: referrer,
      timeSpent: timeSpent
    }
  });

  // Dispatch the custom event
  document.dispatchEvent(customEvent);

  // Send the data to the server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/store-info.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(customEvent.detail));
});

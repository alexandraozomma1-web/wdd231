document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab URL query parameters passed from the join form
  const urlParams = new URLSearchParams(window.location.search);
  const resultsContainer = document.querySelector("#results-container");

  // 2. Extract required form values
  const firstName = urlParams.get("fname");
  const lastName = urlParams.get("lname");
  const email = urlParams.get("email");
  const phone = urlParams.get("phone");
  const organization = urlParams.get("organization");
  const timestamp = urlParams.get("timestamp");

  // 3. Display the submitted data matching the Advanced Forms learning pattern
  if (firstName || lastName || email) {
    resultsContainer.innerHTML = `
      <h2>Applicant Summary</h2>
      <ul class="results-list">
        <li><strong>First Name:</strong> ${firstName ? decodeURIComponent(firstName) : "N/A"}</li>
        <li><strong>Last Name:</strong> ${lastName ? decodeURIComponent(lastName) : "N/A"}</li>
        <li><strong>Email Address:</strong> ${email ? decodeURIComponent(email) : "N/A"}</li>
        <li><strong>Mobile Phone:</strong> ${phone ? decodeURIComponent(phone) : "N/A"}</li>
        <li><strong>Business / Organization:</strong> ${organization ? decodeURIComponent(organization) : "N/A"}</li>
        <li><strong>Application Timestamp:</strong> ${timestamp ? decodeURIComponent(timestamp) : "N/A"}</li>
      </ul>
    `;
  } else {
    resultsContainer.innerHTML = `<p>No application data found. Please submit the form from the <a href="join.html">Join page</a>.</p>`;
  }
});
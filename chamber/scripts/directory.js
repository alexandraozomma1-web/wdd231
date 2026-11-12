// Hamburger Menu Toggle
const mainNav = document.querySelector(".nav-links");
const hamburgerBtn = document.querySelector("#menu-toggle");

if (hamburgerBtn && mainNav) {
  hamburgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
  });
}

// Member Data Fetching and Display (Only runs on directory.html)
const url = "data/members.json";
const displayContainer = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

if (displayContainer && gridBtn && listBtn) {
  async function getMemberData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayMembers(data);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  }

  const displayMembers = (members) => {
    displayContainer.innerHTML = "";

    members.forEach((member) => {
      let card = document.createElement("section");
      card.classList.add("member-card");

      let levelText = "Member";
      if (member.membershipLevel === 2) levelText = "Silver Member";
      if (member.membershipLevel === 3) levelText = "Gold Member";

      card.innerHTML = `
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
        <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="120" height="80">
        <p class="address">${member.address}</p>
        <p class="phone">${member.phone}</p>
        <p class="website"><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <span class="membership-badge level-${member.membershipLevel}">${levelText}</span>
      `;

      displayContainer.appendChild(card);
    });
  };

  gridBtn.addEventListener("click", () => {
    displayContainer.classList.add("grid-layout");
    displayContainer.classList.remove("list-layout");
    gridBtn.classList.add("active-view");
    listBtn.classList.remove("active-view");
  });

  listBtn.addEventListener("click", () => {
    displayContainer.classList.add("list-layout");
    displayContainer.classList.remove("grid-layout");
    listBtn.classList.add("active-view");
    gridBtn.classList.remove("active-view");
  });

  getMemberData();
}

// Footer Dates setup (Safe for all pages)
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
  lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}
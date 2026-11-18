document.addEventListener("DOMContentLoaded", () => {
  // 1. Populate hidden timestamp field with current date & time on page load
  const timestampField = document.querySelector("#timestamp");
  if (timestampField) {
    timestampField.value = new Date().toLocaleString();
  }

  // 2. Open the corresponding HTML <dialog> modal when "Learn More" is clicked
  const openButtons = document.querySelectorAll(".modal-open-btn");
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  // 3. Close modals via the close button or clicking outside the modal backdrop
  const closeButtons = document.querySelectorAll(".modal-close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) {
        modal.close();
      }
    });
  });

  const modals = document.querySelectorAll(".membership-modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.close();
      }
    });
  });
});

// 4. Mobile Navigation Hamburger Menu Toggle
  const hamButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (hamButton && navigation) {
    hamButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      hamButton.classList.toggle("open");
    });
  }

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const bookingForm = document.querySelector("#booking-form");
const checkIn = document.querySelector("#check-in");
const checkOut = document.querySelector("#check-out");
const roomType = document.querySelector("#room-type");
const formMessage = document.querySelector("#form-message");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );

  navMenu.classList.toggle("open", !isOpen);
});

// Close the mobile menu after clicking a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Set today's date as the earliest check-in date
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

checkIn.min = localToday;
checkOut.min = localToday;

// Keep check-out after check-in
checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || localToday;

  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = "";
  }

  formMessage.textContent = "";
});

// Allow guests to select a room directly from a room card
document.querySelectorAll("[data-room]").forEach((link) => {
  link.addEventListener("click", () => {
    roomType.value = link.dataset.room;
  });
});

// Booking form validation and demo confirmation
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (checkIn.value < localToday) {
    formMessage.textContent = "Please select a valid check-in date.";
    checkIn.focus();
    return;
  }

  if (checkOut.value <= checkIn.value) {
    formMessage.textContent =
      "Check-out must be at least one day after check-in.";
    checkOut.focus();
    return;
  }

  const guestName = document.querySelector("#guest-name").value.trim();
  const selectedRoom = roomType.value;

  formMessage.textContent =
    `Thank you, ${guestName}! Your ${selectedRoom} reservation request ` +
    "has been prepared. This is a demo website, so no booking has been sent. " +
    "Connect a booking service to receive real reservations.";

  bookingForm.reset();

  checkIn.min = localToday;
  checkOut.min = localToday;
});

// Automatically update the copyright year
document.querySelector("#year").textContent = new Date().getFullYear();

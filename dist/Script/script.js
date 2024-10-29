const profile_action = document.querySelector(".profile_img");
const profile_list = document.querySelector(".action_list");

if (profile_action) {
  profile_action.addEventListener("click", () => {
    profile_list.classList.toggle("hide_element");
  });
}

const location_list = document.querySelectorAll(".location_action_btn");

const handleModals = (modalBg, modalBtn, modalClose) => {
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modalBg.classList.remove("flex_show");
      modalBg.classList.add("hide_element");
    });
    modalBtn.addEventListener("click", () => {
      modalBg.classList.add("flex_show");
      modalBg.classList.remove("hide_element");
    });
  }
};
const globalDropDown = (object) => {
  object.nextElementSibling.classList.toggle("hide_element");
};

const handleLocationDropDown = () => {
  location_list.forEach((btn) => {
    btn.addEventListener("click", () => globalDropDown(btn));
  });
};

handleLocationDropDown();

const menu_drawer = document.querySelector(".mobile_menu_drawer");
const menu_closer = document.querySelector(".close_sidebar");
const sidebar = document.querySelector(".sidebar");

if (menu_drawer) {
  menu_closer.addEventListener("click", () => {
    sidebar.classList.toggle("hide_sidebar");
  });

  menu_drawer.addEventListener("click", () => {
    sidebar.classList.toggle("hide_sidebar");
  });
}

const addTruckModal = document.querySelector(".add_truck_madal");
const modalTitle = document.getElementById("modalTitle");
const truckForm = document.getElementById("truckForm");

// Inputs
const truckIdInput = document.getElementById("truckId");
const truckNameInput = document.getElementById("truckName");
const truckTypeInput = document.getElementById("truckType");
const truckCapacityInput = document.getElementById("truckCapacity");
const truckUnitInput = document.getElementById("truckUnit");
const truckDimensionInput = document.getElementById("truckDimension");
const truckNumberInput = document.getElementById("truckNumber");

// Open the modal for adding a new truck
function openAddTruckModal() {
  modalTitle.textContent = "Add Truck";
  clearFormFields();
  addTruckModal.classList.add("flex_show");
}

// Open the modal for editing a truck
function openEditTruckModal(truck) {
  modalTitle.textContent = "Edit Truck";
  truckIdInput.value = truck.id;
  truckNameInput.value = truck.name;
  truckTypeInput.value = truck.type;
  truckCapacityInput.value = truck.capacity;
  truckDimensionInput.value = truck.dimension;
  truckNumberInput.value = truck.number;

  for (let i = 0; i < truckUnitInput.options.length; i++) {
    truckUnitInput.options[i].selected =
      truckUnitInput.options[i].value === truck.unit;
  }

  addTruckModal.classList.add("flex_show");
}

// Clear form fields when adding a new truck
function clearFormFields() {
  truckIdInput.value = "";
  truckNameInput.value = "";
  truckTypeInput.value = "";
  truckCapacityInput.value = "";
  truckUnitInput.value = "ton"; // Default to 'ton'
  truckDimensionInput.value = "";
  truckNumberInput.value = "";
}

// Handle form submission (for adding/editing a truck)
if (truckForm) {
  truckForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const truckId = truckIdInput.value;
    const truckData = {
      name: truckNameInput.value,
      type: truckTypeInput.value,
      capacity: truckCapacityInput.value,
      unit: truckUnitInput.value,
      dimension: truckDimensionInput.value,
      number: truckNumberInput.value,
    };

    if (truckId) {
      updateTruck(truckId, truckData); // Edit existing truck
    } else {
      addNewTruck(truckData); // Add new truck
    }

    addTruckModal.classList.remove("flex_show"); // Close modal
  });
}

// Dummy functions for adding and updating trucks
function addNewTruck(truckData) {
  console.log("Adding new truck", truckData);
}

function updateTruck(truckId, truckData) {
  console.log("Updating truck with ID", truckId, truckData);
}

// Render trucks from array and filter by status
const trucks = [
  {
    id: 1,
    name: "Thunderbolt",
    type: "Flatbed",
    capacity: "20 tons",
    number: "ABX-4597",
    dimension: "8.5m x 3.2m",
    status: "available",
    images: ["./dist/img/truck1.jpg", "./dist/img/truck2.jpg"],
  },
  {
    id: 2,
    name: "Mercedes",
    type: "Heavy Duty",
    capacity: "15 tons",
    number: "MNX-5523",
    dimension: "7.5m x 3.0m",
    status: "booked",
    images: ["./dist/img/truck3.jpg", "./dist/img/truck4.jpg"],
  },
  // Add more truck objects here
];

function renderTrucks(filter) {
  const truckList = document.querySelector(".trucks_list");
  if (truckList) {
    truckList.innerHTML = ""; // Clear previous trucks
    const filteredTrucks =
      filter === "all"
        ? trucks
        : trucks.filter((truck) => truck.status === filter);

    filteredTrucks.forEach((truck) => {
      const truckElement = document.createElement("li");
      truckElement.classList.add(
        "truck",
        "gap-2",
        "mt-4",
        "px-2",
        "py-2",
        "rounded"
      );
      truckElement.dataset.id = truck.id;

      truckElement.innerHTML = `
        <div class="truck_image_canvas">
          <small class="overlay_dimension dimension bg_gray px-2 py-1 rounded">${
            truck.dimension
          }</small>
          <div class="truck_slide">
            ${truck.images
              .map((img) => `<img src="${img}" alt="" class="rounded" />`)
              .join("")}
          </div>
        </div>
        <div class="meta_details justify-content-between w-100">
          <span class="main_description">
            <div class="d-flex flex-column mt-1">
              <span class="title fs-5">${truck.name}</span>
              <small class="gray_color2 type">${truck.type}</small>
            </div>
            <div class="d-flex gap-2 mt-2">
              <small class="bg_gray px-3 py-1 rounded capacity">${
                truck.capacity
              }</small>
              <small class="bg_gray px-3 py-1 rounded number">${
                truck.number
              }</small>
            </div>
            <div class="mt-4 d-flex gap-2 truck_action">
              <button class="btn d-flex gap-2 align-items-center delete">
                <i class="fa-solid fa-trash"></i>Delete
              </button>
              <button class="btn d-flex gap-2 align-items-center edit">
                <i class="fa-solid fa-pen-nib"></i>Edit
              </button>
            </div>
          </span>
          <span class="">
            <select name="status" class="mt-2 mt-md-0 rounded px-2 py-2 border-0 select_status">
              <option value="available" ${
                truck.status === "available" ? "selected" : ""
              }>Available</option>
              <option value="booked" ${
                truck.status === "booked" ? "selected" : ""
              }>Booked</option>
            </select>
          </span>
        </div>
      `;

      truckList.appendChild(truckElement);
    });
    // Reinitialize slick slider
    $(".truck_slide").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
    });
  }
}

// Event delegation for handling clicks on edit buttons
const truck_list = document.querySelector(".trucks_list");
if (truck_list) {
  truck_list.addEventListener("click", function (e) {
    if (e.target.closest(".edit")) {
      const truckElement = e.target.closest(".truck");
      const truck = {
        id: truckElement.dataset.id,
        name: truckElement.querySelector(".title").textContent,
        type: truckElement.querySelector(".type").textContent,
        capacity: truckElement
          .querySelector(".capacity:first-child")
          .textContent.split(" ")[0],
        unit: truckElement
          .querySelector(".capacity:first-child")
          .textContent.split(" ")[1],
        dimension: truckElement.querySelector(".dimension").textContent,
        number: truckElement.querySelector(".number:last-child").textContent,
      };

      openEditTruckModal(truck);
    }
  });
}

// Filter truck status
const filter = document.querySelector("#filter");

if (filter) {
  filter.addEventListener("change", function (e) {
    const filterValue = e.target.value; // 'all', 'available', or 'booked'
    renderTrucks(filterValue);
  });
}

// Open modal for adding new truck
const add_truck = document.querySelector(".add_truck_btn");
if (add_truck) {
  add_truck.addEventListener("click", openAddTruckModal);
}

// Close modal
const close_truck_maodal = document.querySelector(".close_btn_modal_truck");

if (close_truck_maodal) {
  close_truck_maodal.addEventListener("click", () => {
    addTruckModal.classList.remove("flex_show");
    addTruckModal.classList.add("hide_element");
  });
}

// Initial rendering of all trucks
document.addEventListener("DOMContentLoaded", function () {
  renderTrucks("all");
});

// const wthd_description = document.querySelectorAll('.withdrawal_description')
const description_btn = document.querySelectorAll(".descrition_drop_btn");

{
  /* <i class="fa-solid fa-caret-up"></i> */
}
if (description_btn) {
  description_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("fa-caret-up");
      btn.classList.toggle("fa-caret-down");
      const trigger_parent = btn.parentElement;
      const sibling_to_target = trigger_parent.parentElement;
      const e_target = sibling_to_target.nextSibling;
      e_target.nextSibling.classList.toggle("hide_element");
    });
  });
}

// Select all checkboxes when the header checkbox is clicked
const selector = document.getElementById("selectAll");
if (selector) {
  selector.addEventListener("change", function (e) {
    const checkboxes = document.querySelectorAll(".select_ind");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  });
}

// Uncheck the "Select All" checkbox if any row checkbox is unchecked
const select_indicators = document.querySelectorAll(".select_ind");
if (select_indicators) {
  select_indicators.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const selectAll = document.getElementById("selectAll");
      const allChecked = Array.from(
        document.querySelectorAll(".select_ind")
      ).every((cb) => cb.checked);
      selectAll.checked = allChecked;
    });
  });
}

const desposit = document.querySelector(".deposit_modal");
const withdraw = document.querySelector(".withdraw_modal");
const withdrawBtn = document.querySelector(".withdraw");
const DepositBtn = document.querySelector(".deposit");
const btnclose_deposit = document.querySelector(".close_deposit");
const btnwithdrawal_close = document.querySelector(".withdrawal_close");

handleModals(desposit, DepositBtn, btnclose_deposit);
handleModals(withdraw, withdrawBtn, btnwithdrawal_close);

const menu_icon = document.querySelector(".menu");
const mobile_menu = document.querySelector(".mb_dropdown");

if (menu_icon) {
  menu_icon.addEventListener("click", () => {
    mobile_menu.classList.toggle("hide_drop");
  });
}

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

if (tabs) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active_tab"));
      contents.forEach((c) => c.classList.remove("active_content"));

      tab.classList.add("active_tab");
      document
        .getElementById(tab.getAttribute("data-tab"))
        .classList.add("active_content");
    });
  });
}

const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

// Load countries from REST Countries API
/* async function loadCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  countries.sort((a, b) => a.name.common.localeCompare(b.name.common)); // Sort alphabetically

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.cca2; // Use ISO country code
    option.text = country.name.common;
    countrySelect.add(option);
  });
}

// Load states based on selected country
async function loadStates() {
  const country = countrySelect.value;
  stateSelect.innerHTML =
    '<option value="" disabled selected hidden>Select State</option>'; // Reset states
  citySelect.innerHTML =
    '<option value="" disabled selected hidden>Select City</option>'; // Reset cities
  citySelect.disabled = true;
  stateSelect.disabled = false;

  // Fetch states from GeoDB Cities API
  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/regions`,
    {
      headers: {
        "X-RapidAPI-Key": "472e6c6f93mshd7c39d2fbf534b0p18b3eajsnd85fe10f01bd",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  const states = data.data;

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.code;
    option.text = state.name;
    stateSelect.add(option);
  });
}

const sstate = document.querySelector('.state_down')
sstate.addEventListener('click',loadStates)



// Load cities based on selected state
async function loadCities() {
  const country = countrySelect.value;
  const state = stateSelect.value;
  citySelect.innerHTML =
    '<option value="" disabled selected hidden>Select City</option>';
  citySelect.disabled = false;

  // Fetch cities from GeoDB Cities API
  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country}/regions/${state}/cities`,
    {
      headers: {
        "X-RapidAPI-Key": "472e6c6f93mshd7c39d2fbf534b0p18b3eajsnd85fe10f01bd",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  const cities = data.data;

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.id;
    option.text = city.name;
    citySelect.add(option);
  });
}

// Load countries on page load
loadCountries(); */






const apiKey = '472e6c6f93mshd7c39d2fbf534b0p18b3eajsnd85fe10f01bd'; // Replace with your API key

// Function to fetch data from GeoDB Cities API
async function fetchGeoData(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  });
  return response.json();
}

// Load Countries on Page Load
async function loadCountries() {
  const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';
  const data = await fetchGeoData(url);

  const countrySelect = document.getElementById('country');
  data.data.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });

  // Enable the state select once a country is chosen
  countrySelect.addEventListener('change', () => {
    document.getElementById('state').disabled = false;
    loadStates(countrySelect.value);
  });
}

// Load States based on selected Country
async function loadStates(countryCode) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`;
  const data = await fetchGeoData(url);

  const stateSelect = document.getElementById('state');
  stateSelect.innerHTML = `<option value="" disabled selected hidden>Select State</option>`;
  
  data.data.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.code;
    option.textContent = state.name;
    stateSelect.appendChild(option);
  });

  // Enable the city select once a state is chosen
  stateSelect.addEventListener('change', () => {
    document.getElementById('city').disabled = false;
    loadCities(countryCode, stateSelect.value);
  });
}

// Load Cities based on selected State
async function loadCities(countryCode, regionCode) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions/${regionCode}/cities`;
  const data = await fetchGeoData(url);

  const citySelect = document.getElementById('city');
  citySelect.innerHTML = `<option value="" disabled selected hidden>Select City</option>`;
  
  data.data.forEach((city) => {
    const option = document.createElement('option');
    option.value = city.id;
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
}

// Call loadCountries when the page loads
window.onload = loadCountries;




































const formStep1btn = document.querySelector(".step1");
const formStep = document.querySelector(".form-groups1");
const formStep2 = document.querySelector(".form-groups2");

if (formStep1btn) {
  formStep1btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStep.classList.toggle("hid");
    formStep2.classList.toggle("hid");
  });
}

const num1btn = document.querySelector(".num1");

if (num1btn) {
  num1btn.addEventListener("click", () => {
    formStep.classList.toggle("hid");
    formStep2.classList.toggle("hid");
  });
}

const num2btn = document.querySelector(".num2")

if (num2btn) {
  num2btn.addEventListener("click", () => {
    formStep.classList.toggle("hid");
    formStep2.classList.toggle("hid");
  });
}



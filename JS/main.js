let addNewBtn = document.querySelector(".add-new");
let closeFormBtn = document.querySelector(".close");
let formSection = document.querySelector(".form");
let contactForm = document.querySelector(".addNewContent");

addNewBtn.addEventListener("click", () => {
  formSection.classList.add("overlay");
  contactForm.style.display = "block";
});
closeFormBtn.addEventListener("click", () => {
  formSection.classList.remove("overlay");
  contactForm.style.display = "none";
});

let savedData = localStorage.getItem("contact");
let contactList = JSON.parse(savedData || "[]");

let contactFormName = document.getElementById("Contact-form-name");
let contactFormPhone = document.getElementById("Contact-form-phone");
let contactFormEmail = document.getElementById("Contact-form-email");
let contactFormAddress = document.getElementById("Contact-form-address");

let lastContantId = contactList.length;

let newContact = () => {
  contactList.push({
    contactId: lastContantId += 1,
    contactName: contactFormName.value,
    contactPhone: contactFormPhone.value,
    contactEmail: contactFormEmail.value,
    contactAddress: contactFormAddress.value
  });
};

let contactTableBody = document.getElementById("tbody");

let renderContacts = () => {
  let tr = "";
  contactList.forEach(contact => {
    tr += `
    <tr data-id = ${contact.contactId}> 
    <td>${contact.contactId}</td>
    <td>${contact.contactName}</td>
    <td>${contact.contactPhone}</td>
    <td>${contact.contactEmail}</td>
    <td>${contact.contactAddress}</td>
    <td class="green">Edit</td>
    <td class="red">Delete</td>
  </tr>
    `
  });
  contactTableBody.innerHTML = tr;
};

let resetFormContact = () => {
  contactFormName.value = "";
  contactFormPhone.value = "";
  contactFormEmail.value = "";
  contactFormAddress.value = "";
};

let saveBtn = document.querySelector(".save");

function saveBtnHandeler() {
  newContact();
  localStorage.setItem("contact", JSON.stringify(contactList));
  formSection.classList.remove("overlay");
  contactForm.style.display = "none";
  renderContacts();
  resetFormContact();
};

saveBtn.addEventListener("click", saveBtnHandeler);

contactTableBody.addEventListener("click", e => {
  if (e.target.classList.contains("green")) {
    let tr = e.target.parentElement;
    let id = tr.dataset.id;
    let index = id - 1;
    contactFormName.value = contactList[index].contactName;
    contactFormPhone.value = contactList[index].contactPhone;
    contactFormEmail.value = contactList[index].contactEmail;
    contactFormAddress.value = contactList[index].contactAddress;

    formSection.classList.add("overlay");
    contactForm.style.display = "block";
    let updatehandeler = () => {
      let updatedContact = {
        contactId: parseInt(id),
        contactName: contactFormName.value,
        contactPhone: contactFormPhone.value,
        contactEmail: contactFormEmail.value,
        contactAddress: contactFormAddress.value
      };
      contactList[index] = updatedContact;
      localStorage.setItem("contact", JSON.stringify(contactList));
      formSection.classList.remove("overlay");
      contactForm.style.display = "none";
      resetFormContact();
      renderContacts();
      saveBtn.removeEventListener("click", updatehandeler);
      saveBtn.addEventListener("click", saveBtnHandeler);
    };
    saveBtn.removeEventListener("click", saveBtnHandeler);
    saveBtn.addEventListener("click", updatehandeler);
  };

  if (e.target.classList.contains("red")) {
    let tr = e.target.parentElement;
    let id = tr.dataset.id;
    let index = parseInt(id) - 1;
    contactList.splice(index, 1);
    localStorage.setItem("contact", JSON.stringify(contactList));
    renderContacts();
  };
});

let searchInput = document.getElementById("search");
let form = searchInput.parentElement;
form.addEventListener("submit", e => e.preventDefault());

searchInput.addEventListener("keyup", () => {
  let searchInputValue = searchInput.value.toLowerCase();
  let tr = document.querySelectorAll("tbody tr")

  tr.forEach(tr => {
    let trName = tr.children[1].textContent.toLowerCase();
    if (trName.includes(searchInputValue)) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  })
})


window.addEventListener('DOMContentLoaded', () => {
  let savedData = localStorage.getItem('contact');
  let contactList = JSON.parse(savedData || '[]');

  renderContacts();
});
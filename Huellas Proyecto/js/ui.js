let currentView = "inicio";
let previewRole = "cliente"; // 'guest' | 'cliente' | 'colaborador' | 'administrador'
let activePetIdForEdit = null;
let activeRequestId = null;

document.addEventListener("DOMContentLoaded", () => {
  updateRoleVisuals();
  navigateTo("inicio");
});

function toggleUserDropdown() {
  document.getElementById("userDropdown").classList.toggle("hidden");
}

function setPreviewRole(role) {
  previewRole = role;
  document.getElementById("userDropdown").classList.add("hidden");
  updateRoleVisuals();
  if (currentView === "roles" && role !== "administrador") {
    navigateTo("inicio");
  } else {
    navigateTo(currentView);
  }
}

function updateRoleVisuals() {
  const badge = document.getElementById("roleBadge");
  const topLabel = document.getElementById("topUserLabel");
  const navRoles = document.getElementById("navAdminRoles");
  const divRoles = document.getElementById("dividerAdminRoles");
  const btnAddPet = document.getElementById("btnOpenAddPet");

  const labels = {
    guest: "Invitado",
    cliente: "Cliente",
    colaborador: "Colaborador",
    administrador: "Administrador"
  };

  badge.textContent = `Vista: ${labels[previewRole]}`;
  topLabel.textContent = previewRole === "guest" ? "INICIAR SESIÓN" : labels[previewRole].toUpperCase();

  const isStaff = previewRole === "colaborador" || previewRole === "administrador";
  const isAdmin = previewRole === "administrador";

  if (btnAddPet) btnAddPet.classList.toggle("hidden", !isStaff);
  if (navRoles) navRoles.classList.toggle("hidden", !isAdmin);
  if (divRoles) divRoles.classList.toggle("hidden", !isAdmin);
}

function navigateTo(viewName) {
  currentView = viewName;
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  const template = document.getElementById(`view-${viewName}`);
  const container = document.getElementById("appContent");
  
  if (template && container) {
    container.innerHTML = "";
    container.appendChild(template.content.cloneNode(true));
  }

  updateRoleVisuals();

  if (viewName === "inicio") renderPets("featuredPetsGrid", MOCK_PETS.filter((p) => p.destacada));
  if (viewName === "mascotas") renderPets("allPetsGrid", MOCK_PETS);
  if (viewName === "solicitudes") renderRequests();
  if (viewName === "roles") renderRoles();
}

function renderPets(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list
    .map(
      (pet) => `
      <div class="pet-card" onclick="openPetDetail('${pet.id}')">
        <img src="${pet.imagen}" alt="${pet.nombre}" />
        <h3>${pet.nombre}</h3>
      </div>
    `
    )
    .join("");
}

function openPetDetail(petId) {
  const pet = MOCK_PETS.find((p) => p.id === petId);
  if (!pet) return;

  document.getElementById("detailName").textContent = pet.nombre;
  document.getElementById("detailBreed").textContent = pet.raza;
  document.getElementById("detailAge").textContent = pet.edad;
  document.getElementById("detailPersonality").textContent = pet.personalidad;
  document.getElementById("detailCare").textContent = pet.cuidados;
  document.getElementById("detailVaccines").textContent = pet.vacunas;
  document.getElementById("detailImage").src = pet.imagen;

  const actions = document.getElementById("detailActions");
  const isStaff = previewRole === "colaborador" || previewRole === "administrador";

  if (isStaff) {
    actions.innerHTML = `
      <button class="btn-mint-pill" onclick="closeModal('petDetailModal')">Regresar</button>
      <button class="btn-mint-pill" style="background-color: #ffb3ba;" onclick="deletePet('${pet.id}')">Eliminar publicación</button>
      <button class="btn-mint-pill" onclick="openPetFormModal('${pet.id}')">Modificar publicación</button>
    `;
  } else if (previewRole === "guest") {
    actions.innerHTML = `
      <button class="btn-mint-pill" onclick="closeModal('petDetailModal')">Regresar</button>
      <button class="btn-mint-pill" onclick="openAuthModal('login')">Inicia sesión para adoptar</button>
    `;
  } else {
    actions.innerHTML = `
      <button class="btn-mint-pill" onclick="closeModal('petDetailModal')">Regresar</button>
      <button class="btn-mint-pill" onclick="openAdoptModal('${pet.nombre}')">Realizar solicitud de adopción</button>
    `;
  }

  document.getElementById("petDetailModal").classList.remove("hidden");
}

function openPetFormModal(petId = null) {
  closeModal("petDetailModal");
  activePetIdForEdit = petId;
  const btn = document.getElementById("petFormSubmitBtn");
  
  if (petId) {
    const pet = MOCK_PETS.find((p) => p.id === petId);
    document.getElementById("petNameInput").value = pet.nombre;
    document.getElementById("petBreedInput").value = pet.raza;
    document.getElementById("petAgeInput").value = pet.edad;
    document.getElementById("petPersonalityInput").value = pet.personalidad;
    document.getElementById("petCareInput").value = pet.cuidados;
    document.getElementById("petVaccinesInput").value = pet.vacunas;
    document.getElementById("petPreviewImg").src = pet.imagen;
    btn.textContent = "Guardar Cambios";
  } else {
    document.getElementById("petNameInput").value = "";
    document.getElementById("petBreedInput").value = "";
    document.getElementById("petAgeInput").value = "";
    document.getElementById("petPersonalityInput").value = "";
    document.getElementById("petCareInput").value = "";
    document.getElementById("petVaccinesInput").value = "";
    document.getElementById("petPreviewImg").src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80";
    btn.textContent = "Agregar Mascota";
  }
  document.getElementById("petFormModal").classList.remove("hidden");
}

function savePetForm() {
  const name = document.getElementById("petNameInput").value;
  const breed = document.getElementById("petBreedInput").value;
  const age = document.getElementById("petAgeInput").value;
  const personality = document.getElementById("petPersonalityInput").value;
  const care = document.getElementById("petCareInput").value;
  const vaccines = document.getElementById("petVaccinesInput").value;

  if (activePetIdForEdit) {
    const pet = MOCK_PETS.find(p => p.id === activePetIdForEdit);
    if (pet) {
      pet.nombre = name;
      pet.raza = breed;
      pet.edad = age;
      pet.personalidad = personality;
      pet.cuidados = care;
      pet.vacunas = vaccines;
    }
    alert(`¡Mascota "${name}" modificada exitosamente!`);
  } else {
    const newPet = {
      id: "pet-" + (MOCK_PETS.length + 1),
      nombre: name,
      raza: breed,
      edad: age,
      personalidad: personality,
      cuidados: care,
      vacunas: vaccines,
      destacada: true,
      imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80"
    };
    MOCK_PETS.unshift(newPet);
    alert(`¡Mascota "${name}" agregada exitosamente!`);
  }

  closeModal('petFormModal');
  navigateTo(currentView);
}

function deletePet(petId) {
  if (confirm("¿Estás seguro de eliminar esta publicación de mascota?")) {
    const index = MOCK_PETS.findIndex(p => p.id === petId);
    if (index !== -1) {
      MOCK_PETS.splice(index, 1);
    }
    closeModal('petDetailModal');
    navigateTo('mascotas');
    alert("Publicación eliminada correctamente.");
  }
}

let selectedPetForAdopt = "Bolita";
function openAdoptModal(petName = "Bolita") {
  selectedPetForAdopt = petName;
  closeModal("petDetailModal");
  document.getElementById("adoptModalTitle").textContent = `Solicitud de Adopción para ${petName}`;
  document.getElementById("adoptFormModal").classList.remove("hidden");
}

function submitAdoptForm() {
  const fullName = document.getElementById("adoptFullName").value;
  const residence = document.getElementById("adoptResidence").value;
  const housing = document.getElementById("adoptHousing").value;
  const time = document.getElementById("adoptTime").value;
  const reason = document.getElementById("adoptReason").value;

  const newReq = {
    id: "req-" + (MOCK_REQUESTS.length + 1),
    shortName: fullName.toUpperCase().split(" ")[0] + " " + (fullName.split(" ")[1] ? fullName.split(" ")[1][0] + "." : ""),
    fullName: fullName,
    petName: selectedPetForAdopt.toUpperCase(),
    residence: residence.toUpperCase(),
    housing: housing.toUpperCase(),
    freeTime: time,
    reason: reason
  };

  MOCK_REQUESTS.unshift(newReq);
  closeModal("adoptFormModal");
  alert(`¡Solicitud enviada con éxito para adoptar a ${selectedPetName || selectedPetForAdopt}! Nuestro equipo la evaluará.`);
  navigateTo("solicitudes");
}

let selectedPetName = "";

function renderRequests() {
  const list = document.getElementById("requestsList");
  if (!list) return;
  if (MOCK_REQUESTS.length === 0) {
    list.innerHTML = `<p style="text-align:center; padding: 20px; font-weight:600; color:#555;">No hay solicitudes pendientes en este momento.</p>`;
    return;
  }
  list.innerHTML = MOCK_REQUESTS.map(
    (req) => `
    <div class="request-row" onclick="openRequestDetail('${req.id}')">
      <span>${req.shortName}</span>
      <span>${req.petName}</span>
      <span>${req.residence}</span>
      <span>${req.housing}</span>
    </div>
  `
  ).join("");
}

function openRequestDetail(reqId) {
  const req = MOCK_REQUESTS.find((r) => r.id === reqId);
  if (!req) return;
  activeRequestId = req.id;
  document.getElementById("viewReqName").textContent = req.fullName;
  document.getElementById("viewReqPet").textContent = req.petName;
  document.getElementById("viewReqResidence").textContent = req.residence;
  document.getElementById("viewReqTime").textContent = req.freeTime;
  document.getElementById("viewReqHousing").textContent = req.housing;
  document.getElementById("viewReqReason").textContent = req.reason;
  document.getElementById("requestDetailModal").classList.remove("hidden");
}

function handleRequestAction(action) {
  const req = MOCK_REQUESTS.find(r => r.id === activeRequestId);
  const name = req ? req.fullName : "Solicitante";
  if (action === 'aceptar') {
    alert(`¡Solicitud de ${name} ACEPTADA con éxito! Se ha notificado al adoptante.`);
  } else {
    alert(`Solicitud de ${name} rechazada.`);
  }
  
  // Remover de la lista simulada
  const idx = MOCK_REQUESTS.findIndex(r => r.id === activeRequestId);
  if (idx !== -1) {
    MOCK_REQUESTS.splice(idx, 1);
  }

  closeModal('requestDetailModal');
  renderRequests();
}

function renderRoles() {
  const tbody = document.getElementById("usersRolesTableBody");
  if (!tbody) return;
  tbody.innerHTML = MOCK_USERS.map(
    (u, index) => `
    <tr>
      <td><strong>${u.nombre}</strong></td>
      <td>${u.correo}</td>
      <td>
        <select onchange="updateUserRole(${index}, this.value)">
          <option ${u.rol === "cliente" ? "selected" : ""} value="cliente">Cliente</option>
          <option ${u.rol === "colaborador" ? "selected" : ""} value="colaborador">Colaborador</option>
          <option ${u.rol === "administrador" ? "selected" : ""} value="administrador">Administrador</option>
        </select>
      </td>
    </tr>
  `
  ).join("");
}

function updateUserRole(index, newRole) {
  MOCK_USERS[index].rol = newRole;
  alert(`Rol de ${MOCK_USERS[index].nombre} actualizado a ${newRole.toUpperCase()}`);
}

function openAuthModal(mode = "login") {
  document.getElementById("userDropdown").classList.add("hidden");
  switchAuthMode(mode);
  document.getElementById("authModal").classList.remove("hidden");
}

function switchAuthMode(mode) {
  document.getElementById("loginForm").classList.toggle("hidden", mode !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", mode !== "register");
}

function simulateAuth(type) {
  if (type === 'login') {
    const user = document.getElementById("loginEmail").value;
    alert(`¡Bienvenido de nuevo, ${user}! Sesión iniciada correctamente.`);
    setPreviewRole('cliente');
  } else {
    const name = document.getElementById("regName").value || "Nuevo Usuario";
    alert(`¡Registro exitoso para ${name}! Ya puedes iniciar sesión.`);
    switchAuthMode('login');
    return;
  }
  closeModal('authModal');
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

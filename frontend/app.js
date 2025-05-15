//const apiBase = "http://localhost:5000/api";
const apiBase = "https://workshop-test-6cse.onrender.com/api";

let roles = [];

async function loadRoles() {
  roles = await (await fetch(`${apiBase}/roles`)).json();

  // Заполнить селект для формы добавления пользователя
  const roleSelect = document.getElementById("userRole");
  roleSelect.innerHTML = roles.map(r => `<option value="${r.id}">${r.name}</option>`).join("");
}

async function loadUsers() {
  const res = await fetch(`${apiBase}/users`);
  const users = await res.json();

  const tbody = document.querySelector("#usersTable tbody");

  tbody.innerHTML = users.map(u => `
    <tr data-id="${u.id}">
      <td><input class="edit-name" value="${u.name}" disabled></td>
      <td><input class="edit-email" value="${u.email}" disabled></td>
      <td>
        <select class="edit-role" disabled>
          ${roles.map(r => `<option value="${r.id}" ${r.id == u.role_id ? "selected" : ""}>${r.name}</option>`).join("")}
        </select>
      </td>
      <td>
        <button class="edit-btn">Редактировать</button>
        <button class="save-btn" style="display:none;">Сохранить</button>
        <button class="cancel-btn" style="display:none;">Отмена</button>
        <button class="delete-btn">Удалить</button>
      </td>
    </tr>
  `).join("");

  // Обновим селект пользователей для добавления задач
  const taskUserSelect = document.getElementById("taskUser");
  taskUserSelect.innerHTML = users.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
}

async function loadTasks() {
  const res = await fetch(`${apiBase}/tasks`);
  const tasks = await res.json();

  const usersRes = await fetch(`${apiBase}/users`);
  const users = await usersRes.json();
  const usersMap = Object.fromEntries(users.map(u => [u.id, u.name]));

  const tbody = document.querySelector("#tasksTable tbody");
  tbody.innerHTML = tasks.map(t => `
    <tr data-id="${t.id}">
      <td><input class="edit-title" value="${t.title}" disabled></td>
      <td><textarea class="edit-desc" disabled>${t.description}</textarea></td>
      <td>
        <select class="edit-user" disabled>
          ${users.map(u => `<option value="${u.id}" ${u.id == t.user_id ? "selected" : ""}>${u.name}</option>`).join("")}
        </select>
      </td>
      <td>
        <button class="edit-btn">Редактировать</button>
        <button class="save-btn" style="display:none;">Сохранить</button>
        <button class="cancel-btn" style="display:none;">Отмена</button>
        <button class="delete-btn">Удалить</button>
      </td>
    </tr>
  `).join("");
}

// Обработчик добавления пользователя
document.getElementById("userForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const role_id = document.getElementById("userRole").value;

  await fetch(`${apiBase}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, role_id }),
  });

  e.target.reset();
  await loadUsers();
});

// Обработчик добавления задачи
document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDesc").value;
  const user_id = document.getElementById("taskUser").value;

  await fetch(`${apiBase}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, user_id }),
  });

  e.target.reset();
  await loadTasks();
});

// Делегирование событий для таблицы пользователей (редактировать, сохранить, отмена, удалить)
document.querySelector("#usersTable tbody").addEventListener("click", async e => {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const userId = tr.dataset.id;

  if (e.target.classList.contains("edit-btn")) {
    tr.querySelectorAll("input, select").forEach(el => el.disabled = false);
    toggleButtons(tr, true);
  } else if (e.target.classList.contains("cancel-btn")) {
    await loadUsers();
  } else if (e.target.classList.contains("save-btn")) {
    const name = tr.querySelector(".edit-name").value;
    const email = tr.querySelector(".edit-email").value;
    const role_id = tr.querySelector(".edit-role").value;

    await fetch(`${apiBase}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role_id }),
    });

    await loadUsers();
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Удалить пользователя?")) {
      await fetch(`${apiBase}/users/${userId}`, { method: "DELETE" });
      await loadUsers();
    }
  }
});

// Делегирование событий для таблицы задач
document.querySelector("#tasksTable tbody").addEventListener("click", async e => {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const taskId = tr.dataset.id;

  if (e.target.classList.contains("edit-btn")) {
    tr.querySelectorAll("input, select, textarea").forEach(el => el.disabled = false);
    toggleButtons(tr, true);
  } else if (e.target.classList.contains("cancel-btn")) {
    await loadTasks();
  } else if (e.target.classList.contains("save-btn")) {
    const title = tr.querySelector(".edit-title").value;
    const description = tr.querySelector(".edit-desc").value;
    const user_id = tr.querySelector(".edit-user").value;

    await fetch(`${apiBase}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, user_id }),
    });

    await loadTasks();
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Удалить задачу?")) {
      await fetch(`${apiBase}/tasks/${taskId}`, { method: "DELETE" });
      await loadTasks();
    }
  }
});

function toggleButtons(tr, editing) {
  tr.querySelector(".edit-btn").style.display = editing ? "none" : "inline";
  tr.querySelector(".save-btn").style.display = editing ? "inline" : "none";
  tr.querySelector(".cancel-btn").style.display = editing ? "inline" : "none";
  tr.querySelector(".delete-btn").disabled = editing;
}

// Инициализация загрузки данных
async function init() {
  await loadRoles();
  await loadUsers();
  await loadTasks();
}

init();

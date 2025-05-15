const apiBase = "/api";

async function loadRoles() {
  const res = await fetch(`${apiBase}/roles`);
  const roles = await res.json();
  const roleSelect = document.getElementById("userRole");
  roleSelect.innerHTML = roles.map(r => `<option value="${r.id}">${r.name}</option>`).join("");
}

async function loadUsers() {
  const res = await fetch(`${apiBase}/users`);
  const users = await res.json();
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = users.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role_name || "—"}</td>
    </tr>
  `).join("");

  const taskUserSelect = document.getElementById("taskUser");
  taskUserSelect.innerHTML = users.map(u => `<option value="${u.id}">${u.name}</option>`).join("");
}

async function loadTasks() {
  const res = await fetch(`${apiBase}/tasks`);
  const tasks = await res.json();
  const tbody = document.querySelector("#tasksTable tbody");

  const users = await (await fetch(`${apiBase}/users`)).json();
  const usersMap = Object.fromEntries(users.map(u => [u.id, u.name]));

  tbody.innerHTML = tasks.map(t => `
    <tr>
      <td>${t.title}</td>
      <td>${t.description}</td>
      <td>${usersMap[t.user_id] || "?"}</td>
    </tr>
  `).join("");
}

document.getElementById("userForm").addEventListener("submit", async (e) => {
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

document.getElementById("taskForm").addEventListener("submit", async (e) => {
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

loadRoles();
loadUsers();
loadTasks();

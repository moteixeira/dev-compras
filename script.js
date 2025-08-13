// Pega elementos principais
const form = document.getElementById('form-add-item');
const input = document.getElementById('new-item');
const list = document.getElementById('shopping-list');
alertBox = document.getElementById('alert');
alertClose = document.querySelector('.alert-close');
alertText = document.querySelector('.alert-left span');

// Inicia alerta escondido e registra o "fechar"
if (alertBox) {
  hideAlert();
  alertClose && alertClose.addEventListener('click', hideAlert);
}

// Adiciona item ao enviar o formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = (input.value || '').trim();
  if (!text) {
    input.focus();
    return;
  }

  // Monta o <li> no padrão do HTML/CSS
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `
    <label class="item-left">
      <input type="checkbox" class="check" />
      <span class="label">${escapeHtml(text)}</span>
    </label>
    <button class="btn-icon btn-delete" title="Remover">
      <i class="hgi hgi-stroke hgi-delete-02"></i>
    </button>
  `;

  list.appendChild(li);

  form.reset();   // limpa input
  input.focus();
});

// Remover item com delegação de eventos na <ul>
list.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-delete');
  if (!btn) return;

  const li = btn.closest('.item');
  if (!li) return;

  li.remove();

  // Mostra alerta por alguns segundos (se existir)
  if (alertBox) {
    if (alertText) alertText.textContent = 'O item foi removido da lista';
    showAlertTemporarily();
  }
});

// ---- helpers simples ----
function showAlertTemporarily() {
  alertBox.style.display = 'flex';
  clearTimeout(showAlertTemporarily._t);
  showAlertTemporarily._t = setTimeout(hideAlert, 3000);
}

function hideAlert() {
  alertBox.style.display = 'none';
}

// Evita inserir HTML no texto do item
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

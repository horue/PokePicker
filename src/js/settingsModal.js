const openBtn = document.querySelector('#btnConfig');
const saveBtn = document.querySelector('#btnSave');
let state = false

saveBtn.addEventListener('click', () => {
    console.log('Botão de salvar clicado');
    hideSettingsModal();
    state = false;
});

openBtn.addEventListener('click', () => {
    console.log('Botão de configuração clicado');
    if (!state) {
        showSettingsModal();
        state = true;
    } else {
        hideSettingsModal();
        state = false;
    }
});

function showSettingsModal() {
  const modal = document.querySelector('.pokebox-config');
  modal.style.visibility = 'visible';
}

function hideSettingsModal() {
  const modal = document.querySelector('.pokebox-config');
  modal.style.visibility = 'hidden';
}

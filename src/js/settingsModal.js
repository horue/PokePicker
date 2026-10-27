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

testBtn.addEventListener('click', () => {
    console.log('Botão de teste clicado');
    const generationSelect = document.querySelector('#generations');
    const selectedGeneration = generationSelect.value;
    console.log('Geração selecionada:', selectedGeneration);
});

function showSettingsModal() {
  const modal = document.querySelector('.pokebox-config');
  modal.style.visibility = 'visible';
}

function hideSettingsModal() {
  const modal = document.querySelector('.pokebox-config');
  modal.style.visibility = 'hidden';
}

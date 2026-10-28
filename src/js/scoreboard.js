const container = document.getElementById("scoreboard-container");
const btnCriar = document.getElementById("btnAddPlayer");

btnCriar.addEventListener("click", () => {
    const nome = prompt("Nome do jogador:") || "Jogador";
    
    const layout = `
        <div class="scoreboard">
            <a><span class="player-name">${nome}</span></a>: 
            <button class="btn-remove">-</button>
            <span class="score-valor">0</span>
            <button class="btn-add">+</button>
        </div>
    `;

    
    container.insertAdjacentHTML("beforeend", layout);
});

container.addEventListener("click", (elemento) => {
    const button = elemento.target;
    if (button.classList.contains("btn-add")) {
        const placar = button.closest(".scoreboard"); 
        const spanScore = placar.querySelector(".score-valor");
        spanScore.textContent = parseInt(spanScore.textContent) + 1;
    }

    if (button.classList.contains("btn-remove")) {
        const placar = button.closest(".scoreboard");
        const spanScore = placar.querySelector(".score-valor");
        const atual = parseInt(spanScore.textContent);
        if (atual > 0) spanScore.textContent = atual - 1;
        else if (atual === 0) {
            const remove = confirm("Remove " + placar.querySelector(".player-name").textContent + "?");
            if (remove) {
                placar.remove();
            }
        }
    }
});
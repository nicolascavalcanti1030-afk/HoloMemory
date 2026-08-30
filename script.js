// Configuracao dos Niveis 
const configNiveis = {
  1: { pares: 10, classe: 'level-1' },
  2: { pares: 18, classe: 'level-2' },
  3: { pares: 35, classe: 'level-3' }
};

let cartasFlipped = [];
let lockBoard = false;
let moves = 0;
let matches = 0;
let totalParesNivel = 10;

// Inicializa o Nivel 1 ao carregar a pagina
window.onload = () => iniciarJogo(1);

function iniciarJogo(nivel) {
  const board = document.getElementById('board');
  const config = configNiveis[nivel];
  
  totalParesNivel = config.pares;
  moves = 0;
  matches = 0;
  cartasFlipped = [];
  lockBoard = false;

  document.getElementById('moves').textContent = moves;
  document.getElementById('matches').textContent = matches;
  document.getElementById('total-matches').textContent = totalParesNivel;

  
  board.className = config.classe;
  board.innerHTML = '';

  // Seleciona as imagens para o nivel atual
  let imagensNivel = [];
  for (let i = 1; i <= totalParesNivel; i++) {
    imagensNivel.push(`img${i}.png`); // Ex: img1.png, img2.png...
  }

  // Duplica as imagens para formar os pares e embaralha
  let baralho = [...imagensNivel, ...imagensNivel];
  baralho.sort(() => Math.random() - 0.5);

  // Cria os elementos HTML das cartas
  baralho.forEach(srcImagem => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = srcImagem;

    card.innerHTML = `
      <img class="card-face card-front" src="imagens/${srcImagem}" alt="Carta">
      <img class="card-face card-back" src="imagens/fundo.png" alt="Fundo">
    `;

    card.addEventListener('click', virarCarta);
    board.appendChild(card);
  });
}

function virarCarta() {
  if (lockBoard) return;
  if (this === cartasFlipped[0]) return;

  this.classList.add('flip');

  if (cartasFlipped.length === 0) {
    cartasFlipped.push(this);
    return;
  }

  cartasFlipped.push(this);
  moves++;
  document.getElementById('moves').textContent = moves;

  checarPar();
}

function checarPar() {
  let [carta1, carta2] = cartasFlipped;
  let eIgual = carta1.dataset.image === carta2.dataset.image;

  eIgual ? desativarCartas() : desvirarCartas();
}

function desativarCartas() {
  cartasFlipped[0].removeEventListener('click', virarCarta);
  cartasFlipped[1].removeEventListener('click', virarCarta);

  matches++;
  document.getElementById('matches').textContent = matches;
  resetJogada();

  if (matches === totalParesNivel) {
    setTimeout(() => alert(` ${moves} numero de  tentativas!`), 500);
  }
}

function desvirarCartas() {
  lockBoard = true;
  setTimeout(() => {
    cartasFlipped[0].classList.remove('flip');
    cartasFlipped[1].classList.remove('flip');
    resetJogada();
  }, 1000);
}

function resetJogada() {
  cartasFlipped = [];
  lockBoard = false;
}
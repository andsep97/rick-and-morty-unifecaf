/* 
Trabalho matéria (⅔) parte prática - Web Programming For Front End 
Nome: Anderson Alves Pereira 
Curso: Análise e Desenvolvimento de Sistema EAD 
Data: 05/05/2026 
Descrição: Carrega e exibe personagens da série Rick and Morty com interface interativa e traduzido para português

 */

// CONSTANTES DE CONFIGURAÇÃO 
const API_URL = 'https://rickandmortyapi.com/api/character';
const CARD_FLIP_DURATION = 0.6; // segundos
const CONTAINER_SELECTOR = '#cards-container';

// DICIONÁRIOS DE TRADUÇÃO 
// Mapeia valores de status da API para português 
const TRADUCOES_STATUS = {
    'Alive': 'Vivo',
    'Dead': 'Morto',
    'unknown': 'Desconhecido'
};

// Mapeia valores de espécies da API para português
const TRADUCOES_ESPECIE = {
    'Human': 'Humano',
    'Humanoid': 'Humanóide',
    'Poopybutthole': 'Poopybutthole',
    'Mythological Creature': 'Criatura Mitológica',
    'Unknown': 'Desconhecida',
    'Animal': 'Animal',
    'Alien': 'Alienígena',
    'Robot': 'Robô',
    'Cronenberg': 'Cronenberg',
    'Disease': 'Doença',
    'Planet': 'Planeta'
};

// Mapeia valores de gênero da API para português
const TRADUCOES_GENERO = {
    'Male': 'Masculino',
    'Female': 'Feminino',
    'Genderless': 'Sem gênero',
    'unknown': 'Desconhecido'
};


//Rótulos das seções de informação nos cards
const ROTULOS = {
    'tipo': 'Tipo',
    'genero': 'Gênero',
    'origem': 'Origem',
    'localizacao': 'Localização',
    'episodio': 'Episódio'
};

// Mapeia localizações da API para português
const TRADUCOES_LOCALIZACAO = {
    'Earth (Replacement Dimension)': 'Terra (Dimensão de Reposição)',
    'Earth (C-137)': 'Terra (C-137)',
    'Citadel of Ricks': 'Cidadela dos Ricks',
    'Interdimensional Cable': 'Cabo Interdimensional',
    'Anatomy Park': 'Parque Anatomia',
    'Jerryboree': 'Jerryboree',
    'Blips and Chitz': 'Blips and Chitz',
    'Mortytown': 'Mortytown',
    'Ricks Laboratory': 'Laboratório do Rick',
    'Smiths House': 'Casa dos Smiths',
    'Cronenberg World': 'Mundo Cronenberg',
    'Venzenulon 7': 'Venzenulon 7',
    'unknown': 'Desconhecida',
    'Testicle Monster Dimension': 'Dimensão do Monstro Testículo',
};


// Mapeia tipos de personagem da API para português
const TRADUCOES_TIPO = {
    'Soulless Puppet': 'Marionete sem Alma',
    'Eat shiter-Person': 'Pessoa Comedora de Cocô',
    'Humanoid': 'Humanóide',
    'Alcoholic': 'Alcoólatra',
    'Mythological Creature': 'Criatura Mitológica',
    'Mutant': 'Mutante',
    'Artificial Intelligence': 'Inteligência Artificial',
    'Magic Creature': 'Criatura Mágica',
    'Demon': 'Demônio',
    'Virus': 'Vírus',
    'Alien': 'Alienígena',
    'Genderless': 'Sem Gênero',
    'Clone': 'Clone',
    'Human': 'Humano',
    'Genetic experiment': 'Experimento Genético',
};

// FUNÇÕES UTILITÁRIAS 
/** Traduz um valor usando um mapa de traduções
 * @param {string} valor - Valor a traduzir
 * @param {object} dicionario - Dicionário de traduções
 * @returns {string} - Valor traduzido ou o original se não encontrado
 */

// Retorna a tradução do valor usando o dicionário fornecido, ou o valor original se não houver tradução disponível
function traduzir(valor, dicionario) {
    return dicionario[valor] || valor;
}

/** Verifica se um valor é seguro (não vazio ou 'unknown') e retorna um valor padrão se não for
 * Obtém um valor seguro que pode estar vazio ou ser 'unknown'
 * @param {string} valor - Valor a verificar
 * @returns {string} - Valor seguro ou 'unknown' se o valor for inválido
 */

// Retorna o valor se ele for válido (não vazio e não 'unknown'), caso contrário retorna 'unknown'
function obterValorSeguro(valor) {
    return (valor && valor.trim()) ? valor : 'unknown';
}

// FUNÇÕES DE CRIAÇÃO DE ELEMENTOS 
/** Cria um elemento HTML com classes adicionais
 * @param {string} tag - Tag HTML a criar
 * @param {string[]} classes - Classes CSS a adicionar
 * @returns {HTMLElement} - Elemento criado
 */
function criarElemento(tag, classes = []) {
    const elemento = document.createElement(tag);
    if (classes.length > 0) {
        elemento.classList.add(...classes);
    }
    return elemento;
}

/** Cria a frente do card com imagem e informações básicas
 * @param {object} personagem - Dados do personagem da API
 * @returns {HTMLElement} - Elemento div com classe 'card-front'
 */
function criarFrente(personagem) {
    const cardFront = criarElemento('div', ['card-front']);

    // Imagem do personagem
    const img = criarElemento('img');
    img.src = personagem.image;
    img.alt = personagem.name;

    // Conteúdo: nome, status, espécie e localização
    const content = criarElemento('div', ['card-content']);

    // Nome
    const nome = criarElemento('h3');
    nome.textContent = personagem.name;

    // Status com estilo especial
    const status = criarElemento('p');
    const statusTraduzido = traduzir(personagem.status, TRADUCOES_STATUS);
    status.innerHTML = `
        Status: 
        <span class="status ${personagem.status.toLowerCase()}">
            ${statusTraduzido}
        </span>
    `;

    // Espécie
    const especie = criarElemento('p');
    const especieTraduzida = traduzir(personagem.species, TRADUCOES_ESPECIE);
    especie.textContent = `Espécie: ${especieTraduzida}`;

    // Localização
    const localizacao = criarElemento('p');
    const localizacaoNome = obterValorSeguro(personagem.location.name);
    const localizacaoTraduzida = traduzir(localizacaoNome, TRADUCOES_LOCALIZACAO);
    localizacao.textContent = `Localização: ${localizacaoTraduzida}`;

    // Montar a estrutura
    content.appendChild(nome);
    content.appendChild(status);
    content.appendChild(especie);
    content.appendChild(localizacao);

    cardFront.appendChild(img);
    cardFront.appendChild(content);

    return cardFront;
}

/** Cria o verso do card com informações detalhadas
 * @param {object} personagem - Dados do personagem da API
 * @returns {HTMLElement} Elemento div com classe 'card-back'
 */
function criarVerso(personagem) {
    const cardBack = criarElemento('div', ['card-back']);
    const backContent = criarElemento('div', ['card-back-content']);

    // Nome no verso
    const nomeBack = criarElemento('h3');
    nomeBack.textContent = personagem.name;
    nomeBack.style.color = '#e94560';

    // Tipo
    const tipo = criarElemento('div');
    const tipoTexto = obterValorSeguro(personagem.type) || personagem.species;
    const tipoTraduzido = traduzir(tipoTexto, TRADUCOES_TIPO);
    tipo.innerHTML = `<h4>${ROTULOS.tipo}:</h4><p>${tipoTraduzido}</p>`;

    // Gênero
    const genero = criarElemento('div');
    const generoTraduzido = traduzir(personagem.gender, TRADUCOES_GENERO);
    genero.innerHTML = `<h4>${ROTULOS.genero}:</h4><p>${generoTraduzido}</p>`;

    // Origem
    const origem = criarElemento('div');
    const origemNome = obterValorSeguro(personagem.origin.name);
    const origemTraduzida = traduzir(origemNome, TRADUCOES_LOCALIZACAO);
    origem.innerHTML = `<h4>${ROTULOS.origem}:</h4><p>${origemTraduzida}</p>`;

    // Episódio
    const episodio = criarElemento('div');
    let episodioNumero = 'Desconhecido';
    if (personagem.episode && personagem.episode.length > 0) {
        // Extrai o número do episódio da URL
        episodioNumero = personagem.episode[0].split('/').pop();
    }
    episodio.innerHTML = `<h4>${ROTULOS.episodio}:</h4><p>${episodioNumero}</p>`;

    // Montar a estrutura
    backContent.appendChild(nomeBack);
    backContent.appendChild(tipo);
    backContent.appendChild(genero);
    backContent.appendChild(origem);
    backContent.appendChild(episodio);

    cardBack.appendChild(backContent);

    return cardBack;
}

/** Cria um card completo (frente + verso) para um personagem
 * @param {object} personagem - Dados do personagem da API
 * @returns {HTMLElement} Elemento div com classe 'card'
 */
function criarCard(personagem) {
    // Estrutura do card com efeito flip 3D
    const card = criarElemento('div', ['card']);
    const cardInner = criarElemento('div', ['card-inner']);

    // Frente e verso do card
    const cardFront = criarFrente(personagem);
    const cardBack = criarVerso(personagem);

    // Montar a estrutura
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    // Adicionar evento de clique para virar o card
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    return card;
}

// FUNÇÃO PRINCIPAL
//Carrega os dados da API e renderiza os cards
function carregarEExibirPersonagens() {
    const container = document.querySelector(CONTAINER_SELECTOR);

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Limpar container
            container.innerHTML = '';

            // Criar um card para cada personagem
            data.results.forEach(personagem => {
                const card = criarCard(personagem);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar API:', error);
            container.innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar personagens. Tente novamente.</p>';
        });
}

// INICIALIZAÇÃO
// Inicia a aplicação quando o DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    carregarEExibirPersonagens();
});
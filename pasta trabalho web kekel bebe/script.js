/**
 * ==========================================================================
 * SITE ESCOLAR: VÔLEI (SISTEMA 5X1 E REGRAS)
 * Linguagem: JavaScript Puro (Vanilla JS)
 * Funcionalidades: Navegação entre páginas/seções, menu mobile, quadra
 * interativa, botão voltar ao topo e Quiz de Fixação.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. GERENCIAMENTO DE NAVEGAÇÃO ENTRE PÁGINAS/SEÇÕES
    // ----------------------------------------------------------------------
    const pageSections = document.querySelectorAll(".page-section");
    const navButtons = document.querySelectorAll(".nav-btn");
    const allPageTriggers = document.querySelectorAll("[data-page]");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");

    /**
     * Alterna a seção visível com base no ID da página
     * @param {string} pageId - ID da página (ex: 'inicio', 'sistema5x1', 'regras', 'videos', 'quiz')
     */
    function navegarPara(pageId) {
        if (!pageId) return;

        // 1. Esconde todas as seções e ativa a selecionada
        let targetSection = document.getElementById(pageId);
        if (!targetSection) {
            targetSection = document.getElementById("inicio");
            pageId = "inicio";
        }

        pageSections.forEach(section => {
            section.classList.remove("active");
        });
        targetSection.classList.add("active");

        // 2. Atualiza estado ativo nos botões da navbar
        navButtons.forEach(btn => {
            if (btn.getAttribute("data-page") === pageId) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // 3. Atualiza a URL sem recarregar a página (hash navigation)
        if (window.location.hash !== `#${pageId}`) {
            history.pushState(null, null, `#${pageId}`);
        }

        // 4. Rola a página suavemente para o topo
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // 5. Fecha o menu mobile caso esteja aberto
        if (navbar && navbar.classList.contains("menu-open")) {
            navbar.classList.remove("menu-open");
        }
    }

    // Adiciona evento de clique a todos os botões/links com atributo data-page
    allPageTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const targetPage = trigger.getAttribute("data-page");
            navegarPara(targetPage);
        });
    });

    // Suporte ao histórico de navegação do navegador (botões Voltar e Avançar)
    window.addEventListener("popstate", () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
            navegarPara(hash);
        } else {
            navegarPara("inicio");
        }
    });

    // Carrega página a partir da hash inicial da URL (se houver)
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash && document.getElementById(initialHash)) {
        navegarPara(initialHash);
    } else {
        navegarPara("inicio");
    }

    // ----------------------------------------------------------------------
    // 2. MENU MOBILE (HAMBÚRGUER)
    // ----------------------------------------------------------------------
    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("menu-open");
        });
    }

    // ----------------------------------------------------------------------
    // 3. BOTÃO FLUTUANTE VOLTAR AO TOPO
    // ----------------------------------------------------------------------
    const btnBackToTop = document.getElementById("btn-back-to-top");
    const btnFooterStart = document.getElementById("btn-footer-start");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnBackToTop.classList.add("visible");
        } else {
            btnBackToTop.classList.remove("visible");
        }
    });

    if (btnBackToTop) {
        btnBackToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (btnFooterStart) {
        btnFooterStart.addEventListener("click", () => {
            navegarPara("inicio");
        });
    }

    // ----------------------------------------------------------------------
    // 4. INTERATIVIDADE NA QUADRA DE VÔLEI EM CSS
    // ----------------------------------------------------------------------
    const courtPositions = document.querySelectorAll(".court-position");
    const posCards = document.querySelectorAll(".pos-card");

    courtPositions.forEach(posElement => {
        // Ao clicar em uma posição na quadra
        posElement.addEventListener("click", () => {
            const targetCardId = posElement.getAttribute("data-target");
            const targetCard = document.getElementById(targetCardId);

            // Remove destaque de todas as posições da quadra
            courtPositions.forEach(p => p.classList.remove("active-position"));
            posElement.classList.add("active-position");

            if (targetCard) {
                // Remove destaque de todos os cards
                posCards.forEach(c => c.classList.remove("highlighted"));

                // Adiciona destaque ao card selecionado
                targetCard.classList.add("highlighted");

                // Rola a tela até o card com efeito suave
                targetCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                // Remove o destaque temporário após 4 segundos
                setTimeout(() => {
                    targetCard.classList.remove("highlighted");
                    posElement.classList.remove("active-position");
                }, 4000);
            }
        });
    });

    // ----------------------------------------------------------------------
    // 5. QUIZ INTERATIVO ESCOLAR DE FIXAÇÃO
    // ----------------------------------------------------------------------
    const quizData = [
        {
            pergunta: "1. Quantos jogadores de cada equipe atuam simultaneamente dentro da quadra em um jogo oficial?",
            opcoes: [
                "5 jogadores",
                "6 jogadores",
                "7 jogadores",
                "11 jogadores"
            ],
            correta: 1, // B
            explicacao: "Correto! Cada equipe entra em quadra com exatamente 6 jogadores titulares."
        },
        {
            pergunta: "2. No Sistema Tático 5x1, como é a distribuição de funções dos atletas?",
            opcoes: [
                "5 atacantes e 1 levantador especialista",
                "5 defensores e 1 atacante",
                "3 levantadores e 3 atacantes",
                "5 levantadores e 1 bloqueador"
            ],
            correta: 0, // A
            explicacao: "Muito bem! O sistema 5x1 utiliza 5 atacantes e 1 único levantador especialista que organiza todas as jogadas."
        },
        {
            pergunta: "3. O toque da bola no bloqueio é contabilizado nos 3 toques permitidos da equipe?",
            opcoes: [
                "Sim, conta como o primeiro toque da equipe",
                "Não, o bloqueio não é contado nos 3 toques permitidos",
                "Só conta se a bola tocar no chão logo em seguida",
                "Conta apenas se o toque for do levantador"
            ],
            correta: 1, // B
            explicacao: "Excelente! O toque no bloqueio NÃO conta como um dos 3 toques da equipe. O time ainda tem direito a 3 toques completos."
        },
        {
            pergunta: "4. Qual é o sentido obrigatório do rodízio dos jogadores ao recuperarem o direito de sacar?",
            opcoes: [
                "Sentido anti-horário",
                "Sentido horário",
                "Livre, os jogadores escolhem onde ficar",
                "Apenas os jogadores da rede trocam de lugar"
            ],
            correta: 1, // B
            explicacao: "Correto! O rodízio ocorre sempre no sentido horário (a posição 1 vai para a 6, 6 para a 5, 5 para a 4, etc.)."
        },
        {
            pergunta: "5. Em caso de empate em 2 a 2 nos sets, até quantos pontos é disputado o 5º set (Tie-Break)?",
            opcoes: [
                "Até 25 pontos",
                "Até 21 pontos",
                "Até 15 pontos (com no mínimo 2 de vantagem)",
                "Até 10 pontos apenas"
            ],
            correta: 2, // C
            explicacao: "Perfeito! O 5º set decisivo (Tie-Break) vai até 15 pontos, mantendo a regra de no mínimo 2 pontos de vantagem."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const quizProgress = document.getElementById("quiz-progress");
    const quizScore = document.getElementById("quiz-score");
    const quizBody = document.getElementById("quiz-body");
    const quizResult = document.getElementById("quiz-result");
    const btnRestartQuiz = document.getElementById("btn-restart-quiz");

    /**
     * Renderiza a pergunta atual do Quiz
     */
    function renderQuestion() {
        if (!quizBody) return;

        const currentQ = quizData[currentQuestionIndex];
        quizProgress.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
        quizScore.textContent = `Pontuação: ${score}`;

        const letters = ["A", "B", "C", "D"];

        let html = `
            <h3 class="quiz-question-title">${currentQ.pergunta}</h3>
            <div class="quiz-options">
        `;

        currentQ.opcoes.forEach((opcao, index) => {
            html += `
                <button class="quiz-option-btn" data-index="${index}">
                    <span class="quiz-option-letter">${letters[index]}</span>
                    <span class="quiz-option-text">${opcao}</span>
                </button>
            `;
        });

        html += `
            </div>
            <div id="quiz-feedback-box" style="display: none;"></div>
            <div id="quiz-next-action" style="display: none; margin-top: 1rem; text-align: right;">
                <button class="btn btn-primary" id="btn-next-question">
                    ${currentQuestionIndex === quizData.length - 1 ? "Ver Resultado Final" : "Próxima Pergunta &rarr;"}
                </button>
            </div>
        `;

        quizBody.innerHTML = html;

        // Adiciona evento de resposta nas opções
        const optionButtons = quizBody.querySelectorAll(".quiz-option-btn");
        const feedbackBox = document.getElementById("quiz-feedback-box");
        const nextAction = document.getElementById("quiz-next-action");
        const btnNext = document.getElementById("btn-next-question");

        optionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedIndex = parseInt(btn.getAttribute("data-index"), 10);
                const isCorrect = selectedIndex === currentQ.correta;

                // Desativa todos os botões de opção
                optionButtons.forEach((b, idx) => {
                    b.setAttribute("disabled", "true");
                    if (idx === currentQ.correta) {
                        b.classList.add("correct");
                    } else if (idx === selectedIndex && !isCorrect) {
                        b.classList.add("wrong");
                    }
                });

                // Atualiza pontuação e feedback
                if (isCorrect) {
                    score += 20; // 5 perguntas x 20 = 100 pontos máx
                    quizScore.textContent = `Pontuação: ${score}`;
                    feedbackBox.className = "quiz-feedback success";
                    feedbackBox.innerHTML = `<strong>Acertou!</strong> ${currentQ.explicacao}`;
                } else {
                    feedbackBox.className = "quiz-feedback error";
                    feedbackBox.innerHTML = `<strong>Incorreto!</strong> ${currentQ.explicacao}`;
                }

                feedbackBox.style.display = "block";
                nextAction.style.display = "block";
            });
        });

        if (btnNext) {
            btnNext.addEventListener("click", () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    renderQuestion();
                } else {
                    showFinalResult();
                }
            });
        }
    }

    /**
     * Exibe a tela final com a pontuação e mensagem personalizada
     */
    function showFinalResult() {
        if (!quizBody || !quizResult) return;

        quizBody.style.display = "none";
        quizResult.style.display = "block";

        const resultIcon = document.getElementById("result-icon");
        const resultTitle = document.getElementById("result-title");
        const resultMessage = document.getElementById("result-message");

        if (score === 100) {
            resultIcon.textContent = "🏆";
            resultTitle.textContent = "Nota 10! Desempenho Perfeito!";
            resultMessage.textContent = `Você acertou todas as perguntas e fez ${score} de 100 pontos! Está pronto para tirar nota máxima no trabalho de Educação Física.`;
        } else if (score >= 60) {
            resultIcon.textContent = "👏";
            resultTitle.textContent = "Muito Bom Trabalho!";
            resultMessage.textContent = `Você fez ${score} de 100 pontos. Compreendeu a maior parte das regras e da tática 5x1!`;
        } else {
            resultIcon.textContent = "📖";
            resultTitle.textContent = "Vale a pena revisar!";
            resultMessage.textContent = `Você fez ${score} de 100 pontos. Dê uma lida rápida nas seções de Sistema 5x1 e Regras para reforçar o aprendizado!`;
        }
    }

    /**
     * Reinicia o Quiz
     */
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        if (quizBody && quizResult) {
            quizResult.style.display = "none";
            quizBody.style.display = "block";
            renderQuestion();
        }
    }

    if (btnRestartQuiz) {
        btnRestartQuiz.addEventListener("click", restartQuiz);
    }

    // Inicializa a primeira pergunta do quiz
    renderQuestion();
});

function carregar() {
  fetch("http://127.0.0.1:5500/materias.json")
    .then((response) => response.json())
    .then((content) => {
      console.log(content);
      content.periodos.map((periodo) => {
        const periodoElement = document.createElement("div");
        periodoElement.classList.add("periodo");

        const titulo = document.createElement("div");
        titulo.classList.add("titulo_periodo");
        titulo.textContent = periodo.titulo_periodo;
        periodoElement.appendChild(titulo);

        const box_materias = document.createElement("div");
        box_materias.classList.add("materias");
        periodoElement.appendChild(box_materias);

        periodo.materias.map((materia) => {
          const materiaElement = document.createElement("div");
          materiaElement.classList.add("disciplina_box");

          let disciplina = document.createElement("div");
          disciplina.classList.add("disciplina");

          let nome = document.createElement("div");
          nome.classList.add("nome_disciplina");
          nome.textContent = materia.nome_disciplina;
          disciplina.appendChild(nome);

          let carga = document.createElement("div");
          carga.classList.add("carga_horaria_box");
          let carga_texto = document.createElement("div");
          carga.classList.add("carga_text");
          carga_texto.textContent = materia.carga_horaria;
          carga.appendChild(carga_texto);
          disciplina.appendChild(carga);

          let botoes_acoes = document.createElement("div");
          botoes_acoes.classList.add("acoes");

          const botao_cursada = document.createElement("button");
          botao_cursada.classList.add("botao_cursada");
          const botao_cursar = document.createElement("button");
          botao_cursar.classList.add("botao_cursar");
          botoes_acoes.appendChild(botao_cursada);
          botoes_acoes.appendChild(botao_cursar);

          materiaElement.appendChild(disciplina);
          materiaElement.appendChild(botoes_acoes);
          box_materias.appendChild(materiaElement);
        });
        periodoElement.appendChild(box_materias);
        const container = document.querySelector(".container");
        container.appendChild(periodoElement);
      });
    });
}

carregar();

class Disciplina {
  constructor(nome, carga_horaria) {
    this.nome = nome;
    this.carga_horaria = carga_horaria;
    this.cursada = false;
    this.possivel = false;
  }

  cursar() {
    this.cursada = true;
    this.possivel = false;
  }

  pretende_cursar() {
    this.possivel = true;
    this.cursada = false;
  }
}

function cursar_disciplina(disciplina) {
  disciplina.cursar();
}

function pretende_cursar_disciplina(disciplina) {
  disciplina.pretende_cursar();
}

fetch("http://127.0.0.1:5500/materias.json")
  .then((response) => response.json())
  .then((content) => {
    content.periodos.map((periodo) => {
      periodo.materias.map((materia) => {
        let disciplina = new Disciplina(
          materia.nome_disciplina,
          materia.carga_horaria
        );
        console.log(disciplina);
      });
    });
  });

function cursar_disciplina(disciplina) {
  disciplina.cursar();
}

function pretende_cursar_disciplina(disciplina) {
  disciplina.pretende_cursar();
}

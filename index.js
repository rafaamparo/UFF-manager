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
          carga_texto.textContent = parseInt(materia.carga_horaria);
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
  constructor(nome, carga_horaria, index) {
    this.nome = nome;
    this.carga_horaria = carga_horaria;
    this.cursada = false;
    this.possivel = false;
    this.index = index;
  }

  cursar() {
    this.cursada = true;
    this.possivel = false;
  }

  pretende_cursar() {
    this.possivel = true;
    this.cursada = false;
  }

  get_carga_horaria() {
    return this.carga_horaria;
  }

  get_situacao() {
    return this.cursada;
  }

  set_situacao(indicador) {
    if (indicador === 1) this.cursar();
    else if (indicador === 2) this.pretende_cursar();
  }
}

class Periodo {
  constructor(nome, index, array_disciplinas) {
    this.nome = nome;
    this.index = index;
    this.integral = false;
    this.disciplinas = array_disciplinas;
    this.total_horas = 0;
    this.horas_cursadas = 0;
    this.disciplinas.map((disciplina) => {
      this.total_horas += disciplina.get_carga_horaria();
    });
  }

  adicionar_disciplina(disciplina) {
    this.disciplinas.push(disciplina);
  }

  get_horas_cursadas() {
    this.disciplinas.map((disciplina) => {
      if (disciplina.get_situacao()) {
        this.horas_cursadas += disciplina.get_carga_horaria();
      }
    });
  }

  get_integralizacao() {
    if (this.horas_cursadas === this.total_horas) {
      this.integral = true;
    }
  }
}

function cursar_disciplina(disciplina) {
  disciplina.set_situacao(1);
}

function pretende_cursar_disciplina(disciplina) {
  disciplina.set_situacao(2);
}
let array_periodos = [];

fetch("http://127.0.0.1:5500/materias.json")
  .then((response) => response.json())
  .then((content) => {
    let index_disciplinas = 1;
    let index_periodos = 1;
    content.periodos.map((periodo) => {
      let array_disciplinas = [];
      periodo.materias.map((materia) => {
        let disciplina = new Disciplina(
          materia.nome_disciplina,
          parseInt(materia.carga_horaria),
          index_disciplinas
        );
        array_disciplinas.push(disciplina);
        index_disciplinas++;
      });
      let semestre = new Periodo(
        periodo.titulo_periodo,
        index_periodos,
        array_disciplinas
      );
      console.log(semestre);
      index_periodos++;
      array_periodos.push(semestre);
    });
    console.log(array_periodos);
  });

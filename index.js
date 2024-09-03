function carregar(periodos) {
  periodos.map((periodo) => {
    const periodoElement = document.createElement("div");
    periodoElement.classList.add("periodo");
    let periodoElementId = `${periodo.index}-periodoElement`;
    periodoElement.setAttribute("id", periodoElementId);

    const titulo = document.createElement("div");
    titulo.classList.add("titulo_periodo");
    titulo.textContent = periodo.nome;
    periodoElement.appendChild(titulo);

    const box_materias = document.createElement("div");
    box_materias.classList.add("materias");
    periodoElement.appendChild(box_materias);

    periodo.disciplinas.map((materia) => {
      const materiaElement = document.createElement("div");
      materiaElement.classList.add("disciplina_box");
      let materialElementId = `${materia.index}-materiaElement`;
      materiaElement.setAttribute("id", materialElementId);

      let disciplina = document.createElement("div");
      disciplina.classList.add("disciplina");

      let nome = document.createElement("div");
      nome.classList.add("nome_disciplina");
      nome.textContent = materia.nome;
      disciplina.appendChild(nome);

      let carga = document.createElement("div");
      carga.classList.add("carga_horaria_box");
      let carga_texto = document.createElement("div");
      carga.classList.add("carga_text");
      carga_texto.textContent = materia.carga_horaria + "h";
      carga.appendChild(carga_texto);
      disciplina.appendChild(carga);

      let botoes_acoes = document.createElement("div");
      botoes_acoes.classList.add("acoes");

      const botao_cursada = document.createElement("button");
      botao_cursada.classList.add("botao_cursada");
      botao_cursada.addEventListener("click", () => {
        cursar_disciplina(materia);
        periodo.incrementar_horas(materia);
        check_integralizacao(periodo);
      });
      const botao_cursar = document.createElement("button");
      botao_cursar.classList.add("botao_cursar");
      botao_cursar.addEventListener("click", () => {
        pretende_cursar_disciplina(materia);
      });
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
}

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
      if (disciplina.get_situacao()) {
        this.horas_cursadas += disciplina.get_carga_horaria();
      }
    });
  }

  adicionar_disciplina(disciplina) {
    this.disciplinas.push(disciplina);
  }

  get_integralizacao() {
    if (this.horas_cursadas === this.total_horas) {
      this.integral = true;
    }
    return this.integral;
  }

  get_horas_cursadas() {
    return this.horas_cursadas;
  }

  incrementar_horas(disciplina) {
    this.horas_cursadas += disciplina.get_carga_horaria();
    return this.horas_cursadas;
  }
}

function cursar_disciplina(disciplina) {
  disciplina.set_situacao(1);
  const materia_div = document.getElementById(
    `${disciplina.index}-materiaElement`
  );
  materia_div.style.backgroundColor = "green";
}

function pretende_cursar_disciplina(disciplina) {
  disciplina.set_situacao(2);
  const materia_div = document.getElementById(
    `${disciplina.index}-materiaElement`
  );
  materia_div.style.backgroundColor = "yellow";
}

function check_integralizacao(periodo) {
  if (periodo.get_integralizacao()) {
    const periodo_div = document.getElementById(
      `${periodo.index}-periodoElement`
    );
    periodo_div.style.backgroundColor = "purple";
  }
}

let array_periodos = [];
async function carregarJson() {
  await fetch("http://127.0.0.1:5500/materias.json")
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
        index_periodos++;
        array_periodos.push(semestre);
      });
    });
  carregar(array_periodos);
}
carregarJson();

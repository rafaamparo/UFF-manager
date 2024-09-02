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
          const materiaElement = document.createElement("button");
          materiaElement.classList.add("disciplina_button");

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

          materiaElement.appendChild(disciplina);
          box_materias.appendChild(materiaElement);
        });
        periodoElement.appendChild(box_materias);
        const container = document.querySelector(".container");
        container.appendChild(periodoElement);
      });
    });
}
carregar();

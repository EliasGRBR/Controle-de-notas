window.onload = function() {
    setTimeout(() => {
        document.querySelector(".loading").style.display = "none";
        document.querySelector("main").style.display = "block";
        document.querySelector("footer").style.display = "block";
    }, 800);
     var alunos = new Array;
     var btnAdd = document.querySelector("#btnAddAluno");
     var btnEditAluno = document.querySelector("#btnEditAluno");
     inputSearch = document.querySelector("#search");
     modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
     var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
            inputSearch.value = null;
            constructorTable();
            });
        });
    var config = { attributes: true, childList: true, characterData: true };

        alunos = [
            {id:1,Nome:"Elias Graciano Rebequi", RGM: 1234, Turma: "3C", PortuguesNota: 10, MatematicaNota: 10}, 
            {id:2, Nome:"Marcelo da Silva Santos", RGM: 4321, Turma:"2A", PortuguesNota: 5, MatematicaNota:5}
        ];  
    function newAluno(nome,rgm,turma,nota1,nota2){
        let aluno = new Object;
        let id = null;
        if (!alunos.length) {
            id = 1
        }
        else{
            let lastElement = alunos[alunos.length - 1];
            id = lastElement.id + 1;
        }
        aluno["id"] = id;
        aluno["Nome"] = nome;
        aluno["RGM"] = Number(rgm);
        aluno["Turma"] = turma;
        aluno["PortuguesNota"] = Number(nota1);
        aluno["MatematicaNota"] = Number(nota2);
        alunos.push(aluno);
        constructorTable();
    }
     function constructorTable(search){ 
        var table = document.querySelector("#table-alunos tbody"); 
        if(!search){
            var alunosConstruct = alunos;
        }
        else{
            var alunosConstruct = search;    
        }
        if(!alunos.length || !alunosConstruct.length){
            table.innerHTML = `<tr>
            <th style="text-align:center" colspan="8"><h1>Nenhum Registro Encontrado<h1></th>
            </tr>`
        } else{
            table.innerHTML = null;
            for (let index = 0; index < alunosConstruct.length; index++) {
                table.innerHTML += `<tr>
                <th scope="row">${alunosConstruct[index].Nome}</th>
                <td>${alunosConstruct[index].RGM}</td>
                <td>${alunosConstruct[index].Turma}</td>
                <td>${alunosConstruct[index].PortuguesNota}</td>
                <td>${alunosConstruct[index].MatematicaNota}</td>
                <td class="nota ${(alunosConstruct[index].MatematicaNota + alunosConstruct[index].PortuguesNota) / 2 >= 6 ? 'nota-alta':'nota-baixa'}">
                ${(alunosConstruct[index].MatematicaNota + alunosConstruct[index].PortuguesNota) / 2}</td>
                <td><button class="btn btn-warning editarAluno" value="${alunosConstruct[index].id}">Editar</button></td>
                <td><button class="btn btn-danger deletarAluno" value="${alunosConstruct[index].id}">Deletar</button></td>
                </tr>`;
            }
        }
        btnDel = document.querySelectorAll(".deletarAluno");
        btnEdit = document.querySelectorAll(".editarAluno");

        btnDel.forEach(element => {
            observer.observe(element, config);
            element.addEventListener("click",function(){
               deletarAluno(Number(this.value));
           });
       });
       
       btnEdit.forEach(element => {
        observer.observe(element, config);
        element.addEventListener("click",function(){
            editarAluno(Number(this.value));
            });
        });
        }
         function deletarAluno(index){
            alunos = alunos.filter(item => item["id"] !== Number(index));
            inputSearch.value = null;
            constructorTable();
        }
        function editarAluno(index){
              i = alunos.findIndex(item => item.id === index);
              var aluno = alunos[i];
              document.getElementById("formEdit").reset();

                var spanNomeAluno = document.querySelector("#nomeAluno");
                var inputIdAluno = document.querySelector("#ID");
                var inputNomeAluno = document.querySelector("#Nome");
                var inputRgmAluno = document.querySelector("#RGM");
                var inputTurmaAluno = document.querySelector("#Turma");
                var inputNotaPortugues = document.querySelector("#notaDePortugues");
                var inputNotaMatematica = document.querySelector("#notaDeMatematica");


                spanNomeAluno.innerHTML = aluno.Nome + ":";
                inputIdAluno.value = aluno.id;
                inputNomeAluno.value = aluno.Nome;
                inputRgmAluno.value = aluno.RGM;
                inputTurmaAluno.value = aluno.Turma;
                inputNotaPortugues.value = aluno.PortuguesNota;
                inputNotaMatematica.value = aluno.MatematicaNota;
        
            modalEdit.show();

            btnEditAluno.addEventListener("click",function(){
                if(!inputNomeAluno.value || !inputRgmAluno.value || !inputTurmaAluno.value || !inputNotaPortugues.value || !inputNotaMatematica.value){
                    alert("Preencha todos os Campos!!!");
                }else if(inputNotaPortugues.value < 0 || inputNotaPortugues.value > 10 || inputNotaMatematica.value < 0 || inputNotaMatematica.value > 10 ){
                    alert("Nota invalida coloque valores entre 0 e 10");
                    return null;
                }else{
                alunos[i]["Nome"] = inputNomeAluno.value;
                alunos[i]["RGM"] = Number(inputRgmAluno.value);
                alunos[i]["Turma"] = inputTurmaAluno.value;
                alunos[i]["PortuguesNota"] = Number(inputNotaPortugues.value);
                alunos[i]["MatematicaNota"] = Number(inputNotaMatematica.value);
                inputSearch.value = null;
    
                constructorTable();
                
                modalEdit.hide();
                }
            })
        }
        btnAdd.addEventListener("click", function(){
            var inputNomeAluno = document.querySelector("#newNome").value;
            var inputRgmAluno = document.querySelector("#newRGM").value;
            var inputTurmaAluno = document.querySelector("#newTurma").value;
            var inputNotaPortugues = document.querySelector("#newnotaDePortugues").value;
            var inputNotaMatematica = document.querySelector("#newnotaDeMatematica").value;
            if(!inputNomeAluno || !inputRgmAluno || !inputTurmaAluno  || !inputNotaPortugues  || !inputNotaMatematica ){
                alert("Preencha todos os Campos!!!");
            }else if(inputNotaPortugues < 0 || inputNotaPortugues > 10 || inputNotaMatematica < 0 || inputNotaMatematica > 10 ){
                alert("Nota invalida coloque valores entre 0 e 10!!!");
            }else{
            newAluno(inputNomeAluno,inputRgmAluno,inputTurmaAluno,inputNotaPortugues,inputNotaMatematica);
            document.querySelector("#formAdd").reset();
            }
        });
        search.addEventListener("keyup",function(){
            try{
                var re = new RegExp(this.value, "gi");
                let alunosFilter = alunos.filter(aluno => aluno["Nome"].match(re) || aluno["RGM"].toString().match(re));
                constructorTable(alunosFilter);
            }
            catch(e){
                return null;
            }
        });
    // construindo a table inicial
    constructorTable();
}










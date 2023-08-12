const listaUsuarios = document.querySelector("#lista-usuarios");

const apiDeUsuarios = async () =>{

    try {
        const usuarios = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await usuarios.json();

        data.forEach(usuario => {
            const li1 = document.createElement("li");
            li1.innerText = `${usuario.name} - (${usuario.email})`;
            listaUsuarios.append(li1);
        });
    } catch {
        const li2 = document.createElement("li")
        li2.innerText = "--> No se pudo recuperar listado de usuarios <--";
        listaUsuarios.append(li2)
    } finally {
        console.log("Proceso terminado.")
    }
    
}

apiDeUsuarios()
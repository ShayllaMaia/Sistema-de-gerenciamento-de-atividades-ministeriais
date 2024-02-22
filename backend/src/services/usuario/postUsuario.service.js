import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const postUsuarioService = async (data) => {
    let{nome, email, senha, telefone, endereco, dataNascimento,tipoUsuario} = data;
    //verificando se o usuário já existe
    const usuarioJaExiste = await prisma.usuario.findUnique({
		where: {
			email: email,
		},
	});
    

    if(usuarioJaExiste){
        //lança um erro, tem dois parâmetros, o primeiro é a mensagem de erro e o segundo é o status code
        throw new AppError("Usuário já existe",400);
    }
    if(senha){
        //criptografando a senha
        senha = await bcrypt.hash(senha, 8);
    }
    

    //convertendo a data para o formato do banco de dados
    dataNascimento = new Date(dataNascimento).toISOString();
    
    //criando o usuário
    const novoUsuario = await prisma.usuario.create({
        data:{
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            endereco: endereco,
            dataNascimento: dataNascimento,
            tipoUsuario: tipoUsuario
        }
    });
    return novoUsuario;
}
export { postUsuarioService };
import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";
import { sendEmail } from "../../../middlewares/enviaEmail.middlewares.js";
const prisma = new PrismaClient();

const postMinisterioLiderService = async (data,token) => {
    const { ministerio_id, lider_id } = data;
    
    token = await retornaInfoToken(token);

    const tipoUsuario = await retornaTipoUsuario(token);

    if(!tipoUsuario) throw new AppError("Usuário não encontrado",404);
    
    if( tipoUsuario.tipoUsuario != "ADMIN") throw new AppError("Acesso não autorizado: Somente admin pode aderir um lider a um ministério",401)
    
    const ministerio = await prisma.ministerio.findUnique({
      where: {
        id: ministerio_id,
      },
    });
  
    if (!ministerio) {
      throw new AppError("Ministério não encontrado!", 404);
    }

    if(lider_id.length < 1){
      throw new AppError("Um ou mais líderes não foram encontrados!", 404);
    }

    let lideresConectados = await prisma.ministerioLider.findMany({
      where: {
        lider_id: {
          in: lider_id
        }
      },
      select: {
        lider_id: true
      }
    });
    
    if(lideresConectados.length === 0){
      const lideres = await prisma.usuario.findMany({
        where: {
          id: {
            in: lider_id,
          },
        },
      });
      lideres.forEach(lider => {
        emailDeLiderancaAderida(lider.email, lider.nome, ministerio);
      });
      await prisma.ministerioLider.createMany({
        data: lideres.map((lider) => ({  // Mapeie para extrair apenas o ID do líder
          ministerio_id: ministerio_id,
          lider_id: lider.id,
        })),
      });

      await prisma.usuario.updateMany({
        where:{
          id: {
            in: lider_id
          }
        },
        data:{
          tipoUsuario:"LIDER",
        }
      })
      return {ministerio, lideres}
    } else {

      let lideresConectadosIds = lideresConectados.map(entry => entry.lider_id);
      
      if(lideresConectadosIds.length === lider_id.length){
        throw new AppError("Já são lideres de um ministerio",405);
      } else{
        let lideresNaoConectadosID = lider_id.filter(liderId => !lideresConectadosIds.includes(liderId));
        
        let lideresNaoConectadosObjeto = await prisma.usuario.findMany({
            where:{
              id:{
                in:lideresNaoConectadosID
              }
            }
        });
        
        await prisma.ministerioLider.createMany({
          data: lideresNaoConectadosObjeto.map((liderId) => ({
            ministerio_id:ministerio_id,
            lider_id:liderId.id,
          }))
        })
        console.log(lideresNaoConectadosObjeto)
        await prisma.usuario.updateMany({
          where:{
            id: {
              in: lideresNaoConectadosID
            }
          }
        })
        const lideres = await prisma.usuario.findMany({
          where:{
            id:{
              in:lideresNaoConectadosID
            }
          }
      });
        
        return {ministerio, lideres};
      }
      
    }
      
  };
  
  export { postMinisterioLiderService };
  function emailDeLiderancaAderida(email, nome, ministerio) {
    const to = email;
    const subject = "Liderança Atribuida";
    const html = `
    <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liderança Atribuida</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 0;
        }

        .container {
            color: #fff;
            background-color: #000;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #ff7f00;
            display: flex;
            justify-content: center;
        }
        p {
            margin-bottom: 30px;
        }
        .ministerio-info {
            background-color: #ff7f00;
            color: #000;
            padding: 10px;
            border-radius: 5px;
            margin-top: 20px;
        }

        .citação {
            max-width: 200px;
            height: 60px;
            padding: 10px;
            background-color: #fff;
            color: #000;
            border-left: 5px solid #ff7f00;
            font-style: italic;
            font-size: 10px;
            display: flex;
            justify-content: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Liderança Atribuída</h1>
        <p>Olá, ${nome}!</p>
        <p>Você foi adicionado como líder ao ministério "${ministerio.nome}". Parabéns!</p>
        <p>Que sua liderança seja de excelência e contribua para o sucesso do ministério.</p>
        <div class="ministerio-info">
            <strong>Detalhes do Ministério:</strong>
            <ul>
                <li><strong>Nome:</strong> ${ministerio.nome}</li>
                <li><strong>Descrição:</strong> ${ministerio.descricao}</li>
            </ul>
        </div>
        <p>Se precisar de qualquer assistência ou tiver dúvidas, não hesite em nos contatar.</p>
        <p>Atenciosamente,<br>Equipe do SIGAM</p>
        <p style="font-size:10px;">Este é um e-mail automático, por favor, não responda.</p>
        <div class="citação" style="float: right;"> 
            <p> 1 Pedro 5:2-3 - "Pastoreiem o rebanho de Deus que está aos seus cuidados. Olhem por ele, não por obrigação, mas de livre vontade, como Deus quer. "</p>
        </div>
        <div style="clear: both;"></div>

    </div>

</body>

</html>

 `
 return sendEmail(to, subject, html);
     
  };

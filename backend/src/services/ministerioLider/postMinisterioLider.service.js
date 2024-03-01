import { PrismaClient } from "@prisma/client";
import { AppError } from "../../errors/appError.js";
import { retornaInfoToken } from "../../../middlewares/retornaInfoToen.middliwares.js";
import { retornaTipoUsuario } from "../../../middlewares/retornaTipoUsuario.middliweres.js";
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
        await prisma.usuario.updateMany({
          where:{
            id: {
              in: lideresNaoConectadosID
            }
          },
          data:{
            tipoUsuario:"LIDER",
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
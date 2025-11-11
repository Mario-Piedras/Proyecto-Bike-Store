import { pool } from '../config/connection.js'

export class CrudController {
    // Obtiene todos los registros de una tabla
    async obtenerTodos(tabla){
        const [resultados] = await pool.query(`SELECT * FROM ??`, [tabla]);
        return resultados;
    }

    // Obtiene un registro por su ID
    async obtenerUno(tabla, idCampo,id){
        try{
            const [resultado] = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
            return resultado[0];
        } catch (error){
            throw error;
        }
    }

    //Crear un nuevo registro
    async crear(tabla, idCampo, data){
        try{
            const [resultado] = await pool.query(`INSERT INTO ?? SET ?`, [tabla, data]);
            return await this.obtenerUno(tabla, idCampo, resultado.insertId);
        } catch (error){
            throw error;
        }
    }
    
    //Actualizar un registro por ID
    async actualizar(tabla, idCampo, id, data){
        try{
            if (!data || Object.keys(data).length === 0) {
                throw new Error("No hay datos para actualizar");
            }

            const [resultado] = await pool.query(`UPDATE ?? SET ? WHERE ?? = ?`, [tabla, data, idCampo, id]);
            
            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }

            return await this.obtenerUno(tabla, idCampo, id);
        } catch (error) {
            throw error;
        }
    }

    //Eliminar un registro por ID
    async eliminar(tabla, idCampo, id){
        try {
            const [ resultado] = await pool.query(`DELETE FROM ?? WHERE ?? = ?`, [tabla, idCampo, id]);
            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }
            return { message: 'Registro eliminado exitosamente' };
        } catch (error){
            throw error;
        }
    }
}

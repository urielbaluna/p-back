const database = require('../database/connect.js');
const genereteCode = require('../utils/genereteCode.js');
const { request, response } = require('express');
const { parseInsertArray, newParseUpdateArray } = require('../utils/sqlParse.js');

async function insertNewProduct(req = request, res = response) {
    try {
        if (req.body.nombre === undefined) {
            return res.status(400).json({
                message: "Nombre no ingresado",
                error,
            });
        }
        const insert = parseInsertArray("productos", {id_producto: genereteCode(), nombre: req.body.nombre, descripcion: req.body.descripcion, precio: req.body.precio, categoria: req.body.categoria, cantidad: req.body.cantidad});
        await database.batch(insert, "write");
        return res.status(200).json({
            message: "Producto insertado exitosamente",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error",
            error,
        });
    }
}
async function insertNewEntrada(req = request, res = response) {
    try {
        if (req.body.producto === undefined) {
            return  res.status(400).json({
                message: "Nombre del producto no ingresado",
                error,
            });
        }
        const getIdProduct = await database.execute({
            sql: `SELECT id_producto FROM productos WHERE nombre = ?`,
            args: [req.body.producto],
        });
        const idProduct = getIdProduct.rows;
        if (idProduct.length === 0) {
            return res.status(400).json({
                message: "Producto no encontrado",
            });
        }
        const onlyId = idProduct[0].id_producto;
        const insert = parseInsertArray("entradas", {id_entrada: genereteCode(), fecha: req.body.fecha, id_producto: onlyId, cantidad: req.body.cantidad, proveedor: req.body.proveedor});
        await database.batch(insert, "write");
        return res.status(200).json({
            message: "Entrada insertada exitosamente",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function insertNewVenta(req = request, res = response) {
    try {
        if (req.body.producto === undefined) {
            return  res.status(400).json({
                message: "Nombre del producto no ingresado",
                error,
            });
        }
        const getIdProduct = await database.execute({
            sql: `SELECT id_producto FROM productos WHERE nombre = ?`,
            args: [req.body.producto],
        });
        const idProduct = getIdProduct.rows;
        if (idProduct.length === 0) {
            return res.status(400).json({
                message: "Producto no encontrado",
            });
        }
        const onlyId = idProduct[0].id_producto;
        const insert = parseInsertArray("ventas", {id_ventas: genereteCode(), fecha: req.body.fecha, id_producto: onlyId, cantidad: req.body.cantidad, precio_venta: req.body.precio_venta, cliente: req.body.cliente});
        await database.batch(insert, "write");
        return res.status(200).json({
            message: "Venta insertada exitosamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
        
    }
}
async function getProduct(req = request, res = response) {
    try {
        const verifyTable = await database.execute(
            `SELECT * FROM productos`
        );
        const table = verifyTable.rows;
        if (table.length === 0){
            return res.status(200).json({
                message: "No hay datos", table,
            });
        }
        return res.status(200).json({
            message: "Datos obtenidos",
            table,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        });
    }
}
async function getEntradas(req = request, res = response) {
    try {
        const verifyTable = await database.execute(
            `SELECT * FROM entradas`
        );
        const table = verifyTable.rows;
        if (table.length === 0){
            return res.status(200).json({
                message: "No hay datos", table,
            });
        }
        return res.status(200).json({
            message: "Datos obtenidos",
            table,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        });
    }
}
async function getVentas(req = request, res = response) {
    try {
        const verifyTable = await database.execute(
            `SELECT * FROM ventas`
        );
        const table = verifyTable.rows;
        if (table.length === 0){
            return res.status(200).json({
                message: "No hay datos", table,
            });
        }
        return res.status(200).json({
            message: "Datos obtenidos",
            table,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        });
    }
}
async function getZeroStock(req = request, res = response) {
    try {
        const verifyTable = await database.execute(
            `SELECT nombre FROM productos WHERE cantidad = 0`
        );
        const table = verifyTable.rows;
        if (table.length === 0){
            return res.status(200).json({
                message: "Todos los productos tienen stock :)"
            });
        }
        const letr = table.length;
        
        return res.status(200).json({
            message: "Los productos sin stock son: " +letr,
            table,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Error",
            error,
        });
    }
}
async function entradasTime(req = request, res = response) {
    try {
        const fecha = req.body.fecha;
        const verifyTable = await database.execute({
            sql: `SELECT * FROM entradas WHERE fecha = ?`,
            args: [ fecha ],
        })
        const table = verifyTable.rows;
        if (table.length === 0) {
            return res.status(200).json({
                message: "No existen registros en esa fecha",
                table,
            })
            
        }
        return res.status(200).json({
            message: "Las entradas de esa fecha son:",
            table,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function ventasTime(req = request, res = response) {
    try {
        const fecha = req.body.fecha;
        const verifyTable = await database.execute({
            sql: `SELECT * FROM ventas WHERE fecha = ?`,
            args: [fecha],
        })
        const table = verifyTable.rows;
        if (table.length === 0) {
            return res.status(200).json({
                message: "No existen registros en esa fecha",
                table,
            })
            
        }
        return res.status(200).json({
            message: "Las ventas de esa fecha son:",
            table,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function viewProduct(req = request, res = response) {
    try {
        const nombre = req.body.nombre;
        const verifyTable = await database.execute({
            sql: `SELECT * FROM productos WHERE nombre = ?`,
            args: [nombre],
        })
        const table = verifyTable.rows;
        if(table.length === 0){
            return res.status(200).json({
                message: "No existen registros con ese nombre",
                table,
            })
        }
        return res.status(200).json({
            message: "Los datos de ese producto son: ",
            table,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function viewNameProduct(req = request, res = response) {
    try {
        const id = req.body.id;
        const verifyTable = await database.execute({
            sql: `SELECT * FROM productos WHERE id_producto = ?`,
            args: [id],
        })
        const table = verifyTable.rows;
        if(table.length === 0){
            return res.status(200).json({
                message: "No existen productos con ese id",
                table,
            })
        }
        return res.status(200).json({
            message: "El nombre de ese id es: ",
            table,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function updateNameProduct(req = request, res = response) {
    const { id } = req.params;
    try {
        const verifyTable = await database.execute({
            sql: `SELECT * FROM productos WHERE id_producto = ?`,
            args: [id],
        })
        const table = verifyTable.rows;
        if(table.length === 0){
            return res.status(200).json({
                message: "No existen productos con ese id",
                table,
            })
        }
        const update = newParseUpdateArray("productos", req.body, {value: id, index: "id_producto"});//El value id es la varible de acuerdo a que se actualizara, y lo que esta en index es la columna de la tabla en la cual nos basaremos para hacer el cambio
        await database.batch(update, "write");
        return res.status(200).json({
            message: "Nombre actualizado",
            update
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function deleteProduct(req = request, res = response) {
    const { id } = req.params;
    try {
        const verifyTable = await database.execute({
            sql: `SELECT * FROM productos WHERE id_producto = ?`,
            args: [id],
        })
        const table = verifyTable.rows;
        if(table.length === 0){
            return res.status(400).json({
                message: "No existen productos con ese id",
                table,
            })
        }
        await database.batch([{
            sql: `DELETE FROM productos WHERE id_producto = ?`,
            args: [ id ],
        }], "write");
        return res.status(200).json({
            message: "Producto borrado",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function deleteVentasTime(req = request, res = response) {
    try {
        const fecha = req.body.fecha;
        const verifyTable = await database.execute({
            sql: `SELECT * FROM ventas WHERE fecha = ?`,
            args: [fecha],
        })
        const table = verifyTable.rows;
        if (table.length === 0) {
            return res.status(200).json({
                message: "No existen registros en esa fecha",
                table,
            })
            
        }
        await database.batch([{
            sql: `DELETE FROM ventas WHERE fecha = ?`,
            args: [ fecha ],
        }], "write");
        return res.status(200).json({
            message: "Producto borrado",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
async function deleteDataEntradas(req = request, res = response) {
    try {
        const verifyTable = await database.execute(
            `SELECT * FROM entradas`
        )
        const table = verifyTable.rows;
        if (table.length === 0) {
            console.log("MENSAJE");
            return res.status(200).json({
                message: "La tabla ya esta vacia",
                table,
            })
        }
        await database.batch([
            `DELETE FROM entradas`
        ], "write");
        return res.status(200).json({
            message: "Datos borrados",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error",
            error,
        })
    }
}
module.exports = {
    insertNewProduct,
    insertNewEntrada,
    insertNewVenta,
    getProduct,
    getEntradas,
    getVentas,
    getZeroStock,
    entradasTime,
    ventasTime,
    viewProduct,
    viewNameProduct,
    updateNameProduct,
    deleteProduct,
    deleteVentasTime,
    deleteDataEntradas,
};
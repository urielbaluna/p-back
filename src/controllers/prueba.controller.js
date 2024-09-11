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
module.exports = {
    insertNewProduct,
    insertNewEntrada,
    insertNewVenta,
    getProduct,
    getEntradas,
    getVentas,
    getZeroStock,
};
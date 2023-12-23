import pool from "../db/configDB.js";


// export const getProperties = async (req, res) => {
//     try {
//         console.log('get properties')
//         const result = await pool.query('SELECT * FROM properties');
//         console.log(result.rows)
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error en el servidor' });
//     }
// };



// export const getPropertyById = async (req, res) => {
//     try {
//         const {id}=req.params
//         const result = await pool.query('SELECT * FROM properties WHERE property_id = $1 ',[id]);
//         console.log(result.rows)
//         if (result.rows.length > 0) {
//             res.json(result.rows[0]); 
//         } else {
//             res.status(404).json({ message: 'No se encontró ningún elemento con ese ID' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error en el servidor' });
//     }
//   };


export const getPropertyById = async (req, res) => {
    try {
        const {id}=req.params
        const result = await pool.query(
            `SELECT 
                p.property_id,
                p.title,
                p.description,
                ARRAY_AGG(pp.img) as img,
                p.price
            FROM properties p
            JOIN photos_properties pp ON p.property_id = pp.property_id
            WHERE p.property_id = $1
            GROUP BY p.property_id, p.title, p.description, p.price;`,
            [id]
        );

        if (result.rows.length > 0) {
            console.log(result.rows[0])
            res.json(result.rows[0]); 
        } else {
            res.status(404).json({ message: 'No se encontró ningún elemento con ese ID' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


export const getProperties = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
            p.property_id,
            p.title,
            p.description,
            p.price,
            (ARRAY_AGG(pp.img))[1] as img
        FROM properties p
        LEFT JOIN photos_properties pp ON p.property_id = pp.property_id
        GROUP BY p.property_id, p.title, p.description, p.price;`
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

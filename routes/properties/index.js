import { Router } from "express";
import pool from "../../db/configDB.js";
import { getProperties, getPropertyById } from "../../controller/PropertiesContoller.js";
import { photos } from "../../db/photos.js";
const router = Router()

router.get('/', getProperties)
router.get('/:id', getPropertyById)


export default router









// const insertProperties = async () => {
//     try {
//       for (const property of properties) {
//         const { title, description, price, img } = property;
//         await pool.query(
//           'INSERT INTO properties (title, description, price, img) VALUES ($1, $2, $3, $4)',
//           [title, description, price, img]
//         );
//       }
//       console.log('Datos insertados correctamente');
//     } catch (error) {
//       console.error('Error al insertar datos:', error);
//     } finally {
//       pool.end();
//     }
//   };
  
//   insertProperties();


// const insertPhotos = async () => {
//     try {
//         for (const photo of photos) {
//         const { img, property_id} = photo;
//         await pool.query(
//             'INSERT INTO photos_properties (img, property_id) VALUES ($1, $2)',
//           [img, property_id]
//         );
//       }
//       console.log('Datos insertados correctamente');
//     } catch (error) {
//       console.error('Error al insertar datos:', error);
//     } finally {
//       pool.end();
//     }
//   };

// insertPhotos();




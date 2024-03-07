import connectDb from "../db.js";
import noteModel from "../models/noteModel.js";
import slugify from "slugify";

connectDb();

exports.handler = async (event, context) => {
   try {
      const { title, desc } = JSON.parse(event.body);
      const note = await new noteModel({ title, desc, slug: slugify(title, desc) }).save();
      return {
         statusCode: 201,
         body: JSON.stringify({
            success: true,
            message: 'New Note Registered',
            note,
         }),
      };
   } catch (error) {
      console.error(error);
      return {
         statusCode: 500,
         body: JSON.stringify({
            success: false,
            message: 'Error in Category',
            error,
         }),
      };
   }
};
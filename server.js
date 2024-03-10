import connectDb from "./db.js";
import dotenv from 'dotenv';
import express from 'express';
import noteModel from "./models/noteModel.js";
import slugify from "slugify";

const app = express();
dotenv.config({path:'.env'});
app.use(express.json());

connectDb();
app.get('/', (req, res) => {
   res.send('<h1>Welcome to Todo API<h1>');
});

app.get('/get_todo', async (req, res) => {
   try {
      const items = await noteModel.find({})
      return res.status(200).send({
         success: true,
         message: 'All Notes',
         items,
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error while fetching notes',
         error
      })
   }
});

app.post('/post_todo', async (req, res) => {
   try {
      const { title, description } = req.body;
      const items = await new noteModel({ title, description, slug: slugify(title, description) }).save();
      res.status(201).send({
         success: true,
         message: 'New Note Registered',
         items
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: 'Error in Category',
         error
      })
   }
})

app.delete('/delete_todo/:id', async (req, res) => {
   try {
      const { id } = req.params;
      await noteModel.findByIdAndDelete(id)
      res.status(200).send({
         success: true,
         message: 'Deleted Successfully'
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: 'Error In Delete note',
         error
      })
   }
})

app.put('/update_todo/:id', async (req, res) => {
   try {
      const { title,description } = req.body
      const { id } = req.params
      const items = await noteModel.findByIdAndUpdate(id, { title,description }, { new: true })
      res.status(200).send({
         success: true,
         message: 'note updated successfully!',
         items
      })
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error in update',
         error
      })
   }
})

const PORT = 4000;
app.listen(PORT, () => {
   console.log(`Server running on ${PORT} in mode`);
})

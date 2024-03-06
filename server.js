import connectDb from "./db.js";
import dotenv from 'dotenv';
import express from 'express';
import noteModel from "./models/noteModel.js";
import slugify from "slugify";

const app = express();
dotenv.config();
connectDb();
app.use(express.json());

app.get('/', (req, res) => {
   res.send('<h1>Welcome to Todo API<h1/>');
});

app.get('/get_todo', async (req, res) => {
   try {
      const notes = await noteModel.find({})
      return res.status(200).send({
         success: true,
         message: 'All Notes',
         notes,
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
      const { title, desc } = req.body;
      const note = await new noteModel({ title, desc, slug: slugify(title, desc) }).save();
      res.status(201).send({
         success: true,
         message: 'New Note Registered',
         note
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
      const { title,desc } = req.body
      const { id } = req.params
      const note = await noteModel.findByIdAndUpdate(id, { title,desc, slug: slugify(title,desc) }, { new: true })
      res.status(200).send({
         success: true,
         message: 'note updated successfully!',
         note
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
// routes.js
import multer from 'multer';
import { createStory, deleteStory, getAllStory, getStoryById, updateStory } from "../controller/story";
import { verifyToken } from '../middleware/verifyToken';
import { upload } from '../middleware/multer';
const express = require("express");

const router = express.Router();

router.get('/', getAllStory);
router.get('/:id', getStoryById);
router.post('/', upload.single('story_cover'), verifyToken, createStory); 
router.patch('/:id', upload.single('story_cover'), verifyToken,  updateStory);
router.delete('/:id', deleteStory);

module.exports = router;

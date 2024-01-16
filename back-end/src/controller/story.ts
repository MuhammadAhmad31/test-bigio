import { Request, Response } from "express";
import {
  createStoryModel,
  getAllStoryModel,
  getStoryByIdModel,
  deleteStoryModel,
  updateStoryModel,
} from "../models/story";

interface Story {
  id: number;
  create_time: Date | null;
  title: string;
  author: string;
  synopsis: string;
  category: string;
  status: string;
  story_cover: string;
  tags: string;
}


export const getAllStory = async (req: Request, res: Response) => {
  try {
    const author = req.query.author as string | undefined;
    const title = req.query.title as string | undefined;
    const status = req.query.status as string | undefined;
    const category = req.query.category as string | undefined;

    const [data] = await getAllStoryModel(author, title, status, category);

    let newData: Story[] = [];
    data.map((item: Story) => {
      newData.push({
        ...item,
        story_cover: item.story_cover && 'http://localhost:4000/assets/' + (item.story_cover || '')
      });
      console.log(item.story_cover);
    });

    res.status(200).json({
      message: "GET story success",
      data: newData,
    });
  } catch (err) {
    res.status(500).json({
      message: "GET story failed",
      error: err,
    });
  }
};

export const getStoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [data] = await getStoryByIdModel(id);

    if (!data) {
      res.status(404).json({
        message: "Story not found",
      });
    } else {
      const updatedData = {
        ...data,
        story_cover: data.story_cover && 'http://localhost:4000/assets/' + data.story_cover,
      };

      res.status(200).json({
        message: "GET story by id success",
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "GET story by id failed",
      error: err,
    });
  }
};

export const createStory = async (req: Request, res: Response) => {
  const { body, file } = req;

  console.log(req.file);

  if (
    !body.title ||
    !body.author ||
    !body.synopsis ||
    !body.category ||
    !body.status ||
    !body.tags
  ) {
    res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
    return;
  }

  // if(!file) {
  //   res.status(400).json({
  //     message: "Anda harus mengirim dengan gambar",
  //     data: null,
  //   });
  //   return;
  // }

  try {
    await createStoryModel(body, file);
    res.status(201).json({
      message: "POST story success",
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: "POST story failed",
      error: err,
    });
  }
};

export const updateStory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body, file } = req;
  try {
    const existingStory = await getStoryByIdModel(id);

    if (!existingStory) {
      res.status(404).json({
        message: "Story not found",
      });
    } else {
      await updateStoryModel(id, body, file);
      res.json({
        message: "PUT story success",
        data: {
          id: id,
          ...body,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "PUT story error",
      error: err,
    });
  }
};

export const deleteStory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteStoryModel(id);
    res.json({
      message: "DELETE story success",
      data: {
        id: id,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "DELETE story error",
      error: err,
    });
  }
};

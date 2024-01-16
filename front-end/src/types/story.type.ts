export interface Story {
  id: number;
  title: string,
  author: string,
  synopsis: string,
  category: string,
  status: string
  story_cover: any,
  tags: string,
}

export interface FormStory {
  title: string,
  author: string,
  synopsis: string,
  category: string,
  status?: string
  story_cover: any,
  tags: string,
}

export interface DeleteStory {
  id : number;
}

export type StoryFilter = {
  author?: string;
  title?: string;
  status?: string;
  category?: string;
};

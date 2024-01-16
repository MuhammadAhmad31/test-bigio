// import { ButtonLoader } from "@/components/ui/Custom/ButtonLoader";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddStory } from "@/hooks/useStory";
import { StoryLayouts } from "@/components/Layout/BookLayouts";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/components/Global/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateBookPage() {
  const { addStory, isLoading } = useAddStory();
  const [preview, setPreview] = useState("");

  const FormSchema = z.object({
    title: z.string().min(2, { message: "Nama terlalu pendek" }),
    author: z.string(),
    tags: z.string(),
    category: z.string(),
    synopsis: z.string(),
    status: z.string(),
    story_cover: z.any(),
  });

  const formCreateStory = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      author: "",
      tags: "",
      category: "",
      synopsis: "",
      status: "",
      story_cover: [],
    },
  });

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addStory({
      ...data,
      story_cover: data.story_cover[0],
    });
  };

  // Rich Editor
  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    formCreateStory.setValue("synopsis", newContent);
  };

  return (
    <StoryLayouts>
      <h1 className="text-2xl font-semibold text-secondary-color-blue">
        Tambah Story
      </h1>
      <Card className="px-5 py-4 my-5 border-none shadow-none md:py-6 md:px-8 bg-slate-100">
        <Form {...formCreateStory}>
          <form
            onSubmit={formCreateStory.handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="mb-4 space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <FormField
                control={formCreateStory.control}
                name="title"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="border-button-color-teal "
                          placeholder="Masukan Judul"
                          type="text"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateStory.control}
                name="author"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          className=" border-button-color-teal [&::-webkit-inner-spin-button]:appearance-none "
                          placeholder="Masukan Penulis"
                          type="text"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateStory.control}
                name="category"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="financial">Financial</SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateStory.control}
                name="status"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="">Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="publish">Publish</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateStory.control}
                name="story_cover"
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <FormItem>
                      <FormLabel className="">Photo</FormLabel>
                      <FormControl>
                        <Input
                          className=" border-button-color-teal"
                          type="file"
                          multiple
                          {...rest}
                          onChange={(event) => {
                            const { files, displayUrl } = getImageData(event);
                            setPreview(displayUrl);
                            onChange(files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateStory.control}
                name="tags"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="">Tags</FormLabel>
                      <FormControl>
                        <Input
                          className=" border-button-color-teal"
                          placeholder="Masukan tags"
                          type="text"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            {preview && (
              <Image
                alt="Product"
                src={preview}
                width={200}
                height={200}
                className="m-4"
              />
            )}
            <FormField
              control={formCreateStory.control}
              name="synopsis"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel className="">Isi Konten</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={content}
                        onChange={handleContentChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button className="my-5">Tambah</Button>
          </form>
        </Form>
      </Card>
    </StoryLayouts>
  );
}

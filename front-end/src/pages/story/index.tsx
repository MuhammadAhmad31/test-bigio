"use client";
import DataTable, { Columns } from "@/components/Global/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Eye, PenIcon, TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import type { Story } from "@/types/story.type";
import { useDeleteStory, useGetStory } from "@/hooks/useStory";
import { StoryLayouts } from "@/components/Layout/BookLayouts";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { ModalDetailStory } from "@/components/admin/ModalDetailStory";

export default function Story() {
  const router = useRouter();

  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetStory({
    author: authorFilter,
    title: titleFilter,
    status: statusFilter,
    category: categoryFilter,
  });

  const [story, setStory] = useState<Story[]>([]);
  const handleFilterChange = () => {
    queryClient.invalidateQueries([
      "stories",
      {
        author: authorFilter,
        title: titleFilter,
        status: statusFilter,
        category: categoryFilter,
      },
    ]);
  };

  const { deleteStory } = useDeleteStory();

  useEffect(() => {
    if (data?.stories) {
      setStory(data.stories);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus story ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStory(id);
      }
    });
  };

  const storyColumns: Columns<Story>[] = [
    {
      header: "No",
      accessor: "id",
    },
    {
      header: "Kategori",
      accessor: "category",
    },
    {
      header: "Penulis",
      accessor: "author",
    },
    {
      header: "Tags",
      accessor: "tags",
      render: ({ tags }) => (
        <>
          {tags.split(",").map((tag, index) => (
            <Badge key={index} className="mx-1" variant="outline">
              {tag.trim()}
            </Badge>
          ))}
        </>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: ({ status }) => {
        if (status === "publish") {
          return <Badge variant="success">Publish</Badge>;
        } else {
          return <Badge variant="primary">Draft</Badge>;
        }
      },
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (data) => (
        <div className="flex gap-2 item-center">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant="outline"
                size="icon"
                className="bg-green-500 hover:bg-green-600"
              >
                <Eye className="w-4 h-4 text-white" />
              </Button>
            </AlertDialogTrigger>
            <ModalDetailStory id={data.id} />
          </AlertDialog>
          <Button
            variant="outline"
            size="icon"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              router.push(`/story/edit/${data.id}`);
            }}
          >
            <PenIcon className="w-4 h-4 text-white" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              handleDelete(data.id);
            }}
          >
            <TrashIcon className="w-4 h-4 text-white" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <StoryLayouts>
      <h1 className="text-2xl ">Daftar Story</h1>
      <hr />
      <div className="mt-4 ">
        <Button
          variant="outline"
          size="sm"
          className="font-medium text-white bg-blue-400 hover:bg-blue-900 hover:text-white"
          onClick={() => {
            router.push("/story/create");
          }}
        >
          Tambah Story
        </Button>
      </div>
      <Card className="px-5 py-4 my-5 border-none shadow-none rounded-xl md:py-6 md:px-8 bg-slate-100">
        <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-3">
          <Input
            type="text"
            placeholder="Penulis"
            value={authorFilter}
            onChange={(e) => {
              setAuthorFilter(e.target.value);
              handleFilterChange();
            }}
          />
          <Input
            type="text"
            placeholder="Judul"
            value={titleFilter}
            onChange={(e) => {
              setTitleFilter(e.target.value);
              handleFilterChange();
            }}
          />
          <div className="flex gap-2">
            <Select
              onValueChange={(e) => {
                const selectedValue = e === "all" ? "" : e;
                setStatusFilter(selectedValue);
                handleFilterChange();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="publish">Publish</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(e) => {
                const selectedValue = e === "all" ? "" : e;
                setCategoryFilter(selectedValue);
                handleFilterChange();
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <h2 className="py-8 text-lg">Jumlah : {story.length}</h2>
        <DataTable columns={storyColumns} data={story} />
      </Card>
    </StoryLayouts>
  );
}

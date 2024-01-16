import { useGetDetailStory } from "@/hooks/useStory";
import { ResponseApi } from "@/types/responseApi.type";
import { Story } from "@/types/story.type";
import React, { Fragment, useEffect, useState } from "react";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

export const ModalDetailStory = ({ id }: any) => {
  const [detail, setDetailStory] = useState<Story>();

  const { data: { detailStory } = { detailPurchase: undefined } } =
    useGetDetailStory(id);

  useEffect(() => {
    if (detailStory) {
      setDetailStory(detailStory);
    }
  }, [detailStory]);

  //   const withdrawalColumns: Columns<DetailWithdrawalItem>[] = [
  //     {
  //       header: "No",
  //       accessor: "withdrawal_id",
  //     },
  //     {
  //       header: "Nama",
  //       accessor: "withdrawal_user_name",
  //     },
  //     {
  //       header: "Jumlah Penarikan",
  //       accessor: "withdrawal_total",
  //       render: (data) => {
  //         return <span> {convertIDR(data.withdrawal_total)}</span>;
  //       },
  //     },
  //     {
  //       header: "Admin",
  //       accessor: "withdrawal_admin_name",
  //     },
  //     {
  //       header: "Tanggal",
  //       accessor: "withdrawal_date",
  //       render: ({ createdAt }) => {
  //         return (
  //           <span className="text-center">{convertDateTime(createdAt)}</span>
  //         );
  //       },
  //     },
  //   ];

  return (
    <AlertDialogContent className="max-w-4xl">
      <AlertDialogHeader>
        <AlertDialogDescription>
          <AlertDialogCancel>Kembali</AlertDialogCancel>
          <Card className="px-2 py-2 my-5 border-none shadow-none rounded-xl md:py-6 md:px-8 bg-slate-100">
            {detail && (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    {detail.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center w-full">
                    <Image
                      src={detail.story_cover}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />
                  </div>
                  <CardDescription className="grid grid-cols-2 gap-2 pt-5 pb-3">
                    <div className=" text-start">
                      <p>penulis : {detail.author}</p>
                      <p>kata kunci : {detail.tags}</p>
                    </div>
                    <div className="text-end">
                      <p>status : {detail.status}</p>
                      <p>kategori : {detail.category}</p>
                    </div>
                  </CardDescription>
                  <div className="py-5 ">
                    {detail?.synopsis && (
                      <div
                        dangerouslySetInnerHTML={{ __html: detail.synopsis }}
                      />
                    )}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
};

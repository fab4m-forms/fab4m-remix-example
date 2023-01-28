import { Diary as DiaryModel } from "@prisma/client";
import { prisma } from "~/db.server";

// We export our own Diary interface which is our representation
// of the diary that will used inside of our components.
export interface Diary {
  id: string;
  body: string;
  title: string;
  tags: string[];
}

export async function getDiary({
  id,
}: Pick<DiaryModel, "id">): Promise<Diary | undefined> {
  const diary = await prisma.diary.findFirst({
    select: { id: true, body: true, title: true, tags: true },
    where: { id },
  });
  return diary
    ? {
        ...diary,
        tags: JSON.parse(diary?.tags),
      }
    : undefined;
}

export function getDiaries() {
  return prisma.diary.findMany({
    select: { id: true, title: true, body: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createDiary({
  body,
  title,
  tags,
}: Pick<Diary, "body" | "title"> & {
  tags: string[];
}) {
  return prisma.diary.create({
    data: {
      title,
      body,
      tags: JSON.stringify(tags),
    },
  });
}

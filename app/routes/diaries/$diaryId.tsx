import { Link, useLoaderData } from "@remix-run/react";
import { getDiary, Diary } from "~/models/diary.server";

export async function loader({ params }: { params: { diaryId: string } }) {
  const diary = await getDiary({ id: params.diaryId });
  if (!diary) {
    throw new Response("Not Found", { status: 404 });
  }
  return diary;
}

export default function DiaryView() {
  const diary = useLoaderData<Diary>();
  return (
    <article className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <Link to="../../" className="mb-4 inline-block text-sky-400">
        Back
      </Link>
      <h1 className="mb-2 text-3xl font-bold">{diary.title}</h1>
      <p className="mb-2">{diary.body}</p>
      <ul className="flex flex-wrap">
        {diary.tags.map((tag, i) => (
          <li
            className="mr-2 rounded bg-sky-500 px-2 px-4 text-sm text-white"
            key={i}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

import { Link, useLoaderData } from "@remix-run/react";
import { Diary, getDiaries } from "~/models/diary.server";

export function loader() {
  return getDiaries();
}

export default function Index() {
  const diaries = useLoaderData<Diary[]>();
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-4 text-3xl font-bold">Diaries</h1>
      <Link
        to="diaries/new"
        className="mb-4 inline-block rounded bg-sky-500 px-4 py-2 font-bold font-medium text-white hover:bg-sky-800"
      >
        Create new diary
      </Link>
      {diaries.map((diary, i) => (
        <article key={i}>
          <h2 className="mb-2 text-2xl font-bold">
            <Link to={`diaries/${diary.id}`} className="hover:underline">
              {diary.title}
            </Link>
          </h2>
          <p className="mb-2">{diary.body}</p>
        </article>
      ))}
    </main>
  );
}

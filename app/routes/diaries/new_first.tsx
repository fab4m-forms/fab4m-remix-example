import {
  createForm,
  tagsWidget,
  textAreaField,
  textField,
  fromFormData,
} from "@fab4m/fab4m";
import { StatefulFormRoute } from "@fab4m/routerforms";
import { useActionData } from "@remix-run/react";
import { ActionArgs, json } from "@remix-run/server-runtime";
import { createDiary, Diary } from "~/models/diary.server";

const form = createForm<Diary>({
  title: textField({
    label: "Title",
    required: true,
  }),
  body: textAreaField({
    label: "Body",
    required: true,
  }),
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

export async function action({ request }: ActionArgs) {
  // The fromFormData transforms the postdata from fab4m into
  // the format for our form.
  const formData = fromFormData(form, await request.formData());
  const diary = await createDiary(formData);
  return json(diary);
}

export default function NewDiaryPage() {
  const diary = useActionData<Diary>();
  console.log(diary);
  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      {diary && <p>The diary {diary.title} was saved!</p>}
      <h1 className="mb-2 text-3xl font-bold">Create new diary</h1>
      <StatefulFormRoute form={form} useRouteAction={true} />
    </main>
  );
}

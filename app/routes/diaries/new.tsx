import {
  createForm,
  fromFormData,
  tagsWidget,
  textAreaField,
  textField,
  generateSchema,
} from "@fab4m/fab4m";
import Ajv from "ajv";
import { StatefulFormRoute } from "@fab4m/routerforms";
import { ActionArgs, json, redirect } from "@remix-run/server-runtime";
import { createDiary, Diary } from "~/models/diary.server";
import { useActionData } from "@remix-run/react";

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

const ajv = new Ajv();
const validate = ajv.compile(generateSchema(form));

export async function action({ request }: ActionArgs) {
  const formData = fromFormData<Diary>(form, await request.formData());

  const valid = validate(formData);
  if (!valid && validate.errors) {
    return json({ errors: validate.errors, data: formData });
  }
  const diary = await createDiary(formData);
  return redirect(`/diaries/${diary.id}`);
}

export default function NewDiaryPage() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="relative m-auto mt-10 min-h-screen w-1/2 rounded bg-slate-200 bg-white p-4 sm:items-center">
      <h1 className="mb-2 text-3xl font-bold">Create new diary</h1>
      {actionData && (
        <ul>
          {actionData.errors.map((error, i) => (
            <li key={i} className="text-red mb-2">
              {error.message}
            </li>
          ))}
        </ul>
      )}
      <StatefulFormRoute
        form={form}
        data={actionData?.data}
        useRouteAction={true}
      />
    </main>
  );
}

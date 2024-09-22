"use client";

import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
import dateToISO from "@/src/utils/dateToISO";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { ChangeEvent, useState } from "react";
import FXTextArea from "@/src/components/form/FXTextArea";
import { AddIcon, TrashIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/UI/Loading";
import { useRouter } from "next/navigation";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({
    key: city,
    label: city,
  }));

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();
  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData?.data.map(
      (category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      })
    );
  }

  const methods = useForm();

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
      user: user!._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    console.log(formData.get("data"));
    console.log(formData.get("itemImages"));

    handleCreatePost(formData);
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <Divider className="mb-5 mt-3" />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput name="title" label="Title" />
              </div>
              <div className="min-w-fit flex-1">
                <FXDatePicker name="dateFound" label="Found Date" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput name="location" label="Location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect name="city" label="City" options={cityOptions} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  name="category"
                  label="Category"
                  options={categoryOption}
                  disabled={!categorySuccess}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="border-default-300 border-2 block w-full h-full rounded-lg cursor-pointer text-center pt-3"
                  htmlFor="image"
                >
                  Upload Image
                </label>
                <input
                  className="hidden"
                  type="file"
                  multiple
                  id="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            <div className="flex gap-4 my-5 flex-wrap">
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48  rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                      alt="item"
                    />
                  </div>
                ))}
            </div>

            <div>
              <div className="min-w-fit flex-1">
                <FXTextArea name="description" label="Description" />
              </div>
            </div>

            <Divider className="my-4" />

            <div className="flex justify-between items-center ">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button
                className="p-1"
                isIconOnly
                onClick={() => handleFieldAppend()}
              >
                <AddIcon />
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mt-2">
                <FXInput
                  name={`questions.${index}.value`}
                  placeholder="Question"
                />
                <Button
                  className="p-1"
                  isIconOnly
                  onClick={() => remove(index)}
                >
                  <TrashIcon />
                </Button>
              </div>
            ))}
            <Divider className="my-4" />

            <Button type="submit">Post</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreatePost;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchAndParseJSONL } from "@/lib/fetchJsonl";
import TextWithLineBreaks from "@/lib/TextWithLineBreaks";
import { saveItems } from "@/items";
import { redirect } from "next/navigation";

const path = "/home/bobxyz/user-prompt-web/lib/gpt4o-gpt4oResponse.jsonl";

export default async function Component({ params }) {
  const data = await fetchAndParseJSONL(path);

  //set the index equal to the slug url
  let index = params.slug;
  const item = data[index - 1];

  if (item === undefined) {
    redirect("/gpt4oRes");
  }

  const randomValue = Math.random() < 0.5 ? 0 : 1;

  async function submitItem(formData) {
    "use server";

    const selectedResponse = formData.get("response");

    let answer = 0;

    if (randomValue === 0) {
      if (selectedResponse === "response1") {
        answer = 0;
      } else if (selectedResponse === "response2") {
        answer = 1;
      }
    } else if (randomValue === 1) {
      if (selectedResponse === "response1") {
        answer = 1;
      } else if (selectedResponse === "response2") {
        answer = 0;
      }
    }

    await saveItems(answer);

    let index = +params.slug + 1;
    const link_redirect = `/gpt4oRes/${index}`;
    redirect(link_redirect);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl w-full p-6 md:p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 dark:text-gray-200">
          {item["task"]}
        </h1>
        <form action={submitItem}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <Card className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    Response 1
                  </p>
                  <MessageCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>

                <TextWithLineBreaks
                  text={
                    randomValue === 0
                      ? item["original_response"]
                      : item["revised_response"]
                  }
                />
              </Card>
            </div>
            <div className="space-y-4">
              <Card className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    Response 2
                  </p>
                  <MessageCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <TextWithLineBreaks
                  text={
                    randomValue === 1
                      ? item["original_response"]
                      : item["revised_response"]
                  }
                />
              </Card>
            </div>
          </div>

          <div className="flex justify-center pb-6 space-x-2">
            <input
              type="radio"
              id="response1"
              name="response"
              className="form-radio"
              style={{ width: "1.5rem", height: "1.5rem" }}
              value="response1"
            />
            <label
              htmlFor="response1"
              className="text-gray-700 dark:text-gray-300"
            >
              Response 1
            </label>

            <input
              type="radio"
              id="response2"
              name="response"
              className="form-radio"
              style={{ width: "1.5rem", height: "1.5rem" }}
              value="response2"
            />
            <label
              htmlFor="response2"
              className="text-gray-700 dark:text-gray-300"
            >
              Response 2
            </label>
          </div>
          <div className="flex justify-center ">
            <Button type="submit" className=" px-8 py-4 text-lg   ">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

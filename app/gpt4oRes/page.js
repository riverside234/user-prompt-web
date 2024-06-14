import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getItems } from "@/items";

export default async function Component() {
  getItems().then((answers) => {
    console.log(answers);
  });

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl w-full p-6 md:p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 dark:text-gray-200 text-center">
          Thank you!
        </h1>
      </div>
    </div>
  );
}

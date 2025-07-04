import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(newsData);
}

const newsData = {
  title: "Example news data response",
  description: "This is an example news data response.",
  statusCode: 200,
  data: [
    {
      id: 1,
      uniqueId: "unique1",
      imagePath: "https://dummyimage.com/1920x1080",
      title: "New Renewable Energy Bill Passed",
      category: "Politics",
      date: "2025-07-04",
      author: "Jane Doe",
      content: "The government has passed a new bill aimed at boosting investment in renewable energy.",
      description: "The new bill introduces financial incentives for renewable energy projects, aiming to reduce the nation's dependence on fossil fuels and promote sustainability.",
    },
  ]
};

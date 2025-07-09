import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "src", "app", "data", "data-news.json")

export async function PUT(request: NextRequest, { params }: { params: { uniqueId: string } }) {
  try {
    const file = fs.readFileSync(dataFilePath, "utf8")
    const bunchOfData = JSON.parse(file)

    const itemIndex = bunchOfData.findIndex((item: any) => item.uniqueId === params.uniqueId)

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          title: "News not found",
          description: "The news item to update views could not be found.",
          statusCode: 404,
          data: null,
        },
        { status: 404 },
      )
    }

    // Increment the views by 1
    const currentViews = parseInt(bunchOfData[itemIndex].views || 0)
    bunchOfData[itemIndex].views = currentViews + 1

    fs.writeFileSync(dataFilePath, JSON.stringify(bunchOfData, null, 2))

    return NextResponse.json({
      title: "View count incremented",
      description: "Successfully incremented the views count.",
      statusCode: 200,
      data: bunchOfData[itemIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        title: "Error incrementing views",
        description: "An error occurred while incrementing the views.",
        statusCode: 500,
        data: null,
      },
      { status: 500 },
    )
  }
}

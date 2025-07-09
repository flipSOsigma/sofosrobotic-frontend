import { NextResponse } from "next/server";
import fs, { promises as fsPromises } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "app", "data", "data-news.json");
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Helper function to read and parse data file
const getNewsData = () => {
  const file = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(file);
};

// Helper function to write data to file
const writeNewsData = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET(request: Request, { params }: { params: { uniqueId: string } }) {
  try {
    const bunchOfData = getNewsData();
    const newsItem = bunchOfData.find((item: any) => item.uniqueId === params.uniqueId);

    if (!newsItem) {
      return NextResponse.json(
        {
          title: "News not found",
          description: "The requested news item could not be found.",
          statusCode: 404,
          data: null,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      title: "News item retrieved successfully",
      description: "Single news item data response.",
      statusCode: 200,
      data: newsItem,
    });
  } catch (error) {
    console.error('Error retrieving news:', error);
    return NextResponse.json(
      {
        title: "Error retrieving news",
        description: "An error occurred while retrieving the news item.",
        statusCode: 500,
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: { params: { uniqueId: string } }) {
  try {
    // Ensure upload directory exists
    try {
      await fsPromises.access(uploadDir);
    } catch (err) {
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }

    const bunchOfData = getNewsData();
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());
    
    // Process new image uploads
    const imageList: string[] = [];
    const files = formData.getAll('images') as File[];
    
    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}${path.extname(file.name)}`;
        const filePath = path.join(uploadDir, filename);
        
        await fsPromises.writeFile(filePath, buffer);
        imageList.push(`/uploads/${filename}`);
      }
    }

    const itemIndex = bunchOfData.findIndex((item: any) => item.uniqueId === params.uniqueId);

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          title: "News not found",
          description: "The news item to update could not be found.",
          statusCode: 404,
          data: null,
        },
        { status: 404 },
      );
    }

    // Get existing images that weren't removed
    const existingImages = formData.getAll('existingImages') as string[] || [];

    // Update the item
    const updatedItem = {
      ...bunchOfData[itemIndex],
      ...body,
      uniqueId: params.uniqueId, // Preserve original uniqueId
      imagePath: [...existingImages, ...imageList], // Combine existing and new images
      updatedAt: new Date().toISOString(),
    };

    bunchOfData[itemIndex] = updatedItem;
    writeNewsData(bunchOfData);

    return NextResponse.json({
      title: "Successfully updated news",
      description: "The news item has been successfully updated.",
      statusCode: 200,
      data: updatedItem,
    });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      {
        title: "Error updating news",
        description: "An error occurred while updating the news item.",
        statusCode: 500,
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { uniqueId: string } }) {
  try {
    const bunchOfData = getNewsData();
    const itemIndex = bunchOfData.findIndex((item: any) => item.uniqueId === params.uniqueId);

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          title: "News not found",
          description: "The news item to delete could not be found.",
          statusCode: 404,
          data: null,
        },
        { status: 404 },
      );
    }

    const deletedItem = bunchOfData.splice(itemIndex, 1)[0];
    writeNewsData(bunchOfData);

    return NextResponse.json({
      title: "Successfully deleted news",
      description: "The news item has been successfully deleted.",
      statusCode: 200,
      data: deletedItem,
      length: bunchOfData.length,
    });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      {
        title: "Error deleting news",
        description: "An error occurred while deleting the news item.",
        statusCode: 500,
        data: null,
      },
      { status: 500 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Necessary for file uploads
  },
};
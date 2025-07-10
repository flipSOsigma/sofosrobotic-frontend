import { NextResponse } from "next/server";
import fs, { promises as fsPromises } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const dataFilePath = path.join(process.cwd(), "src", "app", "data", "data-news.json");
const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    const file = fs.readFileSync(dataFilePath, "utf8");
    const bunchOfData = JSON.parse(file);
    return NextResponse.json({
      title: "Example news data response",
      description: "This is an example news data response.",
      statusCode: 200,
      data: bunchOfData,
      length: bunchOfData.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        title: "Error retrieving news",
        description: "An error occurred while retrieving news data.",
        statusCode: 500,
        data: [],
        length: 0,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Ensure upload directory exists
    try {
      await fsPromises.access(uploadDir);
    } catch (err) {
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }

    // Read existing data
    const file = fs.readFileSync(dataFilePath, "utf8");
    const bunchOfData = JSON.parse(file);

    // Get form data (for file upload)
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());

    // Process images
    const imageList: string[] = [];
    const files = formData.getAll("images") as File[];

    for (const file of files) {
      if (file instanceof File && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}${path.extname(file.name)}`;
        const filePath = path.join(uploadDir, filename);

        await fsPromises.writeFile(filePath, buffer);
        imageList.push(`/uploads/${filename}`);
      }
    }

    // Generate ID
    const id = crypto.createHash("sha256").update(uuidv4()).digest("hex");

    const newBody = {
      ...body,
      uniqueId: id,
      imagePath: imageList.length > 0 ? imageList : body.imagePath || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    };

    bunchOfData.push(newBody);
    fs.writeFileSync(dataFilePath, JSON.stringify(bunchOfData, null, 2));

    return NextResponse.json({
      title: "Successfully added news",
      description: "the data has been successfully added in file: " + dataFilePath,
      statusCode: 200,
      data: newBody,
      length: bunchOfData.length,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        title: "Error adding news",
        description: "An error occurred while adding the news item.",
        statusCode: 500,
        data: null,
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

import { NextResponse } from "next/server";
import Orgnisation from "@/models/Orgnisation";
import { mkdir, writeFile } from "fs/promises";

export const POST = async (req) => {
    try {
        const reqBody = await req.formData();

        const template = {};

        for (const [key, value] of reqBody.entries()) {
            template[key] = value;
        }
        template.fields = JSON.parse(template.fields);

        const userId = template.id;

        delete template.id;

        const org = await Orgnisation.findById(userId);

        const byteData = await template.pdfFile.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const fileExtension = template.pdfFile.name.split('.')[template.pdfFile.name.split('.').length - 1];
        const fileName = `${template.name}.${fileExtension}`
        const directoryPath = `./public/templates/${org.name}`;
        const templatePath = `${directoryPath}/${fileName}`;

        await mkdir(directoryPath, { recursive: true });
        await writeFile(templatePath, buffer);

        const existingTemplateIndex = org.templates.findIndex(
            (dbtemplate) => dbtemplate.name === template.name
        );

        if (existingTemplateIndex !== -1) {

            return NextResponse.json(
                { message: 'template with Same name Exist', type: "warning", success: false, },
                { status: 409 }
            )

        } else {
            // Add the new template
            org.templates.push({ ...template, url: `/templates/${org.name}/${fileName}` });
        }

        const updatedOrg = await org.save();

        return NextResponse.json(
            { message: 'templates added successfully', type: "success", success: true, },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }

}
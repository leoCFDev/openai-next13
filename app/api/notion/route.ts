import { Client } from "@notionhq/client";
interface Body {
  roteiro: string;
  seo: string;
  database_id: string;
  tema: string;
}
export async function POST(request: Request) {
  const body: Body = await request.json();
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const database_id = body.database_id;

  const roteiro = body.roteiro;
  const SEO = body.seo;
  const tema = body.tema;
  console.log(roteiro);
  const page = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: database_id,
    },
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Roteiro" } }],
        },
      },
      {
        object: "block",
        type: "code",
        code: {
          language: "plain text",
          rich_text: [
            {
              type: "text",
              text: {
                content: roteiro,
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "SEO" } }],
        },
      },
      {
        object: "block",
        type: "code",
        code: {
          language: "plain text",
          rich_text: [
            {
              type: "text",
              text: {
                content: SEO,
              },
            },
          ],
        },
      },
    ],
    properties: {
      Area: {
        multi_select: [
          {
            name: "Temas AI",
          },
        ],
      },

      Name: {
        title: [
          {
            text: {
              content: tema,
            },
          },
        ],
      },
    },
  });
  return new Response("Hello, Next.js!");
}

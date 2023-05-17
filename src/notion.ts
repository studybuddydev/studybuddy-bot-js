import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv';

dotenv.config();


const notion = new Client({ auth: process.env.NOTION_TOKEN });
const db_id = process.env.DB_ID ?? '';
const tododev_id = process.env.TODODEV_ID ?? '';

async function addItem() {
    const response = await notion.pages.create({
        parent: {
            database_id: db_id,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: "New Item",
                        },
                    },
                ],
            },
            Description: {
                rich_text: [
                    {
                        text: {
                            content: "This is a new item.",
                        },
                    },
                ],
            },
        },
    });
    console.log(response);
}

async function getTodos() {
    const response = await notion.databases.query({
        database_id: tododev_id,
    });

    let todos = []
    
    for (const page of response.results as any) {
        if (page['properties']['Status']['status']['name'] != 'Done'){
            if (page.properties.priority?.select?.name != 'low' && page.properties.priority?.select?.name){
                
                //console.log(page.properties.priority?.select?.name)
                //console.log(page['properties']['Name']['title'][0]['plain_text']);
                todos.push(page['properties']['Name']['title'][0]['plain_text'])
                //console.log(page['properties'])
            }
        }
    }
}

getTodos()
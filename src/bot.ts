import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { parse } from 'node-html-parser';
import fs from 'fs';
dotenv.config();



const bot = new Telegraf(process.env.BOT_TOKEN ?? '');

bot.start((ctx) => ctx.reply('ciao sono studybuddy'));


bot.command('ping', (ctx) => ctx.reply('pong'));




async function check() {
    console.log('ciao')
}

setInterval(() => check(), 1000 );

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
bot.launch();
console.log('Bot started');
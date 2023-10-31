import * as fs from 'fs'
import path from 'path';
import { __dirname } from "./utils.js";

const file = path.join(__dirname, '../products.json');

export const saveData = async (data) => {
    try {
        await fs.promises.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {  
        throw new Error('Error: ' + error.message)
    }
}

export const getData = async () => {
    if (!fs.existsSync(file)) return []

    try {
        const data = await fs.promises.readFile(file, 'utf-8');
        return JSON.parse(data);
    } catch (error) {  
        throw new Error('Error: ' + error.message)
    }
}
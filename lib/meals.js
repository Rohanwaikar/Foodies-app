    import sql from 'better-sqlite3';
    const db = sql('meals.db');
    import slugify from 'slugify';
    import xss from 'xss';
    import fs from 'fs';
    import { error } from 'console';


    export async function getMeals(){
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for fetching meals
        
        return db.prepare('SELECT * FROM meals').all();
    }


    export function getMealBySlug(slug) {
        
        return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    }

    export async function saveMeal(meal){
        const slug = slugify(meal.title, { lower: true }); // Create a slug from the meal title
        const sanitizedInstructions = xss(meal.instructions); // Sanitize instructions to prevent XSS attacks
        const extension = meal.image.name.split('.').pop(); // Get the file extension
        const filename = `${slug}.${extension}`; // Create a filename using the slug and extension
        const stream = fs.createWriteStream(`public/images/${filename}`); // Create a write stream to save the image
        const bufferedImage = await meal.image.arrayBuffer();
        stream.write(Buffer.from(bufferedImage), (error) => {
            if(error) {
                throw new Error('Error writing image to file: ' + error.message);
            }
        }); // Write the image buffer to the file

        meal.image = `/images/${filename}`; // Update the meal image path

        db.prepare(`INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)`)
            .run(meal.title, meal.summary, sanitizedInstructions, meal.creator, meal.creator_email, meal.image, slug);
    }
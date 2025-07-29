import classes from './page.module.css';
import { getMealBySlug } from '@/lib/meals';
import Image from 'next/image';

  
export default function MealDetailsPage({ params }) {
  const meal = getMealBySlug(params.mealSlug);
  meal.instructions = meal.instructions.replace(/\n/g, '<br />'); // Remove HTML tags from instructions

  return (
    <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image fill src={meal.image} alt={meal.title} />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.email}`}>{meal.name}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
      </div>
    </header>
    <main className={classes.main}>
      <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
    </main>
    </>
  );
}
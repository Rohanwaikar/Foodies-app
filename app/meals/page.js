import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
export default async function Meals(){

    const meals = await getMeals();

    return(
        <>
        <header className={classes.header}>
            <h1>Delicious meals, created {' '}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p>Choose your favorite recipe from our menu.</p>
            <p className={classes.cta}>
                <Link href={"/meals/share"}>Share your own recipe</Link>
            </p>
            </header>
            <main className={classes.main}>
                <MealsGrid meals={meals} />
            </main>
        </>
    );
}
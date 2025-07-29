import classes from './meals-grid.module.css';
import MealItem from './meals-item';
export default function MealsGrid({ meals }) {
    return (
        <ul className={classes.meals}>
            {
                meals.map(meal => (
                    <li key={meal.id}>
                        <MealItem
                            title={meal.title}
                            slug={meal.slug}
                            image={meal.image}
                            summary={meal.summary}
                            creator={meal.creator}
                            creatorEmail={meal.creator_email}
                        />
                    </li>
                ))
            } 
        </ul>
    );
}
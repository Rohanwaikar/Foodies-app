'use client';
export default function Error() {
    return ( 
        <main className="error">
            <h1>An error occurred while fetching meals.</h1>
            <p>Failed to fetch meal data. Please try again later.</p>
        </main>
    );
}
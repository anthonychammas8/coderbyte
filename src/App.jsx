import { useState } from "react";
import "./App.css";

const articles = [
  {
    id: 1,
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    description:
      "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows, columns and grid-auto-rows, columns.",
  },
  {
    id: 2,
    title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
    date: "Sep 20, 2018",
    description:
      "In this tutorial, we will use CSS Grid to recreate the familiar GitHub contribution graph layout.",
  },
  {
    id: 3,
    title: "A complete guide to CSS Flexbox",
    date: "Aug 14, 2018",
    description:
      "Learn how Flexbox can be used to align elements, control spacing and create responsive page layouts.",
  },
  {
    id: 4,
    title: "Creating responsive layouts with CSS Grid",
    date: "Jul 25, 2018",
    description:
      "CSS Grid makes it possible to create responsive page layouts with rows, columns and flexible spacing.",
  },
  {
    id: 5,
    title: "How to build reusable React components",
    date: "Jun 11, 2018",
    description:
      "React components make it easier to divide an interface into smaller reusable sections.",
  },
  {
    id: 6,
    title: "Using media queries for mobile screens",
    date: "May 06, 2018",
    description:
      "Media queries allow your website to adapt its design to tablets, phones and desktop screens.",
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, query }) {
  const searchValue = query.trim();

  if (!searchValue) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegex(searchValue)})`, "gi");

  return text.split(regex).map((part, index) => {
    const isMatch = part.toLowerCase() === searchValue.toLowerCase();

    return isMatch ? (
      <mark key={index}>{part}</mark>
    ) : (
      <span key={index}>{part}</span>
    );
  });
}

function ArticleCard({ article, query }) {
  return (
    <article class="article-card">
      <h2>
        <HighlightedText text={article.title} query={query} />
      </h2>

      <p class="article-date">{article.date}</p>

      <p class="article-description">
        <HighlightedText text={article.description} query={query} />
      </p>
    </article>
  );
}

function App() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const searchableText =
      `${article.title} ${article.description}`.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <>
      <section class="main">
        <div class="left-column">
          <div class="title">
            <h2>Search</h2>
          </div>
          <div class="seach-container">
            <input
              type="search"
              value={query}
              placeholder="Search articles..."
              aria-label="Search articles"
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                className="clear-button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </div>
          <p class="results-p">
            <span class="results-span">{filteredArticles.length} post </span>
            {filteredArticles.length === 1 ? "was" : " were"} found.
          </p>
          <div class="cards-container">
            <div class="cards-list">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    query={query}
                  />
                ))
              ) : (
                <p class="no-results">No articles matched your search.</p>
              )}
            </div>
          </div>
        </div>
        <div class="right-column">
          <div class="profile-card">
            <p class="profile-description">
              <strong>bitsofcode. </strong>
              Articles on Frontend Development. All articles are written by
              <a href="#"> Ire Aderinokun</a>, Frontend Developer and User Interface
              Designer.
            </p>

            <div class="twitter-follow">
              <a href="#" class="follow-button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1A4 4 0 0 0 12 9v.9a11.4 11.4 0 0 1-8.3-4.2 4 4 0 0 0 1.3 5.4c-.6 0-1.2-.2-1.8-.5 0 2 1.4 3.7 3.3 4.1-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1a4 4 0 0 0 3.8 2.8A8.1 8.1 0 0 1 3.3 19H2a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.1 11.5-11.5v-.5c.8-.6 1.6-1.3 2.3-2.1Z"
                  />
                </svg>

                <span>Follow @ireaderinokun</span>
              </a>

              <span class="followers">19.1K followers</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

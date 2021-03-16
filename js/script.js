'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE]  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(href);

  /* add class 'active' to the correct article */

  targetArticle.classList.toggle('active');
};

function generateTitleLinks() {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);

  /* find all the articles and save them to variable: articles */

  let html = '';

  for (let article of articles) {
    /* get the article id */

    const articleId = article.id;

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  //optArticleSelector - znajduje post który jest klasą w html dla artykulu. Tu stoimy.
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const titleList = article.querySelector(optTitleListSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = document.querySelectorAll('data-tags');
    console.log(articleTags);

    /* split tags into array */
    /* START LOOP: for each tag */
    /* generate HTML of the link */
    /* add generated code to html variable */
    /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    /* END LOOP: for every article: */
  }
}

generateTags();

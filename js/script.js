'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
//optArticleAuthorSelector = '.post-author';

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

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

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

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */

      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;
    console.log(html);

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks) {
    /* remove class active */

    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHrefs = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinksHrefs);
  /* START LOOP: for each found tag link */
  for (let tagLinksHref of tagLinksHrefs) {
    /* add class active */
    tagLinksHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */

  for (let allLink of allLinks) {
    /* add tagClickHandler as event listener for that link */

    allLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const titleList = article.querySelector('.post-author');
    console.log(titleList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const authorTag = article.getAttribute('data-author');
    console.log(authorTag);

    /* generate HTML of the link */

    const linkHTML =
      '<a href="#author-' + authorTag + '"><span>' + '</span></a>';
    console.log(linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;
    console.log(html);

    /* END LOOP: for every article: */
  }
}

generateAuthors();

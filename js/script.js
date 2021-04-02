'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.author.list',
  optTagsListSelector = '.tags.list';
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

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizeCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizeCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;
    console.log(html);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML =
      '<li><a href="#tag-' +
      tag +
      '" class="' +
      calculateTagClass(allTags[tag], tagsParams) +
      '">' +
      tag +
      '</a></li>';
    allTagsHTML += tagLinkHTML;
    // const linkHTML =    '<a href="#author-' + authorTag + '">' + authorTag + '</a>';
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const titleList = article.querySelector('.post-author');
    console.log(titleList);

    /* make html variable with empty string */

    let html = '';

    /* get author from data-tags attribute */

    const authorTag = article.getAttribute('data-author');
    console.log(authorTag);

    /* generate HTML of the link */

    const linkHTML =
      '<a href="#author-' + authorTag + '">' + authorTag + '</a>';
    console.log(linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors[authorTag]) {
      /* [NEW] add tag to allTags object */
      allAuthors[authorTag] = 1;
    } else {
      allAuthors[authorTag]++;
    }

    /* insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;
    console.log(html);

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.authors');

  const tagsParams = calculateTagsParams(allAuthors);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let authorTag in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML =
      '<li><a href="#author-' +
      authorTag +
      '">' +
      authorTag +
      ' (' +
      allAuthors[authorTag] +
      ')' +
      '</a></li>';
    allAuthorsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');
  console.log(author);

  /* find all tag links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active tag link */

  for (let authorLink of authorLinks) {
    /* remove class active */

    authorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHrefs = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinksHrefs);
  /* START LOOP: for each found tag link */
  for (let authorLinksHref of authorLinksHrefs) {
    /* add class active */
    authorLinksHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */

  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

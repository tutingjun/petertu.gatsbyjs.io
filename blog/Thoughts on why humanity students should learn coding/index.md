---
title: "Thoughts on why humanity students should learn coding"
date: "2022-01-20"
slug: "/blog/thoughts-on-why-humanity-students-should-learn-coding"
tag: ["Opinion", "DGAH Class Blog Post", "Programming"]
category: "Digital Humanities"
wordpress: "https://hh2022.amason.sites.carleton.edu/week-3/thoughs-on-why-humanities-students-should-learn-coding/"
---

I firmly believe that Humanity students should learn coding.

The technology 20 years ago had shifted dramatically compared to today. And internet now plays an increasingly important role in storing and transmitting information, which can be a valuable resource for research, even for humanity projects. For example, quantitative elements can be an approach to creating evidence for an abstract topic, which relies heavily on coding techniques to make it possible.

> <em>An appreciation of how complex ideas can be imagined and expressed as a set of formal procedures — rules, models, algorithms — in the virtual space of a computer will be an essential element of a humanities education.</em><p style="font-size: 15px; margin-top: -1rem;margin-bottom: -0.5rem;">Matthew G. Kirschenbaum. Chronicle Review, May 23, 2010, “Hello Worlds (why humanities students should learn to program)” https://mkirschenbaum.wordpress.com/2010/05/23/hello-worlds/</p>

The quote above shows how coding can be an essential tool to express complex ideas. Coding provides a set of rules and constraints that help to make a conceptual idea more concrete and more accessible to the common audience.

As a potential computer science major, I observe that coding can be a great tool to construct a point for different disciplines. For instance, I took a political science course last term, and for the final paper, I need to show the correlation between people’s general sense of nationalism through the film markets. Failing to find any academic journals to support my claim, I used python to write a program that scrapes the film markets in 20 years and analysis its growth through data visualization. Moreover, as I go through a detailed case study by comparing two films, I manage to use python and scrape each film’s review data as evidence to support the claim that different film narratives arouse opposite forms of nationalistic emotion. In this course, I am surprised to see how coding can be an effective tool to prove an explicit claim by generating detailed and valid quantitive data. My experience here provides a real-life application of how coding can facilitate research by giving convincing and straightforward evidence.

In addition, coding can also make the points made in the field of humanity more accessible to the public. With the prevalence of the Internet, results of the research can be displayed on a website with different visualization and explanations for general educational purposes. Using a website, people can have a better idea of what is happening in the field of humanity and see the results of different studies. Although tools such as WordPress can be a great way to start, basic coding technique is also required to achieve the desired website outcome. In addition, features in HTML help to make the website more accessible to people with different needs. Below is a code snippet I write for a website:

```html
<div class="site-search" id="site-search">
  <input
    type="text"
    id="site-search-text"
    name="search_text"
    aria-label="Search through site content"
    class="search_bar"
  />

  <input
    type="image"
    class="search-button"
    src="{{ url_for('static', filename='loupe.png') }}"
    alt="search button"
    width="51"
    height="51"
    value=""
  />
</div>
```

The code here creates a search bar on the website, which looks like the figure below. Notice there is an aria-label property on the search bar and `alt` property on the image. Both properties are used for accessibility purposes, which can help illustrate the purpose of such elements when the user is using the screen reader. Thus using HTML, more people can understand the work presented on the website.

![Screenshot of the search bar](./why_code.png)

---
title: "Chrome Extensions 101"
description: "Recently, I completed freeCodeCamp's JavaScript course. I had also learned HTML and CSS previously. So, I thought of building a project to test my skills. But, I had a problem I…"
date: "2023-03-18"
cover: "/assets/images/blog/chome-extensions-101.png"
author: "Manu S Rao"
---

<p>Recently, I completed freeCodeCamp&#39;s JavaScript course. I had also learned HTML and CSS previously. So, I thought of building a project to test my skills. But, I had a problem I didn&#39;t know what to build. So, I searched in google for beginner Web development projects and found out that chrome extensions are nice starter projects. So, I started reading about them and got to know so many things!! This blogs intends to document my learnings about chrome extensions.</p><p>Chrome extensions are software applications, which are combination of <code>HTML</code>, <code>CSS</code> and <code>JavaScript</code>, which improve user&#39;s browsing experience by making use of various API&#39;s provided by the browser. Extensions developed for Google Chrome can run on any Chromium based browsers(eg. Brave). We can also run them on other browsers like Firefox and Edge with minor changes.</p><h2>Let&#39;s understand the architecture of extensions:</h2><h3>1. Manifest:</h3><p>Every chrome extensions has a special JSON formatted file called <code>mainfest.json</code>. This file specifies the details about the extensions like name, description, author, version, permissions required by the extensions and the files associated with it.</p><p><strong>Sample </strong><code>manifest.json</code><strong> file</strong></p><pre><code> {
  // Required&quot;manifest_version&quot;: 3,
  &quot;name&quot;: &quot;My Extension&quot;,
  &quot;version&quot;: &quot;versionString&quot;,

  // Recommended&quot;action&quot;: {...},
  &quot;default_locale&quot;: &quot;en&quot;,
  &quot;description&quot;: &quot;A plain text description&quot;,
  &quot;icons&quot;: {...},

  // Optional&quot;author&quot;: ...,
  &quot;automation&quot;: ...,
  &quot;background&quot;: {
    // Required&quot;service_worker&quot;: &quot;background.js&quot;,
    // Optional&quot;type&quot;: ...
  },
  &quot;content_scripts&quot;: [{
      // Optional&quot;matches&quot;:[...],
      &quot;js&quot;:[...]
  }],
  &quot;permissions&quot;: [&quot;tabs&quot;]
}</code></pre><p>Current version of <code>manifest</code> i.e <code>v3</code> was introduced in 2020, <a target='_blank' title="https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/" href="https://developer.chrome.com/docs/extensions/mv3/mv2-sunset/">Google has also said</a> it will not allow new extensions with <code>manifest v2</code>.</p><h3>2.Content Scripts:</h3><p>Content scripts are JavaScript files that run in the <code>context</code> of the present web page. They contain logic to read and modify the webpage with help of Document Object Model(DOM). Now you might think, what if I have more than one content scripts? Well, that&#39;s why content scripts are run in isolated world. &gt;</p><blockquote><p>An isolated world is a private execution environment that isn&#39;t accessible to the page or other extensions This helps to differentiate between JavaScript variables of the host page or other extension scripts.</p></blockquote><p>To add a content scripts to extensions, <code>manifest.json</code> needs to be updated with:</p><pre><code>&quot;content_scripts&quot;:[
        {   // Websites to run this script on
            &quot;matches&quot;:[&quot;http://www.youtube.com/*&quot;], 
            // Required JavaScript files
            &quot;js&quot;:[&quot;script.js&quot;] 
        }
    ]</code></pre><h3>3.Service Worker:</h3><p>Service Worker (also known as Background Scripts in <code>manifest v2</code>) are files that are used by extensions to monitor events and react to these events. Service workers are dormant until a specified event occurs, they are loaded when needed and unloaded when idle. To add Service Worker to extensions, <code>manifest.json</code> needs to be updated with:</p><pre><code>&quot;background&quot;: {
    // Note only one service worker can be scpeciifed, but chrome provides
    // options for importing files as modules also.
    &quot;service_worker&quot;: &quot;background.js&quot;
  }</code></pre><h3>4.UI Components:</h3><p>UI compontes of an extension helps the user to navigate through various applications of the extension or show him required information. It include:<br></p><h4>a) Icons:</h4><p>Extensions have Icons to differnetiate fro other extensions on the toolbar. Users can click on this icon to access the <em>Popup</em>.<br>To add Icons to the extensions, <code>manifest.json</code> needs to be updated with:</p><pre><code>&quot;action&quot;: {
    &quot;default_icon&quot;: {
      // Favicon on the extension&#39;s pages and context menu icon.&quot;16&quot;: &quot;extension_toolbar_icon16.png&quot;,
      // Windows computers often require this size.&quot;32&quot;: &quot;extension_toolbar_icon32.png&quot;,
      // Displays on the extension management page.&quot;64&quot;: &quot;extension_toolbar_icon64.png&quot;,
      // Displays on installation and in the Chrome Web Store.&quot;128&quot;: &quot;extension_toolbar_icon128.png&quot;

    }
  }</code></pre><h4>b) Popup:</h4><p>Popup is a special HTML file which is displayed when the users clicks on the Icons. This file can contain images, links to stylesheets, script files, etc. like a normal webpage, except inline JavaScript.<br>To add <em>Popup</em> to the extensions, <code>manifest.json</code> needs to be updated with:</p><pre><code>&quot;action&quot;: {
    &quot;default_popup&quot;: &quot;popup.html&quot;
  }</code></pre><h2>Working:</h2><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/90s6m3LEQBGqYqyKZtE6" alt="Background (2).png" title="Background (2).png" width="1600" height="840" /><p><strong>Working of a Chrome Extension:</strong> With all the above components we have our chrome extension ready, but how does it work? Well, It depends on how much functionality you need. If you just need to get data from the current web page and display them, then <code>content scripts</code> and <code>popup js</code> are enough. <code>content scripts</code> has access to current web page, whereas <code>popup js</code> can manipulate the DOM of the <code>popup.html</code>. To communicate between the <code>content scripts</code> and <code>popup js</code> several message passing is provided by chrome API. </p><p>Similarly, we can extend the extension&#39;s capability using <code>service workers</code>, which listens for events and communicates with <code>content scripts</code> using message passing. Also, <code>popup js</code> can access global variables of <code>service workers</code> directly.</p><h3>Conclusion:</h3><p>I hope you might have understood about the basics of how chrome extensions work and its architecture. In my next blog series, I will show you guys how to build a chrome extension from scratch. Thank You for reading till the end!! Have a great day!<a target='_blank' title="Background (2).png" href="https://cdn.hashnode.com/res/hashnode/image/upload/v1659887697987/3oiOG2uoe.png?auto=compress,format&format=webp">p</a></p>

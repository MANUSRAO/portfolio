---
title: "Creating your own Stock Market Heatmap using Django"
description: "In the world of finance, the ability to visualize market data can be a powerful tool for investors and traders. One popular way of representing financial data is through a heatmap,…"
date: "2023-03-28"
cover: "/assets/images/blog/creating-your-own-heatmap.avif"
author: "Manu S Rao"
---

<p>In the world of finance, the ability to visualize market data can be a powerful tool for investors and traders. One popular way of representing financial data is through a heatmap, which can easily display large amounts of information in a visual format. In this blog, we will explore how to create your stock market heatmap using <a target='_blank' title="https://www.djangoproject.com/" href="https://www.djangoproject.com/">Django</a> and <a target='_blank' title="https://pypi.org/project/beautifulsoup4/" href="https://pypi.org/project/beautifulsoup4/">Beautiful Soup 4</a>. With this project, you will be able to track multiple stocks and see how they are performing in real-time, making it a very useful tool for anyone interested in the stock market. </p><h2>✅Demo of the Project</h2><p>🔗 Link: <a target='_blank' title="https://stockmap.vercel.app/" href="https://stockmap.vercel.app/">https://stockmap.vercel.app/</a></p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/JHfWKyt7SJORWRcfE6sU" alt="fa64455e-1aed-484c-891a-97e51d3f50d8.avif" title="fa64455e-1aed-484c-891a-97e51d3f50d8.avif" width="undefined" height="undefined" /><h3>✅Design of the Project</h3><p>Let me first explain the design of the project:</p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/TAo3S1hT6tcQ7YJwG2gO" alt="2a5278c3-0680-487e-9ee1-4ba80d1e2c79.avif" title="2a5278c3-0680-487e-9ee1-4ba80d1e2c79.avif" width="undefined" height="undefined" /><p></p><ul><li><div><p>Whenever a request is made to the server, we use the <code>requests</code> module to get the data from the <a target='_blank' title="https://moneycontrol.com/" href="https://moneycontrol.com/">Moneycontrol</a> website.</p></div></li><li><div><p>Then, we use <code>Beautiful Soup 4</code> to scrape the website.</p></div></li><li><div><p>The scraped data is cleaned and passed to our HTML page using the <code>Django</code> server.</p></div></li><li><div><p>Using the obtained data, the webpage is rendered with the necessary styling to get a heatmap.</p></div></li></ul><h2>✅Let&#39;s start coding</h2><ol><li><div><h3>Server Set up:</h3></div></li></ol><p>First, step up a virtual environment using <code>virtualenv</code> command. In this environment install <code>django</code> and <code>beautifulsoup4</code> packages using <code>pip</code> command.</p><pre><code>virtualenv &quot;envname&quot;         # envname can be of your choice
./envname/scripts/activate # This will activate the Virtual Environment
pip install django         # This will install django   
pip install beautifulsoup4 # This will install Beautiful Soup 4</code></pre><p>Then, we will start the project and set up a base app that will handle user requests.</p><pre><code>django-admin startproject &quot;appname&quot;
python manage.py startapp &quot;baseapp&quot;</code></pre><p>Now since the <em>Django</em> app is set up we need to write functions to handle the user requests, so go to <a class="autolinkedURL autolinkedURL-url" target='_blank' title="http://views.py/" href="http://views.py/"><strong>views.py</strong></a> file and add a new function. As discussed in the design whenever a request is made to the server, we need to scrape the data. So using the requests module we make a request to the <strong>Moneycontrol</strong> Website and save the response.</p><pre><code>response = requests.get(&quot;https://www.moneycontrolcom/stocks/marketstats/index comp.php?optex=NSE&amp;opttopic=indexcomp&amp;index=9&quot;)</code></pre><p>After we save the response, we use <code>BeautifulSoup4</code> to parse the response. The Parsed response is then analyzed along with the website by which we can make out that our required data is stored in <code>&lt;table&gt;</code> element with nested <code>&lt;a&gt;</code> in <code>&lt;tr&gt;</code> element. We use the <code>find_all</code> function to find the row elements and use the nested <code>find</code> function to extract the data.</p><p>For saving the data, we can use an array of dictionaries where each dictionary is a company along with its details.</p><pre><code># Example company Data
company = {&#39;name&#39;: name, &#39;category&#39;: category, &#39;ltp&#39;: ltp,&#39;priceChange&#39;:        priceChange, &#39;percentChange&#39;: percentChange,&#39;mcap&#39;: mcap}
</code></pre><p>Since we also need to sort the companies based on their categories we can make some more dictionaries for each category and store each company&#39;s data there.</p><p></p><pre><code># Example Category Data
category = {&#39;name&#39;:&#39;name&#39;,&#39;class&#39;:&#39;name&#39;,&#39;data&#39;:[]}</code></pre><p>With the data now collected, we can render the <code>HTML</code> file and the collected data. To render the file, add the following line at the end of the function:</p><pre><code>return render(request, &#39;heatmap.html&#39;, context)</code></pre><p>As you can see, we have to create a plain html file by the name <code>heatmap.html</code> and place the file in <code>Templates</code> folder. The collected data is passed through a <code>context</code> which itself is a dictionary. Inside the <code>heatmap.html</code> file, we can use <em>Django Templating Engine</em> to render the data. As seen in the code below, we have two loops, one to loop through all the <strong>categories</strong> and one to loop through all the <strong>companies</strong> in that category.</p><pre><code>&lt;div class=&quot;cont&quot;&gt;
   {% for d in total_data %}
      &lt;div class=&quot;category-container {{d.class}}&quot;&gt;
        &lt;h4&gt;{{d.name}}&lt;/h4&gt;
        &lt;div class=&quot;company-container&quot;&gt;
           {% for comp in d.data %}
              &lt;div class=&quot;company {{comp.class}}&quot;&gt;
                &lt;p&gt;{{comp.name}}&lt;/p&gt;
                &lt;p&gt;{{comp.percentChange}}%&lt;/p&gt;
              &lt;/div&gt;
           {% endfor %}
        &lt;/div&gt;
     &lt;/div&gt;
   {% endfor %}
&lt;/div&gt;</code></pre><p>Now, we can set a URL for the user to which he/she can make a request and gather data. For setting the URL, go to the <code>urls.py</code> file and add the following line in the <code>urlpatterns</code> list :</p><pre><code>path(&#39;heatmap/&#39;,views.heatmap,name=&quot;Nifty&quot;),</code></pre><p>So now whenever a user makes a request to the server with <code>https://domain/heatmap</code> the user will receive the data of the <code>Nifty50</code> companies.</p><ol><li><div><h3>CSS Styling:</h3></div></li></ol><p>Since heatmaps are structured in a grid-like structure, we will use the <code>CSS-Flex</code> for styling the <code>&lt;div&gt;</code> for each category and its corresponding companies. We can style the page using a separate <code>styles.css</code> file or use <code>Inline CSS</code>, you can choose any of the options. Now, let&#39;s add some base styling:</p><pre><code> /* Base Styles */
* {
    box-sizing: border-box;    
}      
html,
body {
    height: 100%;        
    margin: 0;        
    font-family: &quot;Trebuchet MS&quot;, &quot;Lucida Sans Unicode&quot;, &quot;Lucida Grande&quot;,
              &quot;Lucida Sans&quot;, &quot;Arial&quot;, &quot;sans-serif&quot;;
}
p {
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</code></pre><p>As seen in the code before, we have a main outer <code>&lt;div&gt;</code> container that contains all the category <code>&lt;div&gt;</code> which in turn contains all the company <code>&lt;div&gt;</code>. So let&#39;s write the CSS for each container:</p><pre><code>.cont {    
    display: flex;      
    width: 100%;    
    height: 90vh; 
    flex-wrap: wrap; 
}

.category-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-flow: column;
}

.company-container {
    display: flex;
    width: 100%;
    height: 100%;    
    flex-wrap: wrap;  
}
</code></pre><p>Since some categories have more companies than others, we will make each container width proportional to the number of companies in that category. Since I have done that already, here&#39;s the code:</p><pre><code>.consumer {
    width: 20%;  
}
.minerals {  
width: 14%;
}     
.nonMinerals {        
width: 15%;      
}     
.finance {        
width: 40%;      
}     
.tech {        
width: 15%;      
}    
.nonConsumer {
width: 15%;
}     
.telecom {
width: 5%;  
}     
.industry {
width: 15%;
}     
.consumer {
width: 30%;
}     
.health {
width: 20%;
}     
.trading {
width: 7.5%;
}     
.hospital {   
width: 5%;
}    
.power {
width: 10%;
}
.transport {
width: 7.5%;
}
</code></pre><p>PS: You can change the <code>width</code>s to appeal to your liking.</p><p>With categories and their companies arranged we need to style its background color to match the appearance of the heatmap. For that we can use the following CSS classes:</p><pre><code> .negative-high {
 background-color: #991f29;
 }
 .negative-mid {
 background-color: #f23744;
 }
 .negative-small {
 background-color: #f67c81;
 }
 .neutral {
 background-color: #c0c5cd;
 }
 .positive-small {
 background-color: #42bd7f;
 }
 .positive-mid {
 background-color: #099850;
 }
 .positive-high {
 background-color: #046736;
 }
</code></pre><p>So, in our data whenever we record the percentage of gain or loss for that company we can mention that in the data with the respective class. Adding the class automatically styles the company to match its gain or loss.</p><ol><li><div><h3>Share Feature</h3></div></li></ol><p>With the heatmap now complete, we can add the share feature to download the heatmap as a <strong>PNG</strong> file for sharing. For that, we are going to use <code>html2canvas.js</code> and <code>canvas2image.js</code>. First, we will set a target element to convert it into <code>&lt;canvas&gt;</code> element and then convert the <code>&lt;canvas&gt;</code> into <strong>PNG</strong> Image. To implement this we can just add a small <code>&lt;script&gt;</code> tag at the end of the <code>heatmap.html</code>&#39;s <code>&lt;body&gt;</code>.</p><pre><code>document.getElementById(&quot;shareBtn&quot;).addEventListener(&#39;click&#39;,()=&gt;{
     document.getElementById(&quot;sensex&quot;).style.display = &#39;none&#39;;
     const screenshotTarget = document.body;
     html2canvas(screenshotTarget).then((canvas) =&gt; {
     return Canvas2Image.saveAsPNG(canvas);
     });
     document.getElementById(&quot;sensex&quot;).style.display = &#39;flex&#39;;
 })
</code></pre><h2>✅Wrap Up</h2><p>And that&#39;s it, You have implemented a heatmap that dynamically scraps a website and displays the data in a visually appealing format that aids in swift decision-making. Also, feel free to modify my code to your liking, you can add custom CSS to make it look cooler.</p><p>If you feel stuck at any point, go through my <a target='_blank' title="https://github.com/MANUSRAO/stockmap/" href="https://github.com/MANUSRAO/stockmap/">Github Repo</a>.</p><p>If you want to connect with me, you can find me on <a target='_blank' title="https://x.com/0x_manusrao" href="https://x.com/0x_manusrao"><strong>Twitter</strong></a><strong>.</strong></p><p>Happy coding!!</p>

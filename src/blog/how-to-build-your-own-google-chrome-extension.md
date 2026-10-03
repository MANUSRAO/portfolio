---
title: "How to build your own Google Chrome extension?"
description: "In my last article , I talked about Chrome Extension and Architecture and how it works. I also promised that my next article would be on building a Chrome Extension as a mini…"
date: "2023-02-27"
tags:
  - "Chrome Extension"
cover: "/assets/images/blog/how-to-build-your-own-google-chrome-extension.png"
---

<p>In my <a target='_blank' title="https://manusrao.hashnode.dev/everything-you-need-to-know-about-chrome-extensions" href="https://manusrao.hashnode.dev/everything-you-need-to-know-about-chrome-extensions">last article</a>, I talked about Chrome Extension and Architecture and how it works. I also promised that my next article would be on building a Chrome Extension as a mini project. So, yeah we are now going to build a chrome extension from scratch !! 🎉 🎉</p><h2>Basics of chrome extension</h2><p>Let me give you a quick recap about chrome extension. Chrome extensions are just combination of <code>HTML</code>, <code>CSS</code> and <code>JavaScript</code> files combined together with a <strong>manifest.json</strong> file. <strong>manifest.json</strong> describes the details about the extension and tells which JavaScript files performs which functions.</p><h2>Demo of our project</h2><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/41aeRk86Q6iDJtSPDFqp" alt="demo.avif" title="demo.avif" width="undefined" height="undefined" /><p>Our extension will have a popup which will display all the statistics and a live count bar on YouTube homepage. We are going to use <a target='_blank' title="https://apexcharts.com/" href="https://apexcharts.com/">ApexCharts.js</a> for building the bar graph. Even if we close the YouTube page, the count value is stored by the extension, so it can restart its count, when YouTube page is opened again. It also remembers the day, so it can initialize the count to zero when a new day is started. Complete build project is available on <a target='_blank' title="https://github.com/MANUSRAO/yt-timer" href="https://github.com/MANUSRAO/yt-timer">Github</a> Let&#39;s start building 🔥</p><h2>Building the extension</h2><p>First of all, create a folder, we will create all our HTML and JavaScript files here. Let&#39;s start with our <strong>manifest.json</strong>.</p><h3>1. manifest.json</h3><p>Create a JSON file with the name <strong>manifest.json</strong>, like I said before it describes the information about our extension architecture and permissions required. So, create the file with following starter code:</p><pre><code>{  
    &quot;manifest_version&quot;:3,
    &quot;name&quot;:&quot;YouTube Timer&quot;,
    &quot;version&quot;:&quot;1.0&quot;,
    &quot;description&quot;:&quot;This extension lets you measure time spent on youtube&quot;,
    &quot;author&quot;:&quot;Your name here&quot;
}
</code></pre><p>You are always welcome to change the name and description if you want. We need to mention the details of our extension architecture, for that we need to analyze our requirements from the extension.</p><p>Our requirements for the extension are:</p><ul><li><div><p>Activate and display live timer only on YouTube page.</p></div></li><li><div><p>Store the timer value when user exits YouTube Page.</p></div></li><li><div><p>Display a popup with chart for visualization.</p></div></li></ul><p>For our first requirement, we need a <strong>content script</strong>. <code>content script</code> is a file which runs in the context of current <em>matched</em> web page. Let&#39;s break that down.</p><p><em>context</em> means the <code>content script</code> has access to webpage&#39;s HTML tree, therefore we can apply our DOM manipulations. Since, we need to run a <code>content script</code> add <code>content_scripts</code> property to our <strong>manifest.json</strong>. To mention the JavaScript file, inside <code>content_scripts</code>, create a key <code>js</code> and add an array with our <code>script.js</code> element.</p><p><em>matched</em> refers to the websites on which our <code>content script</code> to run. It is defined by <code>matches</code> in <strong>manifest.json</strong> file, It is an array of strings which also accepts regular expressions. Since, we need to display counter on YouTube page, let&#39;s add YouTube links.</p><p>Now let&#39;s modify our <strong>manifest.json</strong> file indicating our change:</p><pre><code>{  
    &quot;manifest_version&quot;:3,
    &quot;name&quot;:&quot;YouTube Timer&quot;,
    &quot;version&quot;:&quot;1.0&quot;,
    &quot;description&quot;:&quot;This extension lets you measure time spent on youtube&quot;,
    &quot;author&quot;:&quot;Your name here&quot;,
    &quot;content_scripts&quot;:[
        {
            &quot;matches&quot;:[&quot;http://www.youtube.com/*&quot;,&quot;https://www.youtube.com/*&quot;],
            &quot;js&quot;:[&quot;script.js&quot;]
        }
    ]
}
</code></pre><p>For our second requirement, we need to ask the user for storage permissions, so add new key to our <strong>manifest.json</strong>, &quot;permissions&quot; which is a array listing the permissions required. Add &quot;storage&quot; to our permission array.</p><pre><code>&quot;permissions&quot;:[
        &quot;storage&quot;
  ]
</code></pre><p>For our third requirement, we need to read users action and provide output, if the user clicks on our extension icon, then we need to display HTML page with charts, we also need icons to display our extension on the extension toolbar.</p><p>For that we need to modify our <strong>manifest.json</strong> and add a key named <code>action</code> which itself is an object which contains, <code>default_popup</code>, this stores the address of HTML page to displayed, <code>default_title</code>, this stores the content to be displayed when user hovers over the extension icon and lastly <code>icons</code> which stores the value of icons to be displayed in different sizes.</p><p>To adds icons and the know about the required sizes, read my article, where I have <a target='_blank' title="https://manusrao.hashnode.dev/everything-you-need-to-know-about-chrome-extensions#heading-a-icons" href="https://manusrao.hashnode.dev/everything-you-need-to-know-about-chrome-extensions#heading-a-icons">described about icons</a>. SInce, <code>icons</code> are optional, if you don&#39;t want to create <code>icons</code>, you can just remove them from <strong>manifest.json</strong> decleration.</p><p>Our final <strong>manifest.json</strong> after all modifications looks like this:</p><pre><code>{
    &quot;name&quot;:&quot;YouTube Timer&quot;,
    &quot;description&quot;:&quot;This Chrome extension lets you measure time spent on youtube&quot;,
    &quot;version&quot;:&quot;1.0&quot;,
    &quot;manifest_version&quot;:3,
    &quot;action&quot;:{
        &quot;default_popup&quot;:&quot;index.html&quot;,
        &quot;default_title&quot;:&quot;YouTube Timer shows you time spent on YouTube.&quot;,
        &quot;default_icon&quot;: {
            &quot;16&quot;: &quot;Yt.png&quot;,
            &quot;32&quot;: &quot;Yt.png&quot;,
            &quot;48&quot;: &quot;Yt.png&quot;,
            &quot;128&quot;: &quot;Yt.png&quot;
          }
    },
    &quot;permissions&quot;:[
        &quot;storage&quot;
    ],
    &quot;content_scripts&quot;:[
        {
            &quot;matches&quot;:[&quot;http://www.youtube.com/*&quot;,&quot;https://www.youtube.com/*&quot;],
            &quot;js&quot;:[&quot;script.js&quot;]
        }
    ]
}
</code></pre><h3>2. script.js</h3><p><code>script.js</code> is used as content scripts which manages the live counting and displaying it on the YouTube page. First things first, how will we display timer on the YouTube page. Well, with the help of our good old DOM.</p><p>So, create a function called <code>starter()</code> which will create a <code>h2</code> element, sets <code>id</code> to the element and modify its content and style. It will also select the YouTube page&#39;s navbar and appends the newly created <code>h2</code> element.</p><p>Our <strong>script.js</strong> file looks like this after adding the function:</p><pre><code>function starter(){
    let starts = document.querySelector(&quot;#start&quot;);
    let child = document.createElement(&quot;h2&quot;);
    child.setAttribute(&quot;id&quot;,&quot;timer-func&quot;);
    child.innerText = &quot; s&quot;;
    child.style = &quot;color:#fff&quot;;
    starts.append(child);
}
</code></pre><blockquote><p>Note: Selecting the correct navbar element was little tricky, so I directly added the code for that. You can also play around to select element by experimenting with above code.</p></blockquote><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/yf2Fdh5NQUDhi8n6cSvD" alt="JZqHwQIMH.avif" title="JZqHwQIMH.avif" width="undefined" height="undefined" /><p>Now we need to create a function to increment count value, we can do this easily using a <code>setInterval</code> method, with a 1000ms interval. In this one second, we will increment count, check if the time can be expressed in seconds, minutes or hours and add the required statement to be displayed in the newly created element inside YouTube&#39;s navabar.</p><p>Our <strong>script.js</strong> file looks like this after modification:</p><pre><code>let todayCount=0;
setInterval( () =&gt;{
            let child = document.querySelector(&quot;#timer-func&quot;);
            let hours, min, seconds;
            if(window.closed) {  
                clearInterval(timer);         
            }  
            else{
                todayCount++;
                hours = Math.floor(todayCount/3600);
                min = Math.floor((todayCount - hours*3600)/60);
                seconds = Math.floor(todayCount - (min*60+hours*3600));
            }
            let result = &quot; &quot;;
            if(hours&gt;0)
                result = hours + &quot; Hr &quot; + min+&quot; min &quot;+seconds+&quot; s &quot;;
            else if(min &gt; 0)
                result = min+&quot; min &quot;+seconds+&quot; s &quot;;
            else
                result = seconds+&quot; s &quot;;
            child.innerHTML = result;
        }, 1000);
</code></pre><p>Now let us take a slight detour from our <strong>script.js</strong> file to learn how to load our extension, this will helps us debug any errors in between.</p><p>1.Open your browser and on address bar paste this link <code>chrome://extensions/</code> (works on both Google Chrome and Brave)</p><p>2.On the top right corner, turn on &#39;Developer Mode`, this will activate three buttons on the left.</p><p></p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/h3cfzALWRgIgB1HhBKPQ" alt="r6y3Cico9.avif" title="r6y3Cico9.avif" width="undefined" height="undefined" /><p>3.Click Load Unpacked, and select the folder where you have stored the extension files. Don&#39;t forget to pin the extension in extension toolbar.</p><p>4.Now open YouTube website, voila you just created a working extension which displays timer alongside YouTube logo.</p><p></p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/mB9RZ7oSAiRWVgMmCTZ4" alt="KaB9OqAG2.avif" title="KaB9OqAG2.avif" width="undefined" height="undefined" /><p>Now you can see a problem here, whenever you reload a page, the count returns to zero and there is no mechanism to store <code>todayCount</code>&#39;s value. Also, you cannot know which day is today. To solve this problem we are going to create an array of 7 values, each representing a day in the week.</p><p>To store the count values we are going to maintain an array <code>storageArr</code>, which will hold the count values of 7 days. We can use the method <code>chrome.storage.local.set</code> to store the values. We also need to add an event listener, which will trigger when user exits the webpage. This event is described by <code>beforeunload</code>.</p><p>Modifying our <strong>script.js</strong> file:</p><pre><code>window.addEventListener(&#39;beforeunload&#39;, function () {
            // Array to store count and today denotes index 
            storageArr[today]=todayCount;
            chrome.storage.local.set({&#39;arrWeek&#39;:JSON.stringify(storageArr)},function(){
            });
        });
</code></pre><p>Let&#39;s further explore the above code, we have added an event listener, we have called the <code>chrome.storage.local.set</code> method. This method is described in <a target='_blank' title="https://developer.chrome.com/docs/extensions/reference/storage/" href="https://developer.chrome.com/docs/extensions/reference/storage/">chrome documentation</a>. This method takes two arguments, one is the key and its value. Here, key is <code>arrWeek</code> and Value is Stringified array.(<code>chrome.storage.local.set</code> method takes key value pairs in form of strings only). We can also provide a callback to this function. Providing call back is optional here.</p><p>Our <strong>script.js</strong> can display count on YouTube page, it can store the value in storage provided by chrome, but we haven&#39;t added a method to retrieve data from the storage. For that we are going to use <code>chrome.storage.local.get</code> method. This method is an asynchronous method. Hence we are going to use <code>Promises</code> to get the value and use error handling also.</p><pre><code>let getLocalStorageValue = (key) =&gt; {
    return new Promise((resolve, reject) =&gt; {
        try {
            chrome.storage.local.get(key, function (value) {
                resolve(value);
            })
        }
        catch (ex) {
            reject(&quot;Unexpected error occurred: &quot;+ex);
        }
    });
}
</code></pre><p>I have declared a function named <code>getLocalStorage</code> which returns a promise object. We have also added <code>try</code> and <code>catch</code> block to handle errors if any. If no error occurs then we are going to <code>resolve</code> the promise.</p><p>By resolving the promise were passing the stored value into an arrow function, which will check if the value is stored or not. If the value was not stored then the extension is being run for the first time, hence will store arrays of zero in <code>storageArr</code>, if the value was stored, then we will parse it using the <code>JSON.parse</code> function. <strong>Script.js</strong> modified to resolve the promise:</p><pre><code>let storageArr = undefined;
getLocalStorageValue(&quot;arrWeek&quot;)
    .then((value)=&gt;{
        storageArr = value;
            if(storageArr.arrWeek!=undefined)
                storageArr = JSON.parse(storageArr.arrWeek);
            else{
                storageArr.arrWeek = [0,0,0,0,0,0,0];
                storageArr = storageArr.arrWeek;
            }
            if(storageArr==undefined)
                storageArr = [0,0,0,0,0,0,0];
        let today = new Date().getDay();
        let todayCount = 0;
        todayCount = parseInt(storageArr[today]);
});
</code></pre><p>Since, we have declared and stored <code>storageArr</code> values in the resolve function, all the other functions need to be called from the resolving function to get correct <code>storageArr</code> value ( Asynchronous Headache!). Therefore modifying for the above condition, the final <strong>script.js</strong> code consists:</p><pre><code>let getLocalStorageValue = (key) =&gt; {
    return new Promise((resolve, reject) =&gt; {
        try {
            chrome.storage.local.get(key, function (value) {
                resolve(value);
            })
        }
        catch (ex) {
            reject(&quot;Unexpected error occurred: &quot;+ex);
        }
    });
}
let storageArr = undefined;
getLocalStorageValue(&quot;arrWeek&quot;)
    .then((value)=&gt;{
        storageArr = value;
            if(storageArr.arrWeek!=undefined)
                storageArr = JSON.parse(storageArr.arrWeek);
            else{
                storageArr.arrWeek = [0,0,0,0,0,0,0];
                storageArr = storageArr.arrWeek;
            }
            if(storageArr==undefined)
                storageArr = [0,0,0,0,0,0,0];
        let today = new Date().getDay();
        let todayCount = 0;
        todayCount = parseInt(storageArr[today]);
        starter();
        setInterval( () =&gt;{
            let child = document.querySelector(&quot;#timer-func&quot;);
            let hours, min, seconds;
            if(window.closed) {  
                clearInterval(timer);         
            }  
            else{
                todayCount++;
                hours = Math.floor(todayCount/3600);
                min = Math.floor((todayCount - hours*3600)/60);
                seconds = Math.floor(todayCount - (min*60+hours*3600));
            }
            let result = &quot; &quot;;
            if(hours&gt;0)
                result = hours + &quot; Hr &quot; + min+&quot; min &quot;+seconds+&quot; s &quot;;
            else if(min &gt; 0)
                result = min+&quot; min &quot;+seconds+&quot; s &quot;;
            else
                result = seconds+&quot; s &quot;;
            child.innerHTML = result;
        }, 1000);  
        window.addEventListener(&#39;beforeunload&#39;, function () {
            storageArr[today]=todayCount;
            chrome.storage.local.set({&#39;arrWeek&#39;:JSON.stringify(storageArr)},function(){
            });
        });
    });

function starter(){
    let starts = document.querySelector(&quot;#start&quot;);
    let child = document.createElement(&quot;h2&quot;);
    child.setAttribute(&quot;id&quot;,&quot;timer-func&quot;);
    child.innerText = &quot; s&quot;;
    child.style = &quot;color:#fff&quot;;
    starts.append(child);
}
</code></pre><p>Now even if you reload the page, the count begins by taking the stored value as starting point. This extension is actually complete!! This extension can store <code>todayCount</code>&#39;s value, it will reset the count to zero when a new day starts. But it will not show the cool graphs which will help user take more action in his time :(</p><p>So, let&#39;s implement the <code>popup</code> whenever user clicks on the extension icon.</p><blockquote><p>If you are not familiar with Promises, I would recommend you to read this <a target='_blank' title="https://web.dev/promises/" href="https://web.dev/promises/">well written article</a>.</p></blockquote><h3>3. index.html</h3><p><code>index.html</code> is used to display the statistics when the user clicks on the extension icon in the extension toolbar. Add <code>index.html</code> with the boiler plate code:</p><pre><code>// index.html
&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;&lt;title&gt;Document&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;</code></pre><p>First create a <code>&lt;div&gt;</code> with id <code>container</code>, we will add all our text content here. In our demo, we had one heading, let&#39;s add that first. Go ahead and add <code>&lt;h1&gt;</code> with text &quot;YouTube Weekly Watch Data&quot; inside our <code>&lt;div&gt;</code>. We can also see, data is displayed in form of chart for that we need to import <code>ApexCharts.js</code>.</p><p>ApexCharts is an MIT-licensed open source charting library. I find it simple yet powerful library. We are going to use it for our project. Go to <a target='_blank' title="https://apexcharts.com/" href="https://apexcharts.com/">ApexCharts</a> website and click on download. Unzip the downloaded file and navigate through the folder <code>./apexcharts-bundle/dist</code> copy the <code>apexcharts.js</code> file and paste it in our extension folder. Add a script tag in our body with <code>src</code> pointing to location of <code>apexcharts.js</code>.</p><p>Google chrome does not allow HTML files with script code in them, hence we need to create another JavaScript file <code>main.js</code>, which will read data and build bar graphs. So, create this <code>main.js</code> file and add it as <code>&lt;script&gt;</code> source in the HTML body. Our modified <code>HTML</code> code:</p><pre><code>&lt;!DOCTYPE html&gt;&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;UTF-8&quot;&gt;&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id=&quot;container&quot;&gt;
&lt;h1&gt;YouTube Weekly Watch Data&lt;/h1&gt;
&lt;/div&gt;
&lt;script src=&quot;./apexcharts.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;./main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><p>You can now click on the extension icon to show the done changes:</p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/938q9UfURQSg9w5NvEeU" alt="OOvKCzCKk.avif" title="OOvKCzCKk.avif" width="undefined" height="undefined" /><h3>4. main.js</h3><p>We are now in our last stretch, we just need to add charting functionality using <code>apexcharts.js</code>. You might have already guessed the first step, Yes, first step is to retrieve data from the <code>storage</code>. For the data retrevial we can use the already used <code>getLoaclStorageValue</code> function. Since, we need to run this function every time user clicks on the icon we can add <code>window.add</code> function to load it.</p><pre><code>window.onload = function(){
let getLocalStorageValue = (key) =&gt; {
    return new Promise((resolve, reject) =&gt; {
        try {
            chrome.storage.local.get(key, function (value) {
                resolve(value);
            })
        }
        catch (ex) {
            reject(&quot;Unexpected error occurred: &quot;+ex);
        }
    });
}
}
</code></pre><p>Since the <code>getLocalStorageValue</code> deals with asynchronous function, we can call <code>.then()</code> with a callback to resolve the output. Output here is the value for the key <code>arrWeek</code> same as in <strong>script.js</strong> file. We have to add two functionality using <strong>main.js</strong>: 1.Display the average time taken 2.Display the graph using <code>apexchart.js</code> To get the average value and to add it <code>popup</code>, we are going to create a function <code>adder</code></p><pre><code>let starter = (sum, string) =&gt;{
        let avg = sum/7;
        avg = Math.round((avg + Number.EPSILON) * 100) / 100;
        let h2ele = document.createElement(&quot;h2&quot;);
        let text = document.createTextNode(&quot;Average time: &quot;+avg+&quot; &quot;+string);
        h2ele.appendChild(text);
        const element = document.getElementById(&quot;container&quot;);
        element.appendChild(h2ele);
        document.querySelector(&quot;h2&quot;).style[&quot;text-align&quot;] = &quot;center&quot;;
    }
</code></pre><p>In this function, we are creating a <code>h2</code> element and add it to <code>popup</code>, also based on the input to it, we will display either minutes or hours. This adds <code>h2</code> element which shows the average time spent on YouTube.</p><p>Now we have to chart the data, for that we need to add a div in <strong>index.html</strong> with <code>id</code> of your choice.</p><pre><code>&lt;div id=&quot;chart&quot; style=&quot;max-width: 650px; margin: 15px auto; min-height: 350px;&quot;&gt;&lt;/div&gt;</code></pre><p>In <strong>main.js</strong> create an object of class <code>ApexCharts</code>, its constructor takes DOM element and <code>options</code> as parameter. Dom element here is the <code>div</code> with <code>id=&quot;chart&quot;</code>, <code>options</code> is a JavaScript object which specifies how our bar graph should be drawn.</p><p>It has various entries, first entry <code>color</code> describes a palette of colors for the graph, <code>series</code> denotes the data to be plotted, <code>chart</code> describes the type of graph to be plotted and its dimensions, <code>plotOptions</code> describe how the graph should be plotted, <code>dataLabels</code> denotes how labels on top of each bar should be formatted, <code>xaxis</code> and <code>yaxis</code> denotes what should be plotted on X and Y axis, <code>fill</code> reperesnets the opacity of the graph and finally <code>tooltip</code> options let&#39;s us format the tool tip of the graph, for our graph, I have disabled it.</p><p>After describing the <code>options</code> for the graph, we can finally plot the graph by calling the <code>chart.render()</code> method</p><p>Similarly like <strong>script.js</strong>, we will call all these methods while resolving the promise from <code>getLocalStorageValue</code>, final code after all modifications:</p><pre><code>window.onload = function () {
    let getLocalStorageValue = (key) =&gt; {
        return new Promise((resolve, reject) =&gt; {
            try {
                chrome.storage.local.get(key, function (value) {
                    resolve(value);
                })
            }
            catch (ex) {
                reject(&quot;Unexpected error occurred: &quot;+ex);
            }
        });
    }
    let starter = (sum, string) =&gt;{
        let avg = sum/7;
        avg = Math.round((avg + Number.EPSILON) * 100) / 100;
        let h2ele = document.createElement(&quot;h2&quot;);
        let text = document.createTextNode(&quot;Average time: &quot;+avg+&quot; &quot;+string);
        h2ele.appendChild(text);
        const element = document.getElementById(&quot;container&quot;);
        element.appendChild(h2ele);
        document.querySelector(&quot;h2&quot;).style[&quot;text-align&quot;] = &quot;center&quot;;
    }
    let storageArr = undefined;
    getLocalStorageValue(&quot;arrWeek&quot;)
        .then((value)=&gt;{
            storageArr = value;
            if(storageArr.arrWeek!=undefined)
                storageArr = JSON.parse(storageArr.arrWeek);
            else{
                storageArr.arrWeek = [0,0,0,0,0,0,0];
                storageArr = storageArr.arrWeek;
            }
            if(storageArr==undefined)
                storageArr = [0,0,0,0,0,0,0];
            let max = Math.max(...storageArr);
            let hours, min, seconds;
            hours = Math.floor(max/3600);
            min = Math.floor((max - hours*3600)/60);
            seconds = Math.floor(max - (min*60+hours*3600));
            let label = undefined;
            let label2 = undefined;
            console.log(max);
            let modifiedArr;
            if(hours&gt;0){
                let sum = 0;
                label = &#39;Time (Hr)&#39;;
                label2 = &quot;Hr&quot;;
                modifiedArr = storageArr.map(function(num){
                    num = (num/3600);
                    num = Math.round((num + Number.EPSILON) * 100) / 100;
                    sum += num;
                    return num;
                })
                starter(sum,&quot;Hours&quot;);
            }
            else if(min &gt; 0){
                let sum = 0;
                label = &#39;Time (min)&#39;;
                label2= &#39;min&#39;;
                modifiedArr = storageArr.map(function(num){
                    num = (num/60);
                    num = Math.round((num + Number.EPSILON) * 100) / 100;
                    sum += num;
                    return num;
                })
                starter(sum,&quot;Minutes&quot;);
            }
            else if(seconds&gt;=0){
                label = &#39;Time (s)&#39;;
                label2 = &#39;seconds&#39;;
                modifiedArr = storageArr;
            }
            var options = {
                colors:[&#39;#F44336&#39;],
                series: [{
                    data: modifiedArr   
                }],
                chart: {
                    type: &#39;bar&#39;,
                    height: 350,
                    width:400,
                    toolbar:{
                        show:false
                    }
                  },
                plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: &#39;55%&#39;,
                      endingShape: &#39;rounded&#39;,
                      dataLabels: {
                        position: &#39;top&#39;, 
                      }
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val;
                    },
                    offsetY: -20,
                    style: {
                      fontSize: &#39;12px&#39;,
                      colors: [&quot;#304758&quot;]
                    }
                  },
                xaxis: {
                    categories: [&#39;Sun&#39;,&#39;Mon&#39;,&#39;Tue&#39;,&#39;Wed&#39;,&#39;Thur&#39;,&#39;Fri&#39;,&#39;Sat&#39;],
                },
                yaxis: {
                    title: {
                      text: label
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    enabled:false,
                  }
                };
            var chart = new ApexCharts(document.querySelector(&quot;#chart&quot;), options);
            chart.render();
        })
}
</code></pre><p>Save the file and click on extension icon, you&#39;re extension <code>popup</code> might look like this now:</p><img src="https://ap-south-1.graphassets.com/Ai9ifxAyAReGAIIJHWVf0z/gTwVpTSKS2ObMBSwyT54" alt="S2lDockia.avif" title="S2lDockia.avif" width="undefined" height="undefined" /><blockquote><p>Note: If you are not familiar with <code>ApexCharts</code>, I would highly recommend you to check out there nicely written <a target='_blank' title="https://apexcharts.com/docs/installation/" href="https://apexcharts.com/docs/installation/">documentation</a>.</p></blockquote><p>Yes, that&#39;s it you have just created a working chrome extension. This only works on your browser, to share your cool work with your friends, you can share it on github or publish it on Chrome Web Store!!</p><p>Also feel free to modify my code to your liking, you can add custom CSS to make it look more cool. I hope after reading this blog, you will create some cool extensions of your own!</p><p>Happy coding!!</p><p>If you want to connect with me, you can find me on <a target='_blank' title="https://x.com/0x_manusrao" href="https://x.com/0x_manusrao">Twitter</a></p>

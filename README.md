## Requirements
You have been asked to implement a URL shortening service, along the lines of something like tinyurl.com or bit.ly. Your service needs to be able to both take long URLs as input and shorten them, as well as being able to inflate a shortened URL to its original form.

Your solution should include all source code, including tests, hosted on something free and publicly accessible like GitHub. It should run on a service provider such as the free tiers provided by AWS or Azure (preferred). An easy deployment process to that environment would be a bonus. You have your choice of languages (although Node.js would be advantageous), IDEs, and frameworks.

## User Stories
* As a user, I want to shorten long url to short url so that I can put it in twitter;
* As a user, I want to recover shortened url back to long url so that I can visit the original site;
* As admin, I want to same long url will be generated the same short urls so that I can save system space;

## Design
Use key & value to save, so shortened url will be the key and original Url will be the value. 
So the problem become: given a string, output a short key. 

To simplify, I want to use the auto-grow integer as internal key, and then use some algorithm to transfer the integer to key.
Therefor the problem become: given a integer, output a short key.       
  
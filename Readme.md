# Backend test app  

 **this readme file is a guilde to learn logics in this application we can go file by file to understand it properly**

 ### app.js

starting from line number 13
we are connecting to our mongodb instance by using mongoose ORM .connect methode

srv path includes:
username:password@clusterid/datababse?retry option (provided at Atlas).

from line 24 and 25 we pass middlewares to access body in api requests

from line 27 to 30 we ejs configure template engine

then we have routes for home page create post page and not found page


### controllers/articles.js

we import our mongoose schema for Aricle

we have getArticles function that finds articles in mongodb and renders articles page inside view with the list of avaiable articles.

we have createArticles function that first creates copy of title and description from req.body, checks if title avaible and creates and saves a new article document in db and call getArticles function again to refresh articles list in browser.

we have getArticle function that finds for a article for provided valid article id in mongodb and renders blog page inside view with found article object.

we have deleteArticle function that finds for a article and delete for provided valid article id in mongodb and response back with success.

we have publishArticle function that finds for a article and delete for provided valid article id in mongodb and updates its status to published and response back with success.

nothing changed in updateArticle, you can delete it if you want.


### models/article.js

changed model as per requirement in the provided docs file.


### JS Template files

we have two folders for ejs files public and views

public file contains css and js for cms and blog apps, where views have template html files which are pretty straightforward, but still if you may find any issue you can ask.

# File Handling 

# How to do ( On our own Server )

-- Files Upload on our Server
-- Then We Can Serve those Files 

# Alternate Method ( Third Party Server )
-- In Case of space intensive data/files
-- We Purchase ya Buy some third party Server for our file uploads
-- Examples : Cloudinary 
-- We make our account there , then we recieve an api key , we use the respected third party api's upload function and send files there
-- that server returns a path to that uploaded file.


# What to do
-- Create a Public/Images folder in your server.
-- Then we have to make it accessible to the browser
-- path module from node. ( helps to access a folder in our project directory )
-- npm install path ( by Defaut it is already there )
-- now we serve our folder as static folder in express app.
-- Files Rules : Rules that will be followed for file upload

# Image Upload 
-- for file upload we need a module called multer 
-- multer takes files from html form data
-- npm install multer
-- we make a middleware function for our file uploads ( name can be anything you like but sensible )
-- we set up the multer destination and filename for our file uploads
-- then we use that configuration (dest.. and filename) and create a upload method.
-- then we export that middleware

# Apply middleware on Respected Routes
-- import the fileUpload middleware
-- apply middleware on respected routes
-- file will be uploaded on the server on every request on that route

# Saving Filepath to Database Object
-- Inside Relevant DAC , we access the filename.
-- and then add it to the req.body object.
-- then DAC should work as normal

# How to Send Image on Frontend
-- normmally we send data in json
-- but for file uploads we have to send Form Data
-- in handleSubmit Function we create a new FormData() object
-- then in the Fetch Request , we simple send that Data without any headers or json conversion.


## TODO 
-- Implement File Upload on Signup Route
-- Implement File Upload on Post Ad Route
-- Implement File Upload again on Edit Post/User Route
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs = [
  {
    title: "The Future of Artificial Intelligence",
    category: "Technology",
    content:
      "Artificial Intelligence (AI) is shaping our future in unimaginable ways. From self-driving cars to predictive analytics, AI is transforming industries...",
    authorName: "John Doe",
  },
  {
    title: "10 Superfoods to Boost Your Health",
    category: "Health",
    content:
      "Superfoods are packed with nutrients that provide numerous health benefits. Discover the top 10 superfoods you should include in your diet...",
    authorName: "Jane Smith",
  },
  {
    title: "A Culinary Journey Through Italy",
    category: "Food",
    content:
      "Italian cuisine is a symphony of flavors and traditions. Join us as we explore the most beloved dishes from this rich and diverse culture...",
    authorName: "Mario Rossi",
  },
  {
    title: "Exploring the Wonders of Iceland",
    category: "Travel",
    content:
      "Iceland is a land of fire and ice, offering breathtaking landscapes and unique experiences. From glaciers to geysers, discover what makes this country a must-visit destination...",
    authorName: "Emma Brown",
  },
  {
    title: "How Technology is Revolutionizing Education",
    category: "Technology",
    content:
      "From virtual classrooms to AI tutors, technology is making education more accessible and personalized. Explore the latest trends in ed-tech...",
    authorName: "Sarah Lee",
  },
  {
    title: "Mindfulness: A Path to Inner Peace",
    category: "Health",
    content:
      "Mindfulness helps us live in the present moment and reduces stress. Learn simple techniques to bring mindfulness into your daily routine...",
    authorName: "David Johnson",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("aboutUs.ejs");
});

app.get("/contact",(req,res)=>{
res.render("contactUs.ejs");
});

app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogs[blogId]; // Use blogId as the index
  res.render("editBlog.ejs", { blog, id: blogId }); // Pass the blog and id to the template
});

app.get("/write",(req,res)=>{
res.render("writeBlog.ejs");
});

app.post("/edit/:id", (req, res) => {
  const blogId = req.params.id; // Get blog ID from URL
  blogs[blogId] = {
    // Update the blog in the array
    title: req.body.blogTitle,
    category: req.body.blogCategory,
    content: req.body.blogContent,
    authorName: req.body.authorName,
  };
  res.redirect("/blog")
});

app.get("/delete/:id", (req, res) => {
  const blogId = req.params.id;
  blogs.splice(blogId, 1); // Remove the blog from the array
  res.redirect("/blog"); // Redirect to the blog list
});


app.post("/submit", (req, res) => {
  const blogTitle = req.body["blogTitle"];
  const blogCategory = req.body["blogCategory"];
  const blogContent = req.body["blogContent"];
  const blogAuthor = req.body["authorName"];
  const newBlog = {
    title: blogTitle,
    category: blogCategory,
    content: blogContent,
    authorName: blogAuthor,
  };
  blogs.push(newBlog);
  res.redirect("/blog");
});

app.get("/blog", (req, res) => {
  console.log(blogs);
  res.render("readBlogs.ejs", { blogs: blogs });
});

app.get("/blog/:id", (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the URL
  const blog = blogs[blogId]; // Retrieve the blog from the blogs array using the ID

  if (!blog) {
    // If the blog doesn't exist, return a 404 page
    return res.status(404).send("Blog not found");
  }

  // Render the full blog post in a separate template
  res.render("fullBlog.ejs", { blog });
});

app.listen(port, () => {
  console.log(`Server is listening to ${port} port`);
});

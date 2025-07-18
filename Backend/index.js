const express = require('express');
const app = express();
const cors = require('cors');
const blogs = require('./api/blogsData.json');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send("Blog server is running!");
});

app.get('/blogs', (req, res) => {
    res.send(blogs);
});

app.get('/blogs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.filter(b => b.id === id);
    res.send(blog);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

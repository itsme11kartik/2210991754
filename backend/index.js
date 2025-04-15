const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Route to return different sets of numbers based on type
app.put('/numbers/:type', (req, res) => {
    const { type } = req.params;

    if (!type || typeof type !== 'string') {
        return res.status(400).json({ error: 'Type parameter is required' });
    }

    const firstChar = type[0].toLowerCase();
    let responseData;

    switch (firstChar) {
        case 'p':
            responseData = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
            break;
        case 'e':
            responseData = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
            break;
        case 'f':
            responseData = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
            break;
        case 'r':
            responseData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
            break;
        default:
            return res.status(400).json({ error: 'Unsupported type provided' });
    }

    res.json({ numbers: responseData });
});

// Route to fetch a list of users
app.get('/users', (req, res) => {
    const users = {
        "1": "Lucas Reed",
        "2": "Ava Mitchell",
        "3": "Ethan Hayes",
        "4": "Zoe Bennett",
        "5": "Mason Rivera",
        "6": "Chloe Brooks",
        "7": "Logan James",
        "8": "Lily Morgan",
        "9": "Elijah Cooper",
        "10": "Grace Simmons",
        "11": "Benjamin Foster",
        "12": "Aria Perry",
        "13": "James Bailey",
        "14": "Nora Sanders",
        "15": "Henry Hughes"
    };

    res.json({ users });
});

// Fetch posts by user ID
app.get('/users/:userid/posts', (req, res) => {
    const posts = [
        { id: 1, userId: 4, content: "Loving the new features on the app!" },
        { id: 2, userId: 7, content: "Could use some improvements on the UI." },
        { id: 3, userId: 1, content: "Great experience so far. Keep it up!" },
        { id: 4, userId: 9, content: "I had an issue logging in earlier today." },
        { id: 5, userId: 2, content: "Thanks for fixing the bug so quickly!" },
        { id: 6, userId: 6, content: "Can we have dark mode in the next update?" },
        { id: 7, userId: 10, content: "Notifications are not working on my device." },
        { id: 8, userId: 3, content: "Absolutely love this community!" },
        { id: 9, userId: 5, content: "The app crashes when I upload a photo." },
        { id: 10, userId: 8, content: "Smooth performance and great support." },
        { id: 11, userId: 11, content: "Just joined! Excited to explore." }
    ];

    const userId = parseInt(req.params.userid);
    const filteredPosts = posts.filter(post => post.userId === userId);

    if (filteredPosts.length > 0) {
        res.json({ posts: filteredPosts });
    } else {
        res.status(404).json({ error: `No posts found for user with id ${userId}` });
    }
});

// Fetch comments for a specific post
app.get('/posts/:postId/comments', (req, res) => {
    const comments = [
        { id: 1, postId: 4, comment: "This feature is amazing!" },
        { id: 2, postId: 7, comment: "I think the UI could be better." },
        { id: 3, postId: 1, comment: "Loving the updates so far!" },
        { id: 4, postId: 9, comment: "Had some trouble with the login process." },
        { id: 5, postId: 2, comment: "Thanks for the quick bug fix!" },
        { id: 6, postId: 6, comment: "Dark mode would be a great addition." },
        { id: 7, postId: 10, comment: "Notifications are not working properly." },
        { id: 8, postId: 3, comment: "This community is so supportive!" },
        { id: 9, postId: 5, comment: "The app crashes when uploading photos." },
        { id: 10, postId: 8, comment: "Great performance and support!" },
        { id: 11, postId: 11, comment: "Excited to explore this app!" }
    ];

    const postId = parseInt(req.params.postId);
    const matchedComments = comments.filter(comment => comment.postId === postId);

    if (matchedComments.length > 0) {
        res.json({ comments: matchedComments });
    } else {
        res.status(404).json({ error: `No comments found for post with id ${postId}` });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});

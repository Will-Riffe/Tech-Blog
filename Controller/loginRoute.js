// Login Routes
const express = require('express');
const router = express.Router();

// Login
router.get('/', async (req, res) => {
  try {

    res.render('login', { active: { login: true } });

  } catch (err) {
    res.status(500).render(
        'error', 
        { message: 
        'Oops! Something went wrong. Please try again later.' 
    });
  }
});

module.exports = router;

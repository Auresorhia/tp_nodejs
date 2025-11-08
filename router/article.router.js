const express = require('express');
const router = express.Router();
const articleModel = require('../models/articles.model');

router.post('/add', async (req, res) => {
    try {
        const article = await articleModel(req.body);
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const articles = await articleModel.find().populate('avis').populate('user');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id).populate('avis').populate('user');
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedArticle = await articleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedArticle = await articleModel.findByIdAndDelete(req.params.id);
        if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json({ message: 'Article supprimé', deletedArticle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/sort/price', async (req, res) => {
    try {
        const articles = await articleModel.find().sort({ price: 1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/sort/rating', async (req, res) => {
    try {
        const articles = await articleModel.find().populate('avis');
        const sorted = articles.sort((a, b) => {
            const avgA = a.avis.length ? a.avis.reduce((sum, x) => sum + x.rating, 0) / a.avis.length : 0;
            const avgB = b.avis.length ? b.avis.reduce((sum, x) => sum + x.rating, 0) / b.avis.length : 0;
            return avgB - avgA;
        });
        res.status(200).json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

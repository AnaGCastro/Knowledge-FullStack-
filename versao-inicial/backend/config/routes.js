module.exports = app => {
    app.route('/api/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/api/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/api/categories')
        .post(app.api.category.save)
        .get(app.api.category.get) 


    //Cuidado com a ordem! Tem que vir antes de /categories/:id
    app.route('/api/categories/tree')
        .get(app.api.category.getTree)

    app.route('/api/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/api/articles')
        .post(app.api.articles.save)
        .get(app.api.articles.get)
    
    app.route('/api/articles/:id')
        .put(app.api.articles.save)
        .delete(app.api.articles.remove)
        .get(app.api.articles.getById)


    app.route('/api/articles/categories/:id')
        .get(app.api.articles.getByCategory)
}

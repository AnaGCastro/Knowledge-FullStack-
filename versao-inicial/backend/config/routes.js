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
}

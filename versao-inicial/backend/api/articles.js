const queries = require('./articles')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informado')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(201).json({ message: 'Artigo criado com sucesso' }))
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id }).del()

            existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const limit = 10
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles')
            .count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description', 'imageUrl', 'categoryId', 'userId')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                if (article && article.content)
                    article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const result = await app.db.raw(queries.categoryWithChildren,)
        const ids = categories.rows.map(c => c.id)


    app.db({a: 'articles', u:'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', 'a.categoryId', 'a.userId', 'u.nome as userName')
            .whereRaw('?? = ??', ['a.categoryId', categoryId])
            .limit(limit).offset(page * limit - limit)
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json({ data: articles, count: articles.length, limit }))
            .catch(err => res.status(500).send(err))
    
    }

    return {
        save,
        remove,
        get,
        getById,
        getByCategory
    }
}
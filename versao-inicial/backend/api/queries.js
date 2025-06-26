module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE "parentId" = ?
            UNION ALL
            SELECT c.id FROM categories c
            INNER JOIN subcategories s ON c."parentId" = s.id
        )
        SELECT id FROM subcategories
    `
}
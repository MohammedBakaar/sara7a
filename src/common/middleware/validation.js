export const validation = (schema) => {
    return (req, res, next)=>
    {
        let { success, error, data } = schema.safeParse(req.body)
        if (!success)
        {
            throw error
        }
        req.validate = data
        next()
    }
}
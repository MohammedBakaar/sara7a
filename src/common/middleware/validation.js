export const validation = (schema) => {
  return (req, res, next) => {
    let lang = req.headers["accept-language"] || 1
    let { success, error, data } = schema(lang).safeParse({
      params: req.params,
      query: req.query,
      headers: req.headers,
      body: req.body,
    });
    if (!success) {
      throw error;
    }
      req.validate = data;
   
      
    next();
  };
};

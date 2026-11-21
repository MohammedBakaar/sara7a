
export const baseRepo = (model) => {
  return {
    find: async (
      { filter, options, page, limit, sort = { _id: -1 } },
      populate,
    ) => {
      page = Number(page) || 1;
      limit = NUmmber(limit) || 10;
      let skip = (page - 1) * limit;
      return await model
        .find(filter, options)
        .skip(skip)
        .limit(limit)
        .sort(sort || undefined)
        .populate(populate || undefined);
    },
    findOne: async ({ filter, projection = {}, options = {} }, populate) => {
      let data = await model
        .findOne(filter, projection, options)
        .populate(populate);
      return data;
    },
    findById: async ({ id, projection = {}, options = {}, populate }) => {
      let data = await model
        .findById(id, projection, options)
        .populate(populate);
      return data;
    },
    findOneAndUpdate: async ({
      filter,
      update,
      options = { returnDocument: "after", ...options },
      populate,
    }) => {
      let data = await model
        .findOneAndUpdate(filter, update, options)
        .populate(populate);
      return data;
    },
    findByIdAndUpdate: async ({
      id,
      update,
      options = { returnDocument: "after", ...options },
      populate,
    }) => {
      let data = await model
        .findByIdAndUpdate(id, update, options)
        .populate(populate);
      return data;
    },
    updateOne: async ({ filter, update, options = {} }) => {
      let data = await model.updateOne(filter, update, options);

      return data;
    },
    updateMany: async ({ filter, update, options = {} }) => {
      let data = await model.updateMany(filter, update, options);

      return data;
    },
    deleteOne: async ({ filter }) => {
      let data = await model.deleteOne(filter);
      return data;
    },
    deleteMany: async ({ filter }) => {
      let data = await model.deleteMany(filter);
      return data;
    },
    create: async ({ data, options }) => {
      return await model.create(data, options);
    },
  };
};

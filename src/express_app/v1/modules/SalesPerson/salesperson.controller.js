import httpStatus from "http-status";
import randomStringGen from "randomized-string";

export const signUp = async (req, res, next) => {
  try {
    const { SalesPerson } = req.models;
    const salesPerson = await SalesPerson.create(req.body);
    return res.status(httpStatus.CREATED).json(salesPerson.toAuthJSON());
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST);
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    return res.status(httpStatus.OK).json(await req.user.toAuthJSON());
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    next(e);
  }
};

export const createNewCategory = async (req, res, next) => {
  try {
    const { Category } = req.models;
    const category = await Category.create(req.body);
    return res.status(httpStatus.CREATED).json(category);
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST);
    next(e);
  }
};

export const genLinkForCategory = async (req, res, next) => {
  try {
    const { Category } = req.models;
    const { categoryId } = req.params;
    const generatedLink = `${
      req.hostname
    }/v1/signup?token=${randomStringGen.generate()}&cat=${categoryId}`;
    const link = {
      linkAddress: generatedLink,
      category: categoryId,
    };
    await Category.updateOne(
      { _id: categoryId },
      {
        $push: {
          links: link,
        },
      }
    );
    return res.status(httpStatus.CREATED).json(categoryId);
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST);
    next(e);
  }
};

export const getStatistics = async (req, res, next) => {
  try {
    let statistics = {
      createdLinks: req.user.createdLinks,
    };
    return res.status(200).json(statistics);
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST);
    next(e);
  }
};

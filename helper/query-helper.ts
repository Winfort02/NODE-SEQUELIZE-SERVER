import { Op } from "sequelize";

export const SerachQeueryHelper = (keywords: string) => {
  return {
    username: { [Op.like]: `%${keywords}%` },
    name: { [Op.like]: `%${keywords}%` },
    email: { [Op.like]: `%${keywords}%` },
  };
};

export const SortOueryHelper = [
  ["createdAt", "DESC"],
  ["name", "ASC"],
];

export const PaginationQueryBuilder = (
  searchQuery: object,
  sortOrderQuery: Array<any>,
  offset: number,
  limit: number,
  paranoid = true
) => {
  return {
    where: searchQuery,
    paranoid,
    order: sortOrderQuery,
    offset,
    limit,
  };
};

import envConfig from "@/src/config/envConfig";

export const getResentPosts = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt&limit=9`,
    fetchOption
  );

  return res.json();
};

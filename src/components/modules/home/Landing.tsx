"use client";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { SearchIcon } from "../../icons";
import useDebounce from "@/src/hooks/debounce.hook";
import { useSearchItem } from "@/src/hooks/search.hook";
import { useEffect, useState } from "react";
import { ISearchResult } from "@/src/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Landing = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchItem();
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<ISearchResult[] | []>([]);
  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  const onSubmit = (data) => {
    handleSeeAll(data.search);
  };

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }

    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data?.hits ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/found-items?query=${queryString}`);
  };

  return (
    <div>
      <div className="h-[calc(100vh-64px)] bg-[url('/bannerImg.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="pt-32 max-w-md flex-1 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1">
              <Input
                {...register("search")}
                label="Search"
                isClearable
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                placeholder="Type to search..."
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-2 rounded-xl bg-default-100 p-3">
              <div className="space-y-3">
                {searchResults.map((item, index) => (
                  <Link
                    key={index}
                    className="text-default-900 block rounded-md from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                    href={`/found-items/${item.id}`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <img
                          alt="item"
                          className="h-20 w-20 rounded-md"
                          src={item.thumbnail}
                        />
                        <div>
                          <p className="text-lg font-semibold">{item.title}</p>
                          <p className="mt-1 line-clamp-2 h-12 w-full text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
                <button
                  className="flex items-center justify-center gap-1"
                  onClick={() => handleSeeAll(searchTerm)}
                >
                  <span>See All</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;

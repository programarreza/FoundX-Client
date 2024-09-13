import { Button } from "@nextui-org/button";
import Link from "next/link";
import { getResentPosts } from "@/src/services/ResentPosts";
import { IPost } from "@/src/types";
import Container from "@/src/components/UI/Container";
import Card from "@/src/components/UI/Card";

const ResentPosts = async () => {
  const { data: posts } = await getResentPosts();

  return (
    <Container>
      <div className="min-h-screen">
        <div className="section-title my-8">
          <h2 className="mb-2 text-center text-2xl">Recently Found Items</h2>
          <p className="text-center">
            A List of items that been recently found and reported.
          </p>
        </div>

        <div className="my-8 grid justify-center gap-10 sm:grid-cols-1 md:grid-cols-4">
          <h1>Recent Posts</h1>
        </div>

        <div className="grid grid-cols-3 gap-12">
          {posts.map((post: IPost) => (
            <Card key={post._id} post={post} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="rounded-md bg-default-900 text-default" size="md">
            <Link href="/found-items">See All</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ResentPosts;

import Footer from '@/components/footer';
import Header from '@/components/header';
import { allPosts } from 'content-collections';
import Link from 'next/link';

export default function Blog() {
  return (
    <>
      <Header />
      <div className="space-y-3 flex flex-col">
        <h2 className="text-lg font-medium">My thoughts and ideas</h2>
        <p>
          I try to consistently write about my experiences and learnings in the
          field of software development. Whether it's through blog posts,
          articles, or other forms of content, I am always eager to share my
          insights and knowledge with others.
        </p>
      </div>
      <div className="flex flex-col space-y-3">
        <h2 className="text-lg font-medium">Blog posts</h2>
        <div className="flex flex-col divide-y divide-neutral-200 border-y border-y-neutral-200">
          {allPosts.map((post) => (
            <Link
              href={`/blog/${post._meta.path}`}
              className="flex items-center justify-between py-2"
              key={post._meta.path}
            >
              <p>{post.title}</p>
              <p className="text-neutral-500">
                {post.htmlDate.toLocaleDateString()}
              </p>
            </Link>
          ))}
          {allPosts.length === 0 && (
            <p className="text-neutral-500">No blog posts found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

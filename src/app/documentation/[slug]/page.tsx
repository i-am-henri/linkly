import Footer from '@/components/footer';
import Header from '@/components/header';
import { MDXContent } from '@content-collections/mdx/react';
import { allPosts } from 'content-collections';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  type ComponentProps,
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
  Suspense,
} from 'react';

export default function BlogPost({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostInformation params={params} />
      </Suspense>
      <Footer />
    </>
  );
}

async function BlogPostInformation({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path === slug);
  if (!post) {
    notFound();
  }
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="font-medium text-xl">{post.title}</h1>
      <MDXContent
        code={post.mdx}
        components={{
          Image: (
            props: DetailedHTMLProps<
              ImgHTMLAttributes<HTMLImageElement>,
              HTMLImageElement
            >
          ) => (
            <Image
              className="rounded-lg"
              {...props}
              alt={props.alt as string}
              width={500}
              height={500}
              src={props.src as string}
            />
          ),
          img: (
            props: DetailedHTMLProps<
              ImgHTMLAttributes<HTMLImageElement>,
              HTMLImageElement
            >
          ) => (
            <Image
              className="rounded-lg"
              {...props}
              alt={props.alt as string}
              width={500}
              height={500}
              src={props.src as string}
            />
          ),
          h1: (props: ComponentProps<'h1'>) => (
            <h1 className="font-medium text-xl" {...props} />
          ),
          h2: (props: ComponentProps<'h2'>) => (
            <h2 className="font-medium text-lg" {...props} />
          ),
          h3: (props: ComponentProps<'h3'>) => (
            <h3 className="font-medium text-base" {...props} />
          ),
          p: (props: ComponentProps<'p'>) => (
            <p className="text-neutral-800" {...props} />
          ),
          Link: (props: ComponentProps<'a'> & { href: string }) => (
            <Link className="text-blue-500" {...props} href={props.href} />
          ),
          a: (props: ComponentProps<'a'>) => (
            <Link
              className="text-blue-500"
              {...props}
              href={props.href as string}
            />
          ),
        }}
      />
    </div>
  );
}

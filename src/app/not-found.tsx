import Header from '@/components/header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-medium">404</h1>
        <p className="text-neutral-500">Page not found</p>
      </div>
    </>
  );
}

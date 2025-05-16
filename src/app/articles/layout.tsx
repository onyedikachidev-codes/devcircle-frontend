import ArticlesLayoutMain from "@/components/layout/ArticlesMain";
import HomeNav from "@/components/ui/HomeNav";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-white text-custom-gray">
      <header className="w-full border-b border-b-gray-200 py-4 bg-white">
        <HomeNav />
      </header>
      <ArticlesLayoutMain>{children}</ArticlesLayoutMain>
    </div>
  );
}
